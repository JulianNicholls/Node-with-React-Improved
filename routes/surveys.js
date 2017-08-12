const mongoose        = require('mongoose');
const Survey          = mongoose.model('surveys');
const Path            = require('path-parser');
const { URL }         = require('url');
const _               = require('lodash');

const requireLogin    = require('../middlewares/requireLogin');
const requireCredits  = require('../middlewares/requireCredits');

const Mailer          = require('../services/Mailer');
const surveyTemplate  = require('../services/emailTemplates/survey')

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(surveys);
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const emails = recipients
      .split(/[;,]\s*/) // Split at , or ; with optional following space(s)
      .map(email => email.trim());

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: emails.map(email => ({ email })),
      _user:      req.user.id,
      dateSent:   Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();

      await survey.save();

      --req.user.credits;
      const user = await req.user.save();

      res.send(user);
    }
    catch(err) {
      res.status(422).send(err);
    }
  });

  // Example webhook call
  // {
  //   event: 'click',
  //   email: 'juliannicholls29@gmail.com',
  //   url: 'http://localhost:3000/api/surveys/598b14a9e8a2142ea1077f4b/no' }
  //          The rest of these are ognored for our purposes
  //   ip: '86.162.155.39',
  //   sg_event_id: 'ZDk1NzcxNzktZDE0OC00NWEzLTg1YzYtNzgwZThlMDg5NTkx',
  //   sg_message_id: 'ltiBP_fGROCeLpenUWDMjw.filter0005p3mdw1-3755-598B14A9-32.0',
  //   useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36
  //               (KHTML, like Gecko) Chrome/60.0.3112.78 Safari/537.36',
  //   url_offset: { index: 1, type: 'html' },
  //   timestamp: 1502287044,

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log('webhook');

    const p = new Path('/api/surveys/:surveyID/:choice');

    _.chain(req.body)
      .map(({ url, email }) => {
        const match  = p.test(new URL(url).pathname);

        if (match) {
          return { email, surveyID: match.surveyID, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('surveyID', 'email')
      .each(({ surveyID, email, choice }) => {
        Survey.updateOne({
          _id: surveyID,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec();
      })
      .value();   // THIS IS VITAL

    res.send({})
  })

  app.get('/api/surveys/:surveyid/:choice', (req, res) => {
    res.send('<h3>Thanks for voting.</h3>');
  });
};

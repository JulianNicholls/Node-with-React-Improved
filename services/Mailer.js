const sendgrid          = require('sendgrid');
const { mail: helper }  = sendgrid;   // Get mail and call it helper

const keys              = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgAPI      = sendgrid(keys.sendGridKey);

    this.from_email = new helper.Email('no-reply@reallybigshoe.co.uk', 'Really Big Shoe Marketing');
    this.subject    = subject;
    this.body       = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients)

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  async send() {
    const request = this.sgAPI.emptyRequest({
      method: 'POST',
      path:   '/v3/mail/send',
      body:   this.toJSON()
    });

    const response = await this.sgAPI.API(request);

    return response;
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => new helper.Email(email));
  }

  addClickTracking() {
    const trackingSettings  = new helper.TrackingSettings();
    const clickTracking     = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = helper.Personalization();

    this.recipients.forEach(recipient => personalize.addTo(recipient));

    this.addPersonalization(personalize);
  }
}

module.exports = Mailer;

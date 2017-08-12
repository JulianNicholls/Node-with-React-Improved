const express       = require('express');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const cookieSession = require('cookie-session');
const passport      = require('passport');

require('./models/User');
require('./models/Survey');
require('./services/passport');

const authRoutes    = require('./routes/auth');
const billingRoutes = require('./routes/billing');
const surveysRoutes = require('./routes/surveys');

const keys          = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

app.use(bodyParser.json());

// Set up to let Passport encrypted cookies for user sessions
app.use(
  cookieSession({
    maxAge:   7 * 24 * 3600 * 1000,   // 7 days of milliseconds
    keys:     [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// These could be rolled up as require('./routes/auth')(app), but
// I think it's clearer this way
authRoutes(app);
billingRoutes(app);
surveysRoutes(app);

// Set up for serving the client app on Heroku
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets,
  // i.e. mainXXX.js and mainXXX.css
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognise the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Heroku tells us what port to use
const PORT = process.env.PORT || 5000;

app.listen(PORT);

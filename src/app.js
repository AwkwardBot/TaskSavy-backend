const express = require('express');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const GoogleStrategy = require('passport-google-oidc').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const { authController } = require('./controllers');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
// app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// jwt authentication
app.use(passport.initialize());
app.use(passport.session());

passport.use('jwt', jwtStrategy);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_client_id,
      clientSecret: config.google_client_secret,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    async function (refreshToken, profile, accessToken, done) {
      const data = await authController.googleLogin(profile);

      const { user } = data;
      const { tokens } = data;

      done(null, { user, tokens });
    }
  )
);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/v1/docs' }),
  function (req, res) {
    const { user } = req;
    const { tokens } = req;

    res.status(httpStatus.OK).send({ user, tokens });
  }
);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: config.github_client_id,
      clientSecret: config.github_client_secret,
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    async function (refreshToken, accessToken, profile, done) {

      const data = await authController.githubLogin(profile);

      const { user } = data;
      const { tokens } = data;

      done(null, { user, tokens });
    }
  )
);

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: 'v1/docs' }), function (req, res) {
  // Successful authentication, redirect home.
  res.status(httpStatus[200]).send(req);
});

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;

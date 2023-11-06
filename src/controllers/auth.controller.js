const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, quickbloxService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  
  res.send({ user, tokens});
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const googleLogin = async (profile) => {
  email = profile.emails[0].value;
  let user = await authService.SocialLogin(email, 'google', profile.id);
  if (!user) {
    userBody = {
      name: profile.displayName,
      email,
      isEmailVerifed: true,
      google: profile.id,
    };

    user = await userService.createUser(userBody);
  }

  const tokens = await tokenService.generateAuthTokens(user);
  console.log('C_USER: ', user, tokens);

  return { user, tokens };
};

const githubLogin = async (profile) => {
  email = profile.emails[0].value;
  let user = await authService.SocialLogin(email, 'github', profile.id);
  if (!user) {
    userBody = {
      name: profile.displayName,
      email,
      isEmailVerifed: true,
      google: profile.id,
    };

    user = await userService.createUser(userBody);
  }

  const tokens = await tokenService.generateAuthTokens(user);
  console.log('C_USER: ', user, tokens);

  return { user, tokens };
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  googleLogin,
  githubLogin,
};

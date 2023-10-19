const reqLog = (req, res, next) => {
  console.log(req);
  next();
};

module.exports = reqLog;

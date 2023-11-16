const reqLog = (req, res, next) => {
  console.log(req.body);
  next();
};

module.exports = reqLog;

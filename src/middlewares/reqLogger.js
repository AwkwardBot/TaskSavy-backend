const reqLog = (req, res, next) => {
  console.log("Body:", req.body);
  console.log(req.files)
  next();
};

module.exports = reqLog;

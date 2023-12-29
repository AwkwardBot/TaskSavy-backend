const reqLog = (req, res, next) => {
  console.log("Body:", req.body);
  console.log("Files:", req.files)
  console.log("Req Headers: ", req.headers)
  // console.log("Req: ", req)
  next();
};

module.exports = reqLog;

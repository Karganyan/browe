module.exports = (req, res, next) => {
  res.locals.user = req.session?.user;
  console.log(req.session.user);
  next();
};

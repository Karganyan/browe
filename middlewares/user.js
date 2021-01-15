module.exports = (req, res, next) => {
  res.locals.user = req.session?.user;
  if (res.locals.user?.login === 'admin') {
    res.locals.admin = true;
  }
  next();
};

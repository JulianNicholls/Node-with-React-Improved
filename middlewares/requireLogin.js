module.exports = (req, res, next) => {
  // If there is no user logged in, leave with Unauthorised status
  if (!req.user) {
    return res.status(401).send({ error: 'You must be logged in' });
  }

  next();
};

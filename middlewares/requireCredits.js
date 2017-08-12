module.exports = (req, res, next) => {
  // There is a user logged in, check that they have credits
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'You must have credits to send out surveys' });
  }

  next();
};

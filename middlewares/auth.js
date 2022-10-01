const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError();
  }
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    throw new UnauthorizedError();
  }
  req.user = payload;
  next();
  return null;
};
module.exports = auth;

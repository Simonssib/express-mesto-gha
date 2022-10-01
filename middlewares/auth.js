const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(401)
      .send({ message: 'Требуется авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Требуется авторизация' });
  }
  req.user = payload;
  next();
  return null;
};
module.exports = auth;

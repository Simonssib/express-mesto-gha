const express = require('express');

const userRoutes = express.Router();
const auth = require('../middlewares/auth');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUserInformation,
  updateUserAvatar,
  login,
} = require('../controllers/users');

userRoutes.post('/signup', createUser);
userRoutes.post('/signin', login);

userRoutes.use(auth);

userRoutes.get('/', getAllUsers);
userRoutes.get('/:userId', getUser);
userRoutes.patch('/me', updateUserInformation);
userRoutes.patch('/me/avatar', updateUserAvatar);

module.exports = userRoutes;

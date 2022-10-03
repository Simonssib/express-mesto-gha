const express = require('express');

const userRoutes = express.Router();
const {
  getAllUsers,
  getUser,
  updateUserInformation,
  updateUserAvatar,
} = require('../controllers/users');
const { validateUpdateUser, validateUpdateAvatar, validateUserId } = require('../middlewares/validator');

userRoutes.get('/', getAllUsers);
userRoutes.get('/me', getUser);
userRoutes.get('/:userId', validateUserId, getUser);
userRoutes.patch('/me', validateUpdateUser, updateUserInformation);
userRoutes.patch('/me/avatar', validateUpdateAvatar, updateUserAvatar);

module.exports = userRoutes;

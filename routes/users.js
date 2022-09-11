const express = require('express');

const userRoutes = express.Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUserInformation,
  updateUserAvatar,
} = require('../controllers/users');

userRoutes.get('/', getAllUsers);
userRoutes.get('/:userId', getUser);
userRoutes.post('/', createUser);
userRoutes.patch('/me', updateUserInformation);
userRoutes.patch('/me/avatar', updateUserAvatar);

module.exports = userRoutes;

const express = require('express');

const userRoutes = express.Router();
const {
  getAllUsers,
  getUser,
  updateUserInformation,
  updateUserAvatar,
} = require('../controllers/users');

userRoutes.get('/', getAllUsers);
userRoutes.get('/me', getUser);
userRoutes.patch('/me', updateUserInformation);
userRoutes.patch('/me/avatar', updateUserAvatar);

module.exports = userRoutes;

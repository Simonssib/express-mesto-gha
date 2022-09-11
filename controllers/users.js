const User = require('../models/user');

const OK = 200;
const internalServerError = 500;
const notFound = 404;
const badRequest = 400;

const getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(internalServerError).send({ message: 'Что то пошло не так' }));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (user === null) {
        return res.status(notFound).send({ message: 'Запрашиваемый пользователь не найден' });
      } return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(badRequest)
          .send({ message: 'Переданный id некорректный' });
      } return res.status(internalServerError).send({ message: 'Что то пошло не так' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(badRequest)
          .send({ message: 'Некорректные данные' });
      } return res.status(internalServerError).send({ message: 'Что то пошло не так' });
    });
};

const updateUserInformation = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        return res
          .status(notFound)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      } return res.status(OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(badRequest)
          .send({ message: 'Некорректные данные' });
      } return res.status(internalServerError).send({ message: 'Что то пошло не так' });
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res
          .status(notFound)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      } return res.status(OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(badRequest)
          .send({ message: 'Некорректные данные' });
      } return res.status(internalServerError).send({ message: 'Что то пошло не так' });
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserInformation,
  updateUserAvatar,
};

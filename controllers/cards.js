const Card = require('../models/card');

const OK = 200;
const internalServerError = 500;
const notFound = 404;
const badRequest = 400;

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(internalServerError).send({ message: 'Что-то пошло не так' }));
};

const createCard = (req, res) => {
  const userId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(badRequest).send({ message: 'Некорректные данные' });
      } return res.status(internalServerError).send({ message: 'Что-то пошло не так' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card === null) {
        return res
          .status(notFound)
          .send({ message: 'Карточка не найдена' });
      }
      return res.status(OK).send({ data: card, message: 'DELETE' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(badRequest).send({ message: 'Переданный id некорректный' });
      } return res.status(internalServerError).send({ message: 'Что-то пошло не так' });
    });
};

const setLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (card === null) {
        return res
          .status(notFound)
          .send({ message: 'Карточка не найдена' });
      } return res.status(OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(badRequest)
          .send({ message: 'Переданный id некорректный' });
      } return res.status(internalServerError).send({ message: 'Что-то пошло не так' });
    });
};

const deleteLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (card === null) {
        return res
          .status(notFound)
          .send({ message: 'Карточка не найдена' });
      } return res.status(OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(badRequest)
          .send({ message: 'Переданный id некорректный' });
      } return res.status(internalServerError).send({ message: 'Что-то пошло не так' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  deleteLike,
};

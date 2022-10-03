const Card = require('../models/card');

const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-err');

const OK = 200;
const internalServerError = 500;

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(internalServerError).send({ message: 'Что-то пошло не так' }));
};

const createCard = (req, res, next) => {
  const userId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
        return;
      } next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Картачка не найдена');
      }
      if (JSON.stringify(card.owner) !== JSON.stringify(userId)) {
        throw new ForbiddenError();
      }
      return card;
    })
    .then((card) => Card.deleteOne(card))
    .then((card) => res.status(OK).send({ card, message: 'DELETE' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданный id неправильный'));
        return;
      } next();
    });
};

const setLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Картачка не найдена');
      } return res.status(OK).send({ data: card, message: 'LIKE' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Картачка не найдена'));
        return;
      } next(err);
    });
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Картачка не найдена');
      } return res.status(OK).send({ data: card, message: 'DISLIKE' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Картачка не найдена'));
        return;
      } next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  deleteLike,
};

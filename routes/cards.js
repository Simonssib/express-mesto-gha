const express = require('express');

const cardRoutes = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  setLike,
  deleteLike,
} = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../middlewares/validator');

cardRoutes.get('/', getCards);
cardRoutes.post('/', validateCreateCard, createCard);
cardRoutes.delete('/:cardId', validateCardId, deleteCard);
cardRoutes.put('/:cardId/likes', validateCardId, setLike);
cardRoutes.delete('/:cardId/likes', validateCardId, deleteLike);

module.exports = cardRoutes;

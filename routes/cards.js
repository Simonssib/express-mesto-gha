const express = require('express');

const cardRoutes = express.Router();

const {
    getCards,
    createCard,
    deleteCard,
    setLike,
    deleteLike
} = require('../controllers/cards');

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCard);
cardRoutes.delete('/:cardId', deleteCard);
cardRoutes.put('/:cardId/likes', setLike);
cardRoutes.delete('/:cardId/likes', deleteLike);

module.exports = cardRoutes;
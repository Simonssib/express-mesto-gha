const Card = require('../models/card');

const getCards = (req, res) => {
    Card.find({})
        .then(card => res.send({ data: card }))
        .catch((err) => res.status(500).send({ message: `Что-то пошло не так` }));
};

const createCard = (req, res) => {
    const userId = req.user._id;
    const { name, link } = req.body;

    Card.create({ name, link, owner: userId })
        .then(card => res.send({ data: card }))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res.status(400).send({ message: 'Некорректные данные' });
            } else return res.status(500).send({ message: `Что-то пошло не так` })
        });
};

const deleteCard = (req, res) => {
    const { cardId } = req.params;
    Card.findByIdAndRemove(cardId)
        .then(card => {
            if (card === null) {
                return res
                    .status(404)
                    .send({ message: 'Карточка не найдена' });
            } else return res.status(200).send({ data: card, message: 'DELETE' })
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return res.status(400).send({ message: 'Карточка не найдена' });
            } else return res.status(500).send({ message: `Что-то пошло не так` })
        });
};

const setLike = (req, res) => {
    const { cardId } = req.params;
    const userId = req.user._id;

    Card.findByIdAndUpdate(
            cardId, { $addToSet: { likes: userId } }, { new: true }
        )
        .then(card => {
            if (card === null) {
                return res
                    .status(404)
                    .send({ message: 'Карточка не найдена' });
            } else return res.status(200).send({ data: card })
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return res
                    .status(400)
                    .send({ message: 'Карточка не найдена' });
            } else return res.status(500).send({ message: `Что-то пошло не так` })
        });
};

const deleteLike = (req, res) => {
    const { cardId } = req.params;
    const userId = req.user._id;

    Card.findByIdAndUpdate(
            cardId, { $pull: { likes: userId } }, { new: true }
        )
        .then(card => {
            if (card === null) {
                return res
                    .status(404)
                    .send({ message: 'Карточка не найдена' });
            } else return res.status(200).send({ data: card });
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return res
                    .status(400)
                    .send({ message: 'Карточка не найдена' });
            } else return res.status(500).send({ message: `Что-то пошло не так` })
        });
};

module.exports = {
    getCards,
    createCard,
    deleteCard,
    setLike,
    deleteLike,
};
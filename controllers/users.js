const User = require('../models/user');

const getAllUsers = (req, res) => {
    User.find({})
        .then((user) => res.send({ data: user }))
        .catch((err) => res.status(500).send({ message: `Что то пошло не так: ${err}` }));
};

const getUser = (req, res) => {
    const { userId } = req.params;

    User.findById(userId)
        .then(user => {
            if (user === null) {
                return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
            }
            return res.send({ data: user })
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return res
                    .status(400)
                    .send({ message: 'Запрашиваемый пользователь не найден' });
            }
            return res.status(500).send({ message: `Что то пошло не так: ${err}` })
        });
};

const createUser = (req, res) => {
    const { name, about, avatar } = req.body;

    User.create({ name, about, avatar })
        .then(user => res.send({ data: user }))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res
                    .status(400)
                    .send({ message: 'Некорректные данные' });
            }
            res.status(500).send({ message: `Что то пошло не так: ${err}` })
        });
};

const updateUserInformation = (req, res) => {
    const userId = req.user._id;
    const { name, about } = req.body;
    User.findByIdAndUpdate(
            userId, { name, about }, {
                new: true,
                runValidators: true
            },
        )
        .then(user => {
            if (user === null) {
                return res
                    .status(404)
                    .send({ message: 'Запрашиваемый пользователь не найден' });
            }
            res.status(200).send({ data: user })
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res
                    .status(400)
                    .send({ message: 'Некорректные данные' });
            }
            if (err.name === 'CastError') {
                return res
                    .status(404)
                    .send({ message: 'Запрашиваемый пользователь не найден' });
            }
            res.status(500).send({ message: `Что то пошло не так: ${err}` })
        });
};

const updateUserAvatar = (req, res) => {
    const userId = req.user._id;
    const { avatar } = req.body;
    User.findByIdAndUpdate(
            userId, { avatar }, {
                new: true,
                runValidators: true
            }
        )
        .then(user => {
            if (!user) {
                return res
                    .status(404)
                    .send({ message: 'Запрашиваемый пользователь не найден' });
            }
            res.status(200).send({ data: user })
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res
                    .status(400)
                    .send({ message: 'Некорректные данные' });
            }
            res.status(500).send({ message: `Что то пошло не так: ${err}` })
        });
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUserInformation,
    updateUserAvatar
};
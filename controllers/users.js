const User = require('../models/user');

const getAllUsers = (req, res) => {
    User.find({})
        .then((user) => res.send({ data: user }))
        .catch(() => res.status(500).send({ message: `Что то пошло не так` }));
};

const getUser = (req, res) => {
    const { userId } = req.params;

    User.findById(userId)
        .then(user => {
            if (user === null) {
                return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
            } else return res.send({ data: user })
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return res
                    .status(400)
                    .send({ message: 'Запрашиваемый пользователь не найден' });
            } else return res.status(500).send({ message: `Что то пошло не так` })
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
            } else return res.status(500).send({ message: `Что то пошло не так` })
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
            } else return res.status(200).send({ data: user })
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res
                    .status(400)
                    .send({ message: 'Некорректные данные' });
            } else if (err.name === 'CastError') {
                return res
                    .status(404)
                    .send({ message: 'Запрашиваемый пользователь не найден' });
            } else return res.status(500).send({ message: `Что то пошло не так` })
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
            } else return res.status(200).send({ data: user })
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res
                    .status(400)
                    .send({ message: 'Некорректные данные' });
            } else return res.status(500).send({ message: `Что то пошло не так` })
        });
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUserInformation,
    updateUserAvatar
};
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();


mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.user = {
        _id: '631bafc6279483c9ca556d2e'
    };

    next();
});
app.use('/users', userRoutes);
app.use('/cards', routerCards);
app.use((req, res) => {
    res.status(400).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});
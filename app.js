const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const routerCards = require('./routes/cards');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { ERROR_500 } = require('./utils/code');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
/*
app.use((req, res, next) => {
  req.user = {
    _id: '631bafc6279483c9ca556d2e',
  };

  next();
});
*/
app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', routerCards);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use((err, req, res, next) => {
  const { statusCode = ERROR_500, message } = err;

  res
    .status(err.statusCode)
    .send({
      message: statusCode === ERROR_500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

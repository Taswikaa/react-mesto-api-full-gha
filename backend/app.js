const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());
app.use(cors({ origin: 'https://mesto.yuwarika.nomoredomains.xyz', credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(require('./routes/index'));

app.patch('*', (req, res, next) => {
  next(new NotFoundError('Рута не существует'));
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  const errorMessage = statusCode === 500 ? 'На сервере произошла ошибка' : message;

  res.status(statusCode).send({ message: errorMessage });
});

app.listen(PORT);

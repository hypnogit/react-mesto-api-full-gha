const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { cardRouter } = require('./routes/cards');
const { userRouter } = require('./routes/users');
const { NotFound } = require('./utils/NotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

require('dotenv').config();

app.use(cors);
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(express.json());
app.use(userRouter);
app.use(cardRouter);
app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFound('Запрашиваемая страница не найдена'));
});

app.use(errors());

app.use((error, req, res, next) => {
  const { statusCode = 500 } = error;
  const message = statusCode === 500 ? 'Ошибка сервера' : error.message;
  res.status(statusCode).send({ message });
  next();
});

async function start() {
  try {
    mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

    app.listen(PORT, () => {
      console.log('heyy');
    });
  } catch (error) {
    console.log(error);
  }
}

start();

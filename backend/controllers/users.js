const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с таким id не существует');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Пользователя с таким id не существует'));
      }

      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcryptjs.hash(password, 10)
    .then((hash) => {
      User.create(
        {
          name,
          about,
          avatar,
          email,
          password: hash,
        },
      )
        .then((user) => res.status(201).send({ data: user }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new BadRequestError('Данные для создания пользователя переданы неверно'));
          }

          if (err.code === 11000) {
            return next(new ConflictError('Эта почта уже используется'));
          }

          return next(err);
        });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUser(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'key', {
        expiresIn: '7d',
      });

      res.cookie('jwt', token, {
        maxAge: 86400000,
        httpOnly: true,
        sameSite: true,
      });

      if (user.avatar) {
        console.log('Поле аватар');
      }

      if (user.password) {
        console.log('Поле пароль');
        console.log(user.password);
      }

      res.send(user);
    })
    .catch(next);
};

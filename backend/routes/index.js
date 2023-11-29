const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const NotFoundError = require('../errors/NotFound');
const { createUser, login } = require('../controllers/users');

router.use(requestLogger);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().pattern(
          /https?:\/\/[a-z1-9\-\.\/\_\~\:\\\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]*/,
        ),
      })
      .unknown(true),
  }),
  createUser,
);
router.use(require('../middlewares/auth'));

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
router.use(errorLogger);
router.use(errors());

module.exports = router;

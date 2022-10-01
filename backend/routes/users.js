const express = require('express');
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const router = express.Router();
const {
  getUsers, getUserId, updateUser, updateAvatar, getThisUser,
  logout,
} = require('../controllers/users');

router.get('/me', express.json(), getThisUser);
router.post('/logout', express.json(), logout);
router.get('/', express.json(), getUsers);
router.get('/:userId', express.json(), celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
}), getUserId);
router.patch('/me', express.json(), celebrate({
  body: Joi.object().keys({
    about: Joi.string().required().min(2).max(30),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', express.json(), celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i),
  }),
}), updateAvatar);

module.exports = router;

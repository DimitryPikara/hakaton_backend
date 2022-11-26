const jwt = require('jsonwebtoken');

const { Users } = require('../models');

const resGenerator = require('../utils/resGenerator');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return resGenerator(res, 401, { message: 'Poshel naxyu otsyda!' });
  const { id } = jwt.decode(token);
  
  if (!id) return resGenerator(res, 400, { message: 'Proebal idshnik' });

  const findUser = Users.findOne({ where: { id } });

  if (!findUser) return resGenerator(res, 400, { message: 'User not found! Poshel naxyu!' });

  return next();
};

module.exports = verifyToken;

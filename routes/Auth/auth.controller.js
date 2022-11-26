const jwt = require('jsonwebtoken');

const resGenerator = require('../../utils/resGenerator');

const { createUser, logout } = require('./auth.query');

module.exports = {
  async createUser(req, res) {
    try {
      const token = req.headers.authorization;
      if (!token) return resGenerator(res, 401, { message: 'Invalid token' });
      const userWithToken = await createUser(req.body, token);
      resGenerator(res, 201, userWithToken); 
    } catch (error) {
      resGenerator(res, 401, error);
    }
  },
  async logout(req, res) {
    try {
      const token = req.headres.authorization;
      if (!token) return resGenerator(res, 400, { message: 'Invalid token' });
      const { id } = jwt.decode(token);
      await logout(id);
      resGenerator(res, 200)
    } catch (error) {
      resGenerator(res, 400, error);
    }
  }
};
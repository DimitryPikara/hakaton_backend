const jwt = require('jsonwebtoken');
const wifiName = require('wifi-name');

const resGenerator = require('../../utils/resGenerator');

const { createOrGetUser, logout } = require('./auth.query');

module.exports = {
  async createUser(req, res) {
    try {
      const token = req.headers.authorization;
      if (!token) return resGenerator(res, 401, { message: 'Invalid token' });
      const userWithToken = await createOrGetUser(req.body, token);
      resGenerator(res, 201, userWithToken); 
    } catch (error) {
      console.log(error);
      resGenerator(res, 400, error);
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

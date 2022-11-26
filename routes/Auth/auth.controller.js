const jwt = require('jsonwebtoken');

const resGenerator = require('../../utils/resGenerator');

module.exports = {
  async createUser(req, res) {
    try {
      const token = req.headers.authorization;
      const {
        id,
        firstName,
        lastName,
        jobTitle,
      } = req.body;
      if (!token) return resGenerator(res, 401, { message: 'Invalid token' });
      
    } catch (error) {
      resGenerator(res, 401, error);
    }
  }
};

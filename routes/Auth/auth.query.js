const {
  Users,
  ApiTokens,
  sequelize,
} = require('../../models');

module.exports = {
  async createUser(data) {
    const {
      id,
      firstName,
      lastName,
      jobTitle,
      token,
    } = data;

    let transaction;

    try {
      transaction = await sequelize.transaction();

      const newUser = await Users.create({
        id,
        firstName,
        lastName,
        role: jobTitle.includes('студент') ? 'student' : 'teacher',
      }, { transaction });

      const createdToken = await ApiTokens.create({
        accessToken: token,
        userId: id,
      }, { transaction });

      await transaction.commit();

      return {
        user: newUser,
        token: createdToken,
      };

    } catch (error) {
      if (transaction) await transaction.rollback()
      throw error;
    }
  },
  logout(id) {
    return ApiTokens.destroy({ where: { userId: id } })
  }
}

const {
  Users,
  ApiTokens,
  sequelize,
  Groups,
} = require('../../models');

module.exports = {
  async createOrGetUser(data, token) {
    const {
      id,
      firstName,
      lastName,
      jobTitle,
      displayName,
    } = data;

    let transaction;

    try {
      const existUser = await Users.findOne({ where: { id } });

      if (existUser) {
        const existToken = await ApiTokens.findOne({ where: { userId: id } });
        const group = await Groups.findOne({ where: { id: existUser.groupId }});
        return {
          user: existUser,
          token: existToken.accessToken,
          group: group,
        };
      }

      if (existUser && !existUser?.isFirstLogin && jobTitle === 'студент') {
        const existToken = await ApiTokens.findOne({ where: { userId: id } });
        const group = await Groups.findOne({ where: { id: existUser.groupId }});
        return {
          user: existUser,
          token: existToken.accessToken,
          group: group,
        };
      }

      transaction = await sequelize.transaction();

      const newUser = await Users.create({
        id,
        firstName,
        lastName,
        role: jobTitle.includes('студент') ? 'student' : 'teacher',
        isFirstLogin: jobTitle === 'студент',
        displayName,
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

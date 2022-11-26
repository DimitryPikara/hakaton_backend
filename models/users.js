module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    patronymic: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: ['student', 'teacher'],
      },
      defaultValue: 'student',
    },
    groupId: DataTypes.UUID,
    lectureId: DataTypes.UUID,
  });

  Users.associate = ({
    Lectures,
    Groups,
    LecturesUsers,
    ApiTokens,
  }) => {
    Users.belongsTo(Groups, {
      foreignKey: 'groupId',
      targetKey: 'id',
      as: 'group',
    });
    Users.hasMany(Lectures, {
      as: 'lectures',
    })
    Users.hasOne(LecturesUsers, {
      foreignKey: 'userId',
      as: 'lectureUsers',
    })
    Users.hasMany(ApiTokens, {
      foreignKey: 'userId',
      sourceKey: 'id',
      as: 'tokens',
    })
  }

  return Users;
};
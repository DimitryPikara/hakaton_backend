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
      defaultValue: 'student',
    },
    groupId: DataTypes.UUID,
    isFirstLogin: DataTypes.BOOLEAN,
    displayName: DataTypes.STRING,
  });

  Users.associate = ({
    Groups,
    ApiTokens,
  }) => {
    Users.belongsTo(Groups, {
      foreignKey: 'groupId',
      targetKey: 'id',
      as: 'groups',
    });
    Users.hasMany(ApiTokens, {
      foreignKey: 'userId',
      sourceKey: 'id',
      as: 'tokens',
    })
  }

  return Users;
};
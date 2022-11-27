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
    Lectures,
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
    });
    Users.belongsToMany(Lectures, {
      foreignKey: 'userId',
      through:'LecturesUsers',
      as: 'users',
    });
  }

  return Users;
};
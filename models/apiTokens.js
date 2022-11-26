module.exports = (sequelize, DataTypes) => {
  const ApiTokens = sequelize.define('ApiTokens', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    accessToken: DataTypes.TEXT,
    userId: DataTypes.UUID,
  });

  ApiTokens.associate = ({ Users }) => {
    ApiTokens.belongsTo(Users, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'user',
    })
  };

  return ApiTokens;
};
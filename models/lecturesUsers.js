module.exports = (sequelize, DataTypes) => {
  const LecturesUsers = sequelize.define('LecturesUsers', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lectureId: DataTypes.UUID,
    userId: DataTypes.UUID,
    isCheck: DataTypes.BOOLEAN,
  });
  
  LecturesUsers.associate = ({ Users, Lectures }) => {
    LecturesUsers.belongsTo(Users, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'user',
    });
    LecturesUsers.belongsTo(Lectures, {
      foreignKey: 'leatureId',
      targetKey: 'id',
      as: 'lecture',
    });
  }

  return LecturesUsers;
};
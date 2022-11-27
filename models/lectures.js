module.exports = (sequelize, DataTypes) => {
  const Lectures = sequelize.define('Lectures', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    teacher: DataTypes.UUID,
    start: DataTypes.DATE,
    registrationTime: DataTypes.NUMBER,
    isOnline: DataTypes.BOOLEAN,
  });
  Lectures.associate = ({
    Groups,
  }) => {
    Lectures.belongsToMany(Groups, {
      through: 'GroupsLectures',
      foreignKey: 'lectureId',
      as: 'groups',
    });
  }

  return Lectures;
};
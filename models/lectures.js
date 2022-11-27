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
    code: DataTypes.STRING,
  });
  Lectures.associate = ({
    Groups,
    LecturesUsers,
  }) => {
    Lectures.belongsToMany(Groups, {
      through: 'GroupsLectures',
      foreignKey: 'lectureId',
      as: 'groups',
    });
    Lectures.hasMany(LecturesUsers, {
      foreignKey: 'lectureId',
      sourceKey: 'id',
      as: 'lectureId',
    });
  }

  return Lectures;
};
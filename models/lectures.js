module.exports = (sequelize, DataTypes) => {
  const Lectures = sequelize.define('Lectures', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    teacher: DataTypes.UUID,
    start: DataTypes.DATE,
    registrationTime: DataTypes.NUMBER,
    isOnline: DataTypes.BOOLEAN,
  });
  Lectures.associate = ({
    Users,
    Groups,
    LecturesUsers,
  }) => {
    Lectures.belongsToMany(Groups, {
      through: 'groupsLectures',
      foreignKey: 'lectureId',
      as: 'groups',
    });
    Lectures.belongsTo(Users, {
      foreignKey: 'teacher',
      targetKey: 'id',
      as: 'teacherLecture',
    });
    Lectures.hasOne(LecturesUsers, {
      foreignKey: 'lectureId',
      as: 'lectureUsers',
    });
  }

  return Lectures;
};
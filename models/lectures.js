module.exports = (sequelize, DataTypes) => {
  const Lectures = sequelize.define('Lectures', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    teacherId: DataTypes.UUID,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    isOnline: DataTypes.BOOLEAN,
  });
  Lectures.associate = ({
    Users,
    Groups,
  }) => {
    Lectures.belongsToMany(Groups, {
      through: 'groupsLectures',
      foreignKey: 'lectureId',
      as: 'groups',
    })
    Lectures.belongsTo(Users, {
      foreignKey: 'teacherId',
      targetKey: 'id',
      as: 'teacher',
    })
  }

  return Lectures;
};
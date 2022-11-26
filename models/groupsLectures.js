module.exports = (sequelize, DataTypes) => {
  const GroupsLectures = sequelize.define('GroupsLectures', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    groupId: DataTypes.UUID,
    lectureId: DataTypes.INTEGER,
  });

  return GroupsLectures;
};
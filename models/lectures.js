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
    end: DataTypes.DATE,
  });

  return Lectures;
};
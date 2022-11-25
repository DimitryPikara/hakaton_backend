module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
  });

  return Groups;
};
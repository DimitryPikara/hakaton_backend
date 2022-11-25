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
      validate: {
        isIn: ['student', 'teacher'],
      },
      defaultValue: 'student',
    },
    group: DataTypes.STRING,
  });

  return Users;
};
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
    groupId: DataTypes.UUID,
    lectureId: DataTypes.UUID,
  });

  Users.associate = ({ Lectures, Groups }) => {
    Users.belongsTo(Groups, {
      foreignKey: 'groupId',
      targetKey: 'id',
      as: 'groupId',
    });
    Users.hasMany(Lectures, {
      as: 'lectures',
    })
  }

  return Users;
};
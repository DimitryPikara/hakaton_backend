module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    usersId: DataTypes.UUID,
  });
  Groups.associate = ({
    Users,
    Lectures,
  }) => {
    Groups.hasMany(Users, {
      foreignKey: 'groupId',
      sourceKey: 'id',
      as: 'users',
    });
    Groups.belongsToMany(Lectures, {
      through: 'GroupsLectures',
      foreignKey: 'groupId',
      as: 'lectures',
    })
  }

  return Groups;
};
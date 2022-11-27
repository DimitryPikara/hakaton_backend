const { Users, Groups, LecturesUsers, Lectures } = require("../../models");

module.exports = {
  getUsersQuery() {
    return Users.findAll();
  },
  getUserById(id) {
    return Users.findOne({
      where: { id },
      include: [
        {
          model: Groups,
          as: "groups",
        },
      ],
    });
  },
  getUsersLecture(lectureId) {
    return Lectures.findOne(
      {
        where: { id: lectureId },
        include: [
          {
            model: Users,
            as: 'users'
          }
        ],
      }
    );
  },
};

const { Users, Groups, LecturesUsers } = require("../../models");

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
    return LecturesUsers.findAll(
      {
        where: { lectureId },
        include: [
          {
            model: Users,
            as: 'user'
          }
        ],
      }
    );
  },
};

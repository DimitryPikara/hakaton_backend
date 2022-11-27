const {
  Lectures,
  sequelize,
  GroupsLectures,
  Groups,
} = require('../../models');

module.exports = {
  getLectureByTeacherId(id) {
    return Lectures.findAll({ where: { id } });
  },
  async createLecture(data) {
    let transaction;
    try {
      const groups = await Groups.findAll();
      transaction = await sequelize.transaction();

      const newLecture = await Promise.all(data.map((item) => Lectures.create({
        start: item.date,
        isOnline: item.isOnline,
        teacher: item.teacher,
        title: item.title,
        registrationTime: 30,
      }, { transaction })));

      await Promise.all(
        newLecture.map((item) =>
          data
            .find(
              (rasp) =>
                rasp.title === item.title && rasp.teacher === item.teacher
            )
            ?.groups.map((groupName) => {
              const groupId = groups.find(
                (group) => group.title === groupName
              )?.id;
              GroupsLectures.create(
                {
                  groupId,
                  lectureId: item.id,
                },
                { transaction }
              );
            })
        )
      );

      await transaction.commit();
      
      return Lectures.findAll({
        include: [
          {
            model: Groups,
            as: 'group',
          }
        ]
      });
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  },
  updateLecture(id, start, end) {
    return Lectures.update(
      { start, end },
      { 
        where: { id },
        returning: true,
        plain: true,
      },
      );
  }
};

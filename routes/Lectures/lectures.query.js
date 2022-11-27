const {
  Lectures,
  sequelize,
  GroupsLectures,
  Groups,
} = require('../../models');
const { v4: uuid } = require("uuid");

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

      const newAss = await Promise.all(
        newLecture.map(
          async (item) =>
            await Promise.all(
              data
                .find(
                  (rasp) =>
                    rasp.title === item.title && rasp.teacher === item.teacher
                )
                ?.groups.filter((group) => group.includes("КТ"))
                .map(async(groupName) => {
                  const groupId = groups.find(
                    (group) => group.title === groupName
                  )?.id;
                  if (!groupId) return;
                  return await GroupsLectures.create(
                    {
                      id: uuid(),
                      groupId: groupId ?? uuid(),
                      lectureId: item.id,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    },
                    { transaction }
                  );
                })
            )
        )
      );

      // console.log(newAss);

      await transaction.commit();
      
      return Lectures.findAll({
        include: [
          {
            model: Groups,
            as: 'groups',
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

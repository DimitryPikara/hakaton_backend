const { Lectures, sequelize, GroupsLectures, Groups } = require("../../models");
const { v4: uuid } = require("uuid");
const { Op } = require("sequelize");
const randomstring = require('randomstring');

module.exports = {
  getLectureByTeacherName(name) {
    return Lectures.findAll({ where: { teacher: { [Op.like]: `${name}%` } }, include: {model: Groups, as: 'groups'} });
  },
  async getLectureByGroupId(id) {
    const group = await Groups.findOne({
      where: { id },
      include: [{ model: Lectures, as: "lectures" }],
    });
    return group.lectures;
  },
  async createLecture(data) {
    let transaction;
    try {
      const groups = await Groups.findAll();
      transaction = await sequelize.transaction();

      const newLecture = await Promise.all(
        data.map((item) =>
          Lectures.create(
            {
              start: new Date(),
              isOnline: item.isOnline,
              teacher: item.teacher,
              title: item.title,
              registrationTime: item.registrationTime,
              code: item.code,
            },
            { transaction }
          )
        )
      );

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
                .map(async (groupName) => {
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

      await transaction.commit();

      return Lectures.findAll({
        include: [
          {
            model: Groups,
            as: "groups",
          },
        ],
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
      }
    );
  },
};

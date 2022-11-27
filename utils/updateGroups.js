const { Groups } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  async updateGroups() {
    await Groups.destroy({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: "__м_2%",
            },
          },
          {
            title: {
              [Op.like]: "__б_4%",
            },
          },
          {
            title: {
              [Op.like]: "__с_5%",
            },
          },
        ],
      },
    });
    const groups = await Groups.findAll();
    const updatedGroups = groups.map((group) => {
      const title = group.title;
      const newTitle = `${title.slice(0, 4)}${
        Number(title[4]) + 1
      }${title.slice(5)}`;
      return {
        ...group.dataValues,
        title: newTitle,
      };
    });
    await Groups.bulkCreate(
      [
        ...updatedGroups,
        { title: "КТбо1-1" },
        { title: "КТмо1-1" },
        { title: "КТсо1-1" },
      ],
      {
        updateOnDuplicate: ["title"],
      }
    );
  },
};

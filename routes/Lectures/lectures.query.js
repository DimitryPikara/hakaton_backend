const {
  Lectures,
} = require('../../models');

module.exports = {
  getLectureByTeacherId(id) {
    return Lectures.findAll({ where: { id } });
  },
  createLecture(data) {
    return Lectures.create(data);
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

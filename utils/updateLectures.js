const { Lectures, Groups, GroupsLectures } = require("../models");
const chrono = require("chrono-node");
const takeTime = require("../routes/Lectures/lectures.helpers");
const { createLecture } = require("../routes/Lectures/lectures.query");
const resGenerator = require('./resGenerator');

const teachersParser = (data) => {
  const teachers = [];
  data?.table?.table?.slice(2)?.map((item) => {
    item.map((lesson, lessonIndex) => {
      if (lessonIndex !== 0 && lesson) {
        teachers.push(
          lesson.split(" ").reduce((acc, element, index) => {
            if (element.includes(".") && element.length === 2 && !acc) {
              return `${lesson.split(" ")[index - 1]}`;
            }
            return acc;
          }, "")
        );
      }
    });
  });
  return teachers;
};

const lessonsParser = (data) => {
  let lessons = [];
  data?.table?.table.slice(2)?.map((item) => {
    item.map((lesson, lessonIndex) => {
      if (lessonIndex !== 0 && lesson) {
        lessons.push({
          title: lesson.split(' ').slice(1).join(' '),
          isOnline: lesson.includes("LMS" || "Teams"),
          date: chrono.ru.parseDate(
            `${
              item[0].split(",")[1].slice(0, 3) + item[0].split(",")[1].slice(4)
            },${takeTime(lessonIndex)}`
          ),
          teacher: data.table.name,
          groups: lesson.split(" ")[0].split(","),
        });
      }
    });
  });
  return lessons;
};

module.exports = {
  async updateLectures(req, res) {
    try {
      let teachers = [];
      await Lectures.truncate();
      await GroupsLectures.truncate();
      const groups = await Groups.findAll();
      await Promise.all(
        groups.map(async (group) => {
          try {
            let response = await fetch(
              `https://cors-everywhere.herokuapp.com/http://165.22.28.187/schedule-api/?query=${group.title}`,
              {
                headers: {
                  Origin: "http://localhost:3000/",
                },
              }
            );
            const groupSchedule = await response.json();
            if (groupSchedule?.choices) {
              const currentGroup = groupSchedule?.choices?.find(
                (choice) => choice.name === group.title
              )?.group;
              if (!currentGroup) return undefined;
              const res = await fetch(
                `https://cors-everywhere.herokuapp.com/http://165.22.28.187/schedule-api/?group=${currentGroup}`,
                {
                  headers: {
                    Origin: "http://localhost:3000/",
                  },
                }
              );
              const groupLectures = await res.json();
              teachers = [...teachers, ...teachersParser(groupLectures)];
              return groupLectures;
            }
            teachers = [...teachers, ...teachersParser(groupSchedule)];
            return groupSchedule;
          } catch (error) {
            console.log(error.message);
          }
        })
      );
      const uniqueTeachers = Array.from(new Set(teachers))?.filter(
        (item) => item
      );

      const teachersSchedules = await Promise.all(
        uniqueTeachers.map(async (teacher) => {
          try {
            const res = await fetch(
              `https://cors-everywhere.herokuapp.com/http://165.22.28.187/schedule-api/?query=${teacher}`,
              {
                headers: {
                  Origin: "http://localhost:3000/",
                },
              }
            );
            const currentSchedule = await res.json();
            if (currentSchedule?.choices) {
              if (teacher === 'Алексеев') {
                const resp = await fetch(`https://cors-everywhere.herokuapp.com/http://165.22.28.187/schedule-api/?group=m7.htm`, {
                  headers: {Origin: "http://localhost:3000/",}
                });
                return await resp.json();
              }
              return null;
            }
            return currentSchedule;
          } catch (error) {
            console.log(error.message);
          }
        })
      );
      const parsedSchedules = teachersSchedules
        .filter((schedule) => schedule)
        .map((schedule) => lessonsParser(schedule));
      const result = await createLecture(parsedSchedules.flat());
      resGenerator(res, 200, result);
    } catch (error) {
      console.log(error.message);
    }
  },
};

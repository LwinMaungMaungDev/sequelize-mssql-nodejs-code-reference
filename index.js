const db = require('./configs/db_config');
const Sequelize = require('sequelize');

const demoStudents = require('./demo_students');

const { Op } = Sequelize;

(async () => {
  try {
    await db.sequelize.sync();
    // *** Create or Delete Records ***
    // await clearStudentTable();
    // await bulkCreateStudents();
    //////////////////////////////////////////

    // *** Query ***
    // Retrieve the name of every student whose their favorite class is Computer Science or they are subscribed to Gorgeous Cyber.
    // const studentNames = await getComputerScienceStudentsOrSubscribersNames();
    // studentNames.forEach((name) => console.log(name.toJSON()));

    // Count the total amount of students in each school year and give the returned column the alias num_students.
    const numberOfStudentsInEachSchoolYear =
      await getNumberOfStudentsInEachSchoolYear();
    numberOfStudentsInEachSchoolYear.forEach((numStudents) =>
      console.log(numStudents.toJSON())
    );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  } catch (e) {
    console.log(e);
  }
})();

async function clearStudentTable() {
  try {
    await db.student.destroy({ truncate: true });
  } catch (e) {
    throw e;
  }
}

async function bulkCreateStudents() {
  try {
    await db.student.bulkCreate(demoStudents, { validate: true });
  } catch (e) {
    throw e;
  }
}

async function getComputerScienceStudentsOrSubscribersNames() {
  try {
    return await db.student.findAll({
      attributes: ['name'],
      where: {
        [Op.or]: {
          favorite_class: 'Computer Science',
          subscribed_to_gorgeous_cyber: true,
        },
      },
    });
  } catch (e) {
    throw e;
  }
}

async function getNumberOfStudentsInEachSchoolYear() {
  try {
    return await db.student.findAll({
      attributes: [
        'school_year',
        [
          db.sequelize.fn('COUNT', db.sequelize.col('school_year')),
          'num_students',
        ],
      ],
      group: 'school_year',
    });
  } catch (e) {
    throw e;
  }
}

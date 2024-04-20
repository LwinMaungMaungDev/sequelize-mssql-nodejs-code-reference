const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

module.exports = {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 20],
    },
  },
  favorite_class: {
    type: DataTypes.STRING,
    defaultValue: 'Computer Science',
  },
  school_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subscribed_to_gorgeous_cyber: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};

const Sequelize = require('sequelize')
const db = require('../db')

const Classroom = db.define('classroom', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.insidehighered.com/sites/default/server_files/media/GettyImages-1312120454.jpg',
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Classroom

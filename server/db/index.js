const db = require('./db')

const Classroom = require('./models/Classroom')
const User = require('./models/User')

//associations could go here!

module.exports = {
  db,
  models: {
    Classroom,
    User,
  },
}

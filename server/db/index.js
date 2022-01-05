const db = require('./db')

const Classroom = require('./models/Classroom')
const User = require('./models/User')

//// ASSOCIATIONS ////
Classroom.hasMany(User)
User.belongsTo(Classroom)

module.exports = {
  db,
  models: {
    Classroom,
    User,
  },
}

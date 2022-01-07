const router = require('express').Router()
const { models: { Classroom, User }} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    res.send({ token: await User.authenticate({ username, password })});
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, classroomId } = req.body;
    console.log('🧑🏻‍💻 user', req.body);
    const user = await User.create({ username, password });
    const classroom = await Classroom.findByPk(classroomId);
    await classroom.addUser(user);
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})

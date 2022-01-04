const router = require('express').Router();
const { models: { Classroom } } = require('../db');

// GET /api/classrooms
router.get('/', async (req, res, next) => {
  try {
    const classrooms = await Classroom.findAll()
    res.json(classrooms)
  } catch (error) {
    console.error('🧑🏻‍💻 Error while getting all classrooms in router!');
    next(error)
  }
});

// GET /api/classrooms/:id
router.get('/:id', async (req, res, next) => {
  try {
    const classroomId = req.params.id;
    const classroom = await Classroom.findByPk(classroomId);
    res.json(classroom);
  } catch (error) {
    console.error('🧑🏻‍💻 Error while getting single classroom in router!');
    next(error);
  }
});

// POST /api/classrooms
router.post('/', async (req, res, next) => {
  try {
    const newClassroom = req.body;
    res.status(201).json(await Classroom.create(newClassroom))
  } catch (error) {
    console.error('🧑🏻‍💻 Error while creating classroom in router!');
    next(error);
  }
});

// DELETE /api/classrooms/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const classroom = await Classroom.findByPk(id);
    await classroom.destroy();
    res.json(classroom);
  } catch (error) {
    console.error('🧑🏻‍💻 Error while deleting classroom in router!');
    next(error);
  }
});

// PUT /api/classrooms/:id
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const editedClassroom = req.body;
    const classroom = await Classroom.findByPk(id);
    res.json(await classroom.update(editedClassroom));
  } catch (error) {
    console.error('🧑🏻‍💻 Error while editing classroom in router!');
    next(error);
  }
});

module.exports = router;

const {db, models: { Classroom, User } } = require('../server/db')

async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Create classrooms
  const classrooms = await Promise.all([
    Classroom.create({
      name: 'Fullstack Academy',
      imageUrl: 'https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/39/original/fullstack-academy-logo-square-lg.jpg',
    }),
    Classroom.create({
      name: 'Grace Hopper Academy',
      imageUrl: 'https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/261/original/161012-gh-facebook-profile-2x.jpg',
    })
  ])

  // Create users
  const users = await Promise.all([
    User.create({
      username: 'luke',
      password: '123',
    }),
    User.create({
      username: 'yehoon',
      password: '123',
    }),
    User.create({
      username: 'visitor',
      password: '123',
    })
  ])

  // Associate classrooms and users
  const [ fullstack, graceHopper ] = classrooms
  const [ luke, yehoon, visitor ] = users
  await fullstack.addUser(luke)
  await graceHopper.addUser(yehoon)

  console.log(`seeded ${classrooms.length} classrooms`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    classrooms: {
      fullstackAcademy: classrooms[0],
      graceHopper: classrooms[1],
    },
    users: {
      cody: users[0],
      murphy: users[1],
    }
  }
}

/*
  We've separated the `seed` function from the `runSeed` function.
  This way we can isolate the error handling and exit trapping.
  The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

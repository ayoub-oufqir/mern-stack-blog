if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: __dirname+'/.env'});
}
const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const port = process.env.PORT || 4000;
// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
// app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  // poolSize: 1
})
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(port, () => {
      console.log('listening for requests on port', port)
    })
  })
  .catch((err) => {
    console.log(err)
  })

// app.use('/some-route', require(path.join(__dirname, 'api', 'routes', 'workouts.js')));
// GET all workouts
// app.get('/', require(path.join(__dirname, 'api', 'routes', 'workouts.js')))

// // GET a single workout
// app.get('/:id', require(path.join(__dirname, 'api', 'routes', 'workouts.js')))

// // POST a new workout
// app.post('/', require(path.join(__dirname, 'api', 'routes', 'workouts.js')))

// // DELETE a workout
// app.delete('/:id', require(path.join(__dirname, 'api', 'routes', 'workouts.js')))

// // UPDATE a workout
// app.patch('/:id', require(path.join(__dirname, 'api', 'routes', 'workouts.js')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
  })
}
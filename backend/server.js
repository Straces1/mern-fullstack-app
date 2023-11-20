require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const app = express()

// middleware
// to be able to access data from request object then POST or PATCH
app.use(express.json())

// this just logs path and method of every request made :(
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
// first arg is path to the workoutRoutes, so every route inside workouts is now relative
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to DB an listening on port ${process.env.PORT}`)
         })
    })
    .catch((err) => console.log(err))


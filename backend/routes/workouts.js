const express = require('express')
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout,
} =require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// this is the custom middleware that will fire before any folowing requests and 
//it will authorize the user if they can get the stuff from db
router.use(requireAuth)

//GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router
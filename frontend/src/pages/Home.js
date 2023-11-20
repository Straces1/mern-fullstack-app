import { useEffect } from "react"
import { useWorkoutContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"


const Home = () => {
  //const [workouts, setWorkouts] = useState(null)
  const {workouts, dispatch} = useWorkoutContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}` // this is used on backend by the middleware function requireAuth
        }
      })
      console.log(response)
      const json = await response.json()
      console.log('json:', json)

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    // the fetch function will run only if there is a user -- user has to be in dependencies as well
    if (user) {
      fetchWorkouts()
    }
    
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home
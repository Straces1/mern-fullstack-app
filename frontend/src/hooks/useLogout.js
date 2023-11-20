import { useAuthContext } from "./useAuthContext"
import { useWorkoutContext } from "./useWorkoutsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: wokoutsDispatch } = useWorkoutContext()
    const logout = () => {
        

        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        wokoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}
}
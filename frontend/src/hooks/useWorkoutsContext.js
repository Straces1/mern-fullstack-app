import { WorkoutContext } from "../context/WorkoutContext"; // actual context
import { useContext } from "react";

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext) // thisw WorkoutContext will return the value ospecified in context provider

    // check if we are located within the scope of the context provider
    if (!context) {
        throw Error('useWorkoutContext mjust be used inside an WorkoutsContextProvider')
    }
    return context
}
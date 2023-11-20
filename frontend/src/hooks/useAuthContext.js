import { AuthContext } from "../context/AuthContext"; // actual context
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext) // thisw WorkoutContext will return the value ospecified in context provider

    // check if we are located within the scope of the context provider
    if (!context) {
        throw Error('useAuthContext mjust be used inside an AuthContextProvider')
    }
    return context
}
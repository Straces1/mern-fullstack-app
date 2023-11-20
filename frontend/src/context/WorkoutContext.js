import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
                // this just gets the whole payload which is array of objects
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts] // due to this spread operator, you can refference just workouts later on instead of state.workouts
                // this takes a array adds an item to it and spread the preexisting array of work objects from prew state value
            }
        case 'DELETE_WORKOUT':
            return { 
              workouts: state.workouts.filter(w => w._id !== action.payload._id) 
            }
        default:
            return state
    }
}

export const WorkoutContextProvider = ({ children }) => {
    // instead of dynamic state lets use useReducer --> treba konecne pochopim k cemu to je dobry
    // use reducer takes two arguments: reducer function name --> workoutsReducer
    //                                  initial value for the states
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })


    return (
        // value prop whatever is here than it will be available to our components --> we provide 
        // the state and dispatch, so its avaialable in our components
        // the way to consume these two things is to use useContext hook and specify which context we wanna use,
        // but lets create a custom hook
        <WorkoutContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutContext.Provider>
    )
}

// use reducer is similar to useState in that we get back a state value and a function dispatch
// to update that state value, we also specify the initial value for the state, 
// diffferent from useState is the reducer function --> you update the state by reducer function 
// and also the dispatch function as well
// if you wanna update the state object, you first call the dispatch function where you pass an object as a argument
// that object has tho properties:
//       --  type which is a string (all capitals) that describes in words the state change that we wanna make
//       -- payload which represents any data we need to make this change, in this case it would be the array of workouts
//  
//    dispatch({type: 'SET_WORKOUTS', payload: [{}, {}]})
//
//       --> this is how you invoke this dispatch function and the argument inside it is known as an action
//
//  when you call this dispatch function, in turn our reducer function is invoked (workoutReduce) and it passes the action 
//  into the reducer action so it can update the state using that data
//
// reducer function takes in two arguments:
//                  --> the state (prewioust state before we make the change to it) --prewious state value
//                  --> action: which is that object passed into the dispatch higher
// inside of the reducer functiou you typicaly check the action type (what do you want to do with the data)
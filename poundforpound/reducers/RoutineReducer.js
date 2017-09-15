import {
    ROUTINE_ADDED,
    ROUTINE_UPDATE,
    EXERCISE_ADDED,
    EXERCISE_UPDATE,
    EXERCISE_FETCH_SUCCESS,
    EXERCISE_ADDED_TO_ROUTINE,
    FETCH_ROUTINE_EXERCISES,
    FETCH_ROUTINES
} from '../actions/types';

const INITIAL_STATE = {
    routineName: '',
    exerciseName: '',
    r_uid: '',
    e_uid: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ROUTINE_ADDED:
            return { ...state, routineName: action.payload.routineName, r_uid: action.payload.r_uid}
        case EXERCISE_ADDED:
            return { ...state, exerciseName: action.exerciseName, e_uid: action.e_uid }
        case ROUTINE_UPDATE:
            return { ...state,  routineName: action.routineName }
        case EXERCISE_UPDATE:
            return { ...state, exerciseName: action.exerciseName }
        case EXERCISE_FETCH_SUCCESS:
            console.log('RoutineReducer')
            console.log(action.payload);
            return action.payload;
        case EXERCISE_ADDED_TO_ROUTINE:
            return { ...state, exerciseName: action.payload.exerciseName, r_uid: action.payload.r_uid}
        default:
            return state;
    }
}
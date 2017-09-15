import { combineReducers } from 'redux'
import RoutineReducer from './RoutineReducer';
import ExercisesReducer from './ExercisesReducer';
import RoutineExercisesReducer from './RoutineExercisesReducer';
import ExerciseSetsReducer from './ExerciseSetsReducer';
import FetchRoutines from './FetchRoutines';
import AuthReducer from './AuthReducer';
export default combineReducers({
    routineForm: RoutineReducer,
    exercises: ExercisesReducer,
    routineExercises: RoutineExercisesReducer,
    exerciseSets: ExerciseSetsReducer,
    routines: FetchRoutines,
    auth: AuthReducer
});
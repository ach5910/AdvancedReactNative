import {
    FETCH_ROUTINE_EXERCISES
} from '../actions/types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_ROUTINE_EXERCISES:
            return action.payload;
        default:
            return state;
    }
}
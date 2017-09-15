import {
    FETCH_ROUTINES
} from '../actions/types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_ROUTINES:
            return action.payload;
        default:
            return state;
    }
}
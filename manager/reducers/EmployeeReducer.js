import {
    EMPLOYEES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};


export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case EMPLOYEES_FETCH_SUCCESS:
            // This can help reorganize code
            // return { ...state, [id]: action.payload }
            console.log('Reducer')
            console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
}
import {
    UPDATE_WEIGHT,
    UPDATE_REPS,
    FETCH_SETS,
    CREATE_SET,
    UPDATE_SET
} from '../actions/types';

const INITIAL_STATE = {
   weight_0: '0',
   reps_0: '0',
   weight_1: '0',
   reps_1: '0',
   weight_2: '0',
   reps_2: '0',
   weight_3: '0',
   reps_3: '0',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UPDATE_WEIGHT:
            return { ...state, s_uid: action.payload.s_uid, weight: action.payload.weight};
        case UPDATE_REPS:
            return { ...state, s_uid: action.payload.s_uid, weight:action.payload.reps}
        case CREATE_SET:
            return { ...state, s_uid: action.payload.s_uid, weight: "0", reps: "0"}
        case UPDATE_SET:
            return { ...state, [action.payload.prop]: action.payload.value}
        case FETCH_SETS:
            return action.payload;
        default:
            return state;
    }
}
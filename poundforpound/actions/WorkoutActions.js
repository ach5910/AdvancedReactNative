import firebase from 'firebase';
import {
    ROUTINE_ADDED,
    ROUTINE_UPDATE,
    EXERCISE_ADDED,
    EXERCISE_UPDATE,
    EXERCISE_FETCH_SUCCESS,
    EXERCISE_ADDED_TO_ROUTINE,
    FETCH_ROUTINE_EXERCISES,
    UPDATE_WEIGHT,
    UPDATE_REPS,
    FETCH_SETS,
    CREATE_SET,
    UPDATE_SET,
    FETCH_ROUTINES
} from './types'

export const createRoutine = (routineName) => {
    return (dispatch) => {
        firebase.database().ref('/users/Aaron/routines')
            .push(routineName)
            .then((snap) => {
                dispatch(addRoutine(routineName, snap.key));
            })
    };
           

}

export const updateWeight = (r_uid, uid, s_uid, weight) => {
    return (dispatch) => {
        firebase.database().ref(`users/Aaron/routine/${r_uid}/exercises/${uid}/sets/${s_uid}`)
            .set({weight})
            .then(() => {
                dispatch({ type: UPDATE_WEIGHT, payload: {s_uid, weight} })
            })
    }
}

export const addSetToExercise = (r_uid, uid) => {
    return (dispatch) => {
        const newSet = {weight: '0', reps: '0'};
        firebase.database().ref(`users/Aaron/routine/${r_uid}/exercises/${uid}/sets`)
            .push({newSet})
            .then((snap) => {
                dispatch({ type: CREATE_SET, payload: {s_uid: snap.key}})
            })
    }
}
export const updateReps = (r_uid, uid, s_uid, reps) => {
    return (dispatch) => {
        firebase.database().ref(`users/Aaron/routine/${r_uid}/exercises/${uid}/sets/${s_uid}`)
            .set({reps})
            .then(() => {
                dispatch({ type: UPDATE_REPS, payload: {s_uid, reps} })
            })
    }
}

export const fetchExerciseSets= (r_uid, uid) => {
    return(dispatch) => {
        firebase.database().ref(`users/Aaron/routine/${r_uid}/exercises/${uid}/sets`)
            .on('value', snapshot => {
                dispatch({ type: FETCH_SETS , payload: snapshot.val()})
            })
    }
}
export const fetchRoutineExercises = (r_uid) => {
    return (dispatch) => {
        firebase.database().ref(`users/Aaron/routines/${r_uid}/exercises/`)
            .on('value', snapshot => {
                console.log('fetchRoutineExercises r_uid:' + r_uid)
                console.log('fetchRoutineExercises :' + snapshot.val());
                dispatch({ type: FETCH_ROUTINE_EXERCISES , payload: snapshot.val()})
            })
    }
}

export const updateSet = (new_set, uid, r_uid) => {
    return (dispatch) => {
        firebase.database().ref(`users/Aaron/routines/${r_uid}/exercises/${uid}/${new_set.r_prop}`)
            .set(new_set.r_value)
            .then(() => {
                firebase.database().ref(`users/Aaron/routines/${r_uid}/exercises/${uid}/${new_set.w_prop}`)
                    .set(new_set.w_value)
                    .then(() => {
                        dispatch({type: UPDATE_SET, payload: { new_set }})
                    })
            })
    }
}
export const appendExercise = (exerciseName, r_uid) => {
    return {
        type: EXERCISE_ADDED_TO_ROUTINE,
        payload: {exerciseName, r_uid}
    }
}
export const addExerciseToRoutine = (e_uid, r_uid) => {
    return (dispatch) => {
        firebase.database().ref(`users/Aaron/exercises/${e_uid}`)
            .once('value')
            .then((snap) => {
                const newExercise = snap.val();
                firebase.database().ref(`users/Aaron/routines/${r_uid}/exercises`)
                    .push(newExercise)
                    .then(() => {
                    dispatch(appendExercise(newExercise.exerciseName, r_uid));
                })
            })
        
    }
}
export const addRoutine = (routineName, r_uid) => {
    return {
        type: ROUTINE_ADDED,
        payload: {routineName, r_uid}
    }
}

export const updateRoutine = (routineName) => {
    return {
        type: ROUTINE_UPDATE,
        routineName 
    }
}

export const updateExercise = (exerciseName) => {
    return {
        type: EXERCISE_UPDATE,
        exerciseName
    }
}
export const createExercise = (exerciseName, r_uid) => {
    // const name = 'Aaron'
    const exerciseParams = {weight_0: '0', reps_0: '0', weight_1: '0', reps_1: '0', weight_2: '0', reps_2: '0', weight_3: '0', reps_3: '0', exerciseName}
    console.log('In Create Exercise');
    return (dispatch) => {
        firebase.database().ref('/users/Aaron/exercises')
            .push(exerciseParams)
            .then((snap) => {
                console.log('Create Exercise then block');
                dispatch(addExerciseToRoutine(snap.key, r_uid));
            })
            .catch((err) => {
                console.log(err);
                console.log('Error trying to create exercise');
            });
    };
};

export const exercisesFetch = () => {
    // const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref('/users/Aaron/exercises')
            .on('value', snapshot => {
                console.log(snapshot.val());
                dispatch({ type: EXERCISE_FETCH_SUCCESS, payload: snapshot.val()})
            })
    }
}

export const routinesFetch = () => {
    return (dispatch) => {
        firebase.database().ref('users/Aaron/routines')
            .on('value', snapshot => {
                dispatch({type: FETCH_ROUTINES, payload: snapshot.val()})
            })
    }
}
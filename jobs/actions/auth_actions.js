import { AsyncStorage } from 'react-native';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';
import { Facebook } from 'expo';

// How to use AsyncStorage
// AsyncStorage.setItem('fb_token, token);
// AsyncStorage.getItem('fb_token');
export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
        // dispatch an action saying that FB login is done
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
    }else{
        // Start up FB Login process
        doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async dispatch => {
    //this code will pop us a modal to login in
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('1408880749149563', {
        permissions: ['public_profile']
    });
    if(type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL })
    }
    await AsyncStorage.setItem('fb_token', token);
    dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});
};

// With an arrow function, if you are just returning a var
// you can remove the {} and return . Alse if onyl one param is being passed (dispatch)
// -> dispatch 
//
// export const facebookLogin = () => {
//     return async (dispatch) => {
//         let token = await AsyncStorage.getItem('fb_token');
//         if (token) {
            
//         }else{
            
//         }
//     }
// };
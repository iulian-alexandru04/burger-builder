import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (authData) => ({
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
});

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error: error
});

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart);
        const authData = {
            email: email, 
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBI7rnQZFL5i_Y0osnBbcNb5VHggeVECdc';
        if (isSignup)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBI7rnQZFL5i_Y0osnBbcNb5VHggeVECdc';
        axios.post(url, authData)
            .then(response => dispatch(authSuccess(response.data)))
            .catch(err => dispatch(authFail(err)));
    };
};

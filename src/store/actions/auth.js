import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
});

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error: error
});

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {type: actionTypes.AUTH_LOGOUT};
};

export const checkAuthTimeout = (expirationTime) =>
    dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart);
        const authData = {
            email: email, 
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBI7rnQZFL5i_Y0osnBbcNb5VHggeVECdc';
        if (isSignup)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBI7rnQZFL5i_Y0osnBbcNb5VHggeVECdc';
        axios.post(url, authData)
            .then(response => {
                const expirationTime = new Date().getTime() + response.data.expiresIn * 1000;
                const expirationDate = new Date(expirationTime);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => dispatch(authFail(err.response.data.error)));
    };
};

export const setAuthRedirectPath = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
});

export const authCheckState = () => 
    dispatch => {
        const token = localStorage.getItem('token');
        if(!token)
        {
            dispatch(logout());
            return;
        }
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if(expirationDate <= new Date())
        {
            dispatch(logout());
            return;
        }
        const expiresIn = expirationDate.getTime() - new Date().getTime();
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expiresIn / 1000));
    };

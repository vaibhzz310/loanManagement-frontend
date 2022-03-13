import {LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS, FAILURE} from './authTypes';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase-config';


export const signInWithGoogle = () => {
    return dispatch => {
        dispatch(loginRequest());
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
        .then((result) => {
            // // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;

            const loanApplicantUser = result.user.email.split('@')[0];
            console.log("from authActions.js Success in google signIn from"+loanApplicantUser);
            dispatch(success(true,loanApplicantUser));
            // ...
        }).catch((error) => {
            // // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // // ...
            dispatch(failure());
        });
    };
    
}

export const logoutUser = () => {
    return dispatch => {
        dispatch(logoutRequest());
        dispatch(success(false,null));
    };
};

const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const success = (isLoggedIn,loanApplicantUser,) => {
    return {
        type: SUCCESS,
        payload: {isLoggedIn:isLoggedIn,loanApplicantUser:loanApplicantUser}
    };
};

const failure = () => {
    return {
        type: FAILURE,
        payload: {isLoggedIn:false,loanApplicantUser:null}
    };
};
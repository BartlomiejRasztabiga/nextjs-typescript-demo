import Router from "next/router";
import axios from 'axios'

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';

export const logInRequest = () => ({
    type: LOG_IN_REQUEST,
})

export const logInSuccess = access_token => {
    localStorage.setItem('access_token', access_token)
    return {
        type: LOG_IN_SUCCESS,
        payload: {
            access_token
        }
    }
}

export const logInFailure = error => {
    localStorage.removeItem('access_token')
    return {
        type: LOG_IN_FAILURE,
        payload: error
    }
}

export const logOut = () => {
    localStorage.removeItem('access_token')
    return {
        type: LOG_OUT
    }
}

export const logOutAndRedirect = () => {
    return (dispatch, state) => {
        dispatch(logOut())
        Router.push("/")
    }
}

export const login = (email, password) => {
    return async dispatch => {
        dispatch(logInRequest())
        const response = await axios.post('/api/auth/login', {
            email,
            password
        })
        const token = response.data.access_token
        if (token) {
            dispatch(logInSuccess(token))
            Router.push("/logged")
        } else {
            dispatch(logInFailure({ body: response.data, code: response.status }))
        }
    }
}
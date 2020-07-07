import { LOG_IN, LOG_OUT } from '../actions/authActions'

const defaultState = {
    isLoggedIn: false,
    access_token: null
}

const authReducer = (state = defaultState, action) => {
    console.log(action)
    switch (action.type) {
        case LOG_IN:
            return { ...state, isLoggedIn: true, access_token: action.payload };
        case LOG_OUT:
            return { ...state, isLoggedIn: false, access_token: null };
        default:
            return { ...state };
    }
}

export default authReducer
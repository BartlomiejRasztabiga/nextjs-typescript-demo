import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../actions/authActions'

const initialState = {
    isAuthenticated: false,
    access_token: null,
    login_error: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            return { ...state, isAuthenticated: false, access_token: null };
        case LOG_IN_SUCCESS:
            return { ...state, isAuthenticated: true, access_token: action.payload.access_token };
        case LOG_IN_FAILURE:
            return { ...state, isAuthenticated: false, access_token: null, login_error: action.payload }
        default:
            return { ...state };
    }
}

export default authReducer
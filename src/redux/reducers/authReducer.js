import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_USER} from "../types";

const INITIAL_STATE = {
    loggedIn: false,
    token: null,
    loading: false,
    error: ''
};

export function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_START:
            return {...state, loading: true, error: ''};
        case LOGIN_SUCCESS:
            return {...state, loading: false, loggedIn: true, token: action.payload, error: ''};
        case LOGIN_FAILED:
            return {...state, loading: false, error: action.payload};
        case LOGOUT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default authReducer;
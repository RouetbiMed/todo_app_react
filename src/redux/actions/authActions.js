import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_USER
} from "../types";
import history from '../../utils/history';
import axios from 'axios';

import {LOGIN_ENDPOINT, LOGOUT_ENDPOINT, REGISTER_ENDPOINT} from "../../utils/endPoints";
import {apiUrl} from "../../config/config";

export function login(email, password) {
    return async (dispatch) => {
        dispatch({type: LOGIN_START});

        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await axios.post(apiUrl + LOGIN_ENDPOINT, formData, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            localStorage.setItem("token", response.data.token);
            dispatch({type: LOGIN_SUCCESS, payload: response.data.token});
            history.push('/');
        } catch (e) {
            dispatch({type: LOGIN_FAILED, payload: e.response.data.message});
        }
    };
}

export function logout() {
    return async (dispatch) => {
        try {
            const authToken = `Bearer ${localStorage.getItem('token')}`;
            await axios.post(apiUrl + LOGOUT_ENDPOINT, null, {
                headers: {
                    Authorization: authToken,
                }
            });
        } catch (e) {
            console.log(e.message);
        }
        localStorage.removeItem("token");
        dispatch({type: LOGOUT_USER});
        history.push("/");
    }
}

export function register(name, email, password, passwordConfirmation) {
    return async (dispatch) => {
        dispatch({type: LOGIN_START});

        let formData = new FormData();
        formData.append("email", email);
        formData.append("name", name);
        formData.append("password", password);
        formData.append("password_confirmation", passwordConfirmation);

        try {
            const response = await axios.post(apiUrl + REGISTER_ENDPOINT, formData);
            localStorage.setItem("token", response.data.token);
            dispatch({type: LOGIN_SUCCESS, payload: response.data.token});
            history.push('/');
        } catch (e) {
            console.log(e.message);
            dispatch({type: LOGIN_FAILED, payload: e.message});
        }
    };
}

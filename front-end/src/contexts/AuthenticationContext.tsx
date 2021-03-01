import * as React from "react";

import axios from "axios";
import {DEFAULT_REQUEST_ERROR, server_address} from "../util/Constants";
import {User} from "../util/Interfaces";


let user = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser") as string)
    : {};
let token = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser") as string).token
    : "";

export const initialState = {
    ...user,
    token: "" || token,
    loading: false,
    errorMessage: null,
};

export const AuthReducer = (state: User, action: { type: string; payload: any; error: any; }) => {
    console.log("Receiving action " + action.type + " -> Payload: " + JSON.stringify(action.payload))
    switch (action.type) {
        case "REQUEST_LOGIN":
            return {
                ...state,
                loading: true
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                ...action.payload,
                loading: false
            };
        case "LOGOUT":
            return {
                ...state,
                token: ""
            };

        case "LOGIN_ERROR":
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

const AuthContext = React.createContext({
    user: {} as User, dispatch: (props: any) => {
    }, logout: () => {
    }, loginUser: (loginPayload: any) => {
    }
});

export const useAuthContext = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }

    return context;
}


export const AuthProvider = ({children}: any) => {

    const [user, dispatch] = React.useReducer(AuthReducer, initialState);

    const loginUser = async (loginPayload: any) => {
        let errorMessage = DEFAULT_REQUEST_ERROR;
        let send = false;
        try {
            dispatch({error: null, payload: null, type: 'REQUEST_LOGIN'});
            let response = await axios.post(server_address + "/token/generate-token", loginPayload);
            if (response.data.token && response.data.email) {
                dispatch({error: null, type: 'LOGIN_SUCCESS', payload: response.data});
                localStorage.setItem('currentUser', JSON.stringify(response.data));
                send = true;
                return response.data;
            } else if (response.data.internalError) {
                send = true;
                dispatch({payload: null, type: 'LOGIN_ERROR', error: response.statusText});
                return response.data;
            } else
                errorMessage = response.statusText;
        } catch (error) {
            console.log("Error #DispatchLoginRequest " + error)
        } finally {
            if (!send) {
                dispatch({payload: null, type: 'LOGIN_ERROR', error: errorMessage});
            }
        }
    }

    const logout = async () => {
        dispatch({error: null, payload: null, type: 'LOGOUT'});
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider children={children} value={{user, dispatch, logout, loginUser}}/>
    );
}
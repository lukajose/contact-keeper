import React, {useReducer} from 'react';
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';



const AuthState = props => {
    const initialState = {
        token:localStorage.getItem('token') || ' ',
        isAuthenticated:null,
        loading:true,
        error:null,
        user:null
    };

    const [state,dispatch] = useReducer(AuthReducer,initialState);
    console.log('state:',state)
    //Load user
    const loadUser = async () => {
        console.log('Load user')
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type:USER_LOADED,
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            });
        }
    }

    // Register User
    const register = async formData => {
        console.log('register')
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        try {
            // we pass the form data to axios which does another call to our server which gives back the token
            const res = await axios.post('/api/users',formData,config)
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
            console.log('Added user to DB check again')
            loadUser();
        
        } catch(err) {
            console.log('Error happened:',err)
            dispatch({
                type:REGISTER_FAIL,
                payload:'User already exists'
            })
        }
    }
    // Login User
    const login = async (formData) => {
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        };
        
        try {
            const res = await axios.post('/api/auth', formData,config);
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
            console.log('user is logged in:',res.data)
            loadUser();

        } catch(err) {
            console.log('login fail:',err.response.data)
            dispatch({
                type:LOGIN_FAIL,
                payload:err.response.data.msg
            })

        }
    }
    // Logout
    const logout = () => dispatch({type:LOGOUT})
    // Clear errors
    const clearErrors = () => {
        console.log('Clear errors')
        dispatch({
            type:CLEAR_ERRORS
        })
    }
    console.log('state:',state)
    return (
        <AuthContext.Provider value={{
            token:state.token,
            isAuthenticated:state.isAuthenticated,
            loading:state.loading,
            user:state.user,
            error:state.error,
            register,
            login,
            logout,
            clearErrors,
            loadUser

        }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState;
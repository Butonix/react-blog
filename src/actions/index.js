import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
    FETCH_POSTS, 
    FETCH_POST, 
    CREATE_POST, 
    UPDATE_POST, 
    DELETE_POST,
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from './types';

const LOCALHOST_ROOT_URL = 'http://localhost:8080/api';

export function fetchPosts(){
    const request = axios.get(`${LOCALHOST_ROOT_URL}/posts`);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function fetchPost(slug){
    const request = axios.get(`${LOCALHOST_ROOT_URL}/posts/${slug}`);
    return {
        type: FETCH_POST,
        payload: request
    };
}

export function createPost(values, callback){
    const request = axios.post(`${LOCALHOST_ROOT_URL}/posts`, values)
        .then(() => callback());

    return {
        type: CREATE_POST,
        payload: request
    };
}

export function updatePost(values, callback){
    const id = values._id;
    const request = axios.put(`${LOCALHOST_ROOT_URL}/posts/${id}`, values)
        .then(() => callback());

    return {
        type: UPDATE_POST,
        payload: request
    };
}

export function deletePost(slug, callback){
    const request = axios.delete(`${LOCALHOST_ROOT_URL}/posts/${slug}`)
        .then(() => callback());

    return {
        type: DELETE_POST,
        payload: slug
    };
}

export function signinUser({email, password}){

    return function(dispatch){

        axios.post(`${LOCALHOST_ROOT_URL}/signin`, {email, password})

            //Success
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/');
            })
            //Error
            .catch(() => {
                dispatch(authError('Bad login info'));
            });
    }
}

export function signupUser({email, password}){

    return function(dispatch){

        axios.post(`${LOCALHOST_ROOT_URL}/signup`, {email, password})

            //Success
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/');
            })
            //Error
            .catch(error => {
                const e = {...error};
                dispatch(authError(e.response.data.error));
            });
    }
}

export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser(){
    localStorage.removeItem('token');
    browserHistory.push('/');
    return { type: UNAUTH_USER};
}
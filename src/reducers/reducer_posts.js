import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST, UPDATE_POST } from '../actions/types';

export default function(state = {}, action){

    switch(action.type){
        case FETCH_POST:
            return { ...state, [action.payload.data.slug]: action.payload.data };
            break;
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'slug');
            break;
        case DELETE_POST:
            return _.omit(state, action.payload);
            break;
        default: 
            return state;
    }

}
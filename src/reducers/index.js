import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import postsReducer from './reducer_posts';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({

  posts: postsReducer,
  auth: authReducer,
  form: formReducer

});

export default rootReducer;

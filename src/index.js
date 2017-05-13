import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';
import { AUTH_USER } from './actions/types';

import reducers from './reducers';

import App from './components/app';
import About from './components/about';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import PostsEdit from './components/posts_edit';

import Signin from './components/auth/signin';
import Signup from './components/auth/signup';

import RequireAuth from './components/auth/require_auth';

const middlewares = [promise, reduxThunk]

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//If we have a token, than lets Sign in the user
if(token){
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>

      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={PostsIndex} />
          <Route path="/posts/new" component={RequireAuth(PostsNew)} />
          <Route path="/posts/:slug/edit" component={RequireAuth(PostsEdit)} />
          <Route path="/posts/:slug" component={PostsShow} />
          <Route path="/about" component={About} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Route>
      </Router>

  </Provider>
  , document.querySelector('.main'));

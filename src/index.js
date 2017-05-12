import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';

import reducers from './reducers';

import App from './components/app';
import About from './components/about';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import PostsEdit from './components/posts_edit';

import Signin from './components/auth/signin';
import Signup from './components/auth/signup';

const middlewares = [promise, reduxThunk]

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>

      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={PostsIndex} />
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:slug" component={PostsShow} />
          <Route path="/posts/:slug/edit" component={PostsEdit} />
          <Route path="/about" component={About} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Route>
      </Router>

  </Provider>
  , document.querySelector('.main'));

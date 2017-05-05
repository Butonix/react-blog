import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';

import Navbar from './components/navbar';
import Footer from './components/footer';
import About from './components/about';

import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import PostsEdit from './components/posts_edit';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>

      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route path="/posts/:slug/edit" component={PostsEdit} />
            <Route path="/posts/new" component={PostsNew} />
            <Route path="/posts/:slug" component={PostsShow} />
            <Route path="/about" component={About} />
            <Route path="/" component={PostsIndex} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>

  </Provider>
  , document.querySelector('.main'));

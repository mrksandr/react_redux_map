import React, { Component } from 'react';
import store from '../store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import SearchForm from '../containers/SearchForm';

import '../main.css';

function Root() {
  return (
    <Provider store={store}>
      <div>
        <SearchForm />
      </div>
    </Provider>
  );
}

export default Root;

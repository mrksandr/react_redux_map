import React, { Component } from 'react';
import store from '../store';
import { Provider } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import SearchForm from '../containers/SearchForm';
import AddressList from '../containers/AddressList';

import '../main.css';

function Root() {
  return (
    <Provider store={store}>
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <SearchForm />
          </Col>
          <Col xs={12} md={4}>
            <AddressList />
          </Col>
          <Col xs={12} md={8}>
            map
          </Col>
        </Row>
      </Grid>
    </Provider>
  );
}

export default Root;

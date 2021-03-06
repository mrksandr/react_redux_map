import React from 'react';
import { Provider } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import store from '../store';

import SearchForm from './SearchForm';
import AddressList from './AddressList';
import Map from './Map';

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
            <Map
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </Col>
        </Row>
      </Grid>
    </Provider>
  );
}

export default Root;

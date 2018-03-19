import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  withScriptjs,
  GoogleMap,
  Marker,
  withGoogleMap,
} from 'react-google-maps';

import { selectedLocationSelector } from '../selectors';

const initialState = { lat: -34.397, lng: 150.644 };

class Map extends React.Component {
  state = initialState;

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;

        this.setState({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.selectedAddress && this.setState(nextProps.selectedAddress);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState && this.state) {
      const { lat, lon } = this.state;
      const { latNext, lonNext } = nextState;

      if (lat !== latNext || lon !== lonNext) {
        return true;
      }
    }

    return false;
  }

  render() {
    return (
      <GoogleMap zoom={8} center={{ ...this.state }}>
        <Marker position={{ ...this.state }} />
      </GoogleMap>
    );
  }
}

export default withScriptjs(
  withGoogleMap(
    connect(state => ({
      selectedAddress: selectedLocationSelector(state),
    }))(Map),
  ),
);

Map.propTypes = {
  // from connect
  selectedAddress: PropTypes.object,
  // from props
  googleMapURL: PropTypes.string,
  loadingElement: PropTypes.element,
  containerElement: PropTypes.element,
  mapElement: PropTypes.element,
};

import axios from 'axios';

import {
  FETCH_ADDRESS,
  DELETE_ADDRESS,
  SELECT_ADDRESS,
  LOAD_ALL_ADDRESS,
  SUCCESS,
  START,
} from '../constants';

const API_KEY = 'AIzaSyDRAMchG_UXTJVra9_cc1U0RZKPMc3vtM8';
const URL = 'https://maps.googleapis.com/maps/api/geocode/json';

const handleResponse = response => {
  if (response.statusText === 'OK') {
    console.log(response);
    return response.data;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

export const fetchAddress = location => dispatch => {
  axios
    .get(URL, {
      params: {
        address: location,
        key: API_KEY,
      },
    })
    .then(response => {
      if (!response.data.results[0]) throw new Error('Нет результата');
      const data = response.data.results[0];

      const address = {
        id: data.place_id,
        address: data.formatted_address,
        location: {
          lat: data.geometry.location.lat,
          lng: data.geometry.location.lng,
        },
      };

      return axios.post('/api/address', address);
    })
    .then(handleResponse)
    .then(data => {
      dispatch({
        type: FETCH_ADDRESS,
        payload: data,
      });
    })
    .catch(error => {
      console.warn('fetchAddress', error);
    });
};

export const deleteAdress = id => (dispatch, getState) => {
  const mongoId = getState().address.items[id]._id;

  axios
    .delete(`/api/address/${mongoId}`)
    .then(handleResponse)
    .then(data => {
      dispatch({
        type: DELETE_ADDRESS,
        payload: { id: data.address.id },
      });
    })
    .catch(error => {
      console.warn('deleteAdress', error);
    });
};

export const selectAdress = id => dispatch => {
  dispatch({
    type: SELECT_ADDRESS,
    payload: { id },
  });
};

export const loadAllAddresses = () => dispatch => {
  dispatch({
    type: LOAD_ALL_ADDRESS + START,
  });

  axios
    .get('/api/address', {
      transformResponse: [
        data => {
          try {
            data = JSON.parse(data, (key, value) => {
              if (key === 'lat' || key === 'lng') return parseFloat(value);
              return value;
            });
          } catch (e) {
            throw new Error('Error Json convert');
          }
          return data;
        },
      ],
    })
    .then(handleResponse)
    .then(data => {
      dispatch({
        type: LOAD_ALL_ADDRESS + SUCCESS,
        payload: {
          addresses: data.addresses,
        },
      });
    })
    .catch(error => {
      console.warn('loadAllAddresses', error);
    });
};

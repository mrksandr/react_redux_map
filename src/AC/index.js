import axios from 'axios';

import { FETCH_ADDRESS, DELETE_ADDRESS } from '../constants';

const API_KEY = 'AIzaSyDRAMchG_UXTJVra9_cc1U0RZKPMc3vtM8';
const URL = 'https://maps.googleapis.com/maps/api/geocode/json';

export const fetchAddress = location => dispatch =>
  axios
    .get(URL, {
      params: {
        address: location,
        key: API_KEY,
      },
    })
    .then(response => {
      if (!response.data.results[0]) throw new Error('Нет результата');

      dispatch(fetchedAddress(response.data.results[0]));
    })
    .catch(function(error) {
      console.log(error);
    });

export function fetchedAddress(data) {
  return {
    type: FETCH_ADDRESS,
    payload: {
      id: data.place_id,
      address: data.formatted_address,
      location: {
        lat: data.geometry.location.lat,
        lng: data.geometry.location.lng,
      },
    },
  };
}

export const deleteAdress = id => dispatch => {
  dispatch(adressDeleted(id));
};

export function adressDeleted(id) {
  return {
    type: DELETE_ADDRESS,
    payload: { id },
  };
}

const handleResponse = response => {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};
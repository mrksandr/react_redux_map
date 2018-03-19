import axios from 'axios';

import {
  FETCH_ADDRESS,
  DELETE_ADDRESS,
  SELECT_ADDRESS,
  LOAD_ALL_ADDRESS,
  CURRENT_LOCATION,
  REQUEST,
  SUCCESS,
  START,
  FAIL,
} from '../constants';

export const loadAllAddressesRequest = () => ({
  type: LOAD_ALL_ADDRESS + REQUEST,
});

export const loadAllAddresses = () => ({
  type: LOAD_ALL_ADDRESS + START,
});

export const loadAllAddressesSuccess = data => ({
  type: LOAD_ALL_ADDRESS + SUCCESS,
  payload: {
    addresses: data.addresses,
  },
});

export const loadAllAddressesFail = error => ({
  type: LOAD_ALL_ADDRESS + FAIL,
  error,
});

export const selectAdress = id => ({
  type: SELECT_ADDRESS,
  payload: { id },
});

export const deleteAdressRequest = id => ({
  type: DELETE_ADDRESS + REQUEST,
  payload: { id },
});

export const deleteAdress = id => ({
  type: DELETE_ADDRESS,
  payload: { id },
});

export const fetchAddressRequest = location => ({
  type: FETCH_ADDRESS + REQUEST,
  payload: { location },
});

export const fetchAddress = data => ({
  type: FETCH_ADDRESS,
  payload: data,
});

export const geoLocationStart = () => ({
  type: CURRENT_LOCATION + START,
});

export const geoLocationFail = error => ({
  type: CURRENT_LOCATION + FAIL,
  error,
});
 
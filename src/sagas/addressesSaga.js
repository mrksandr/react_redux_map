import axios from 'axios';
import {
  all,
  call,
  put,
  takeLatest,
  takeEvery,
  select,
} from 'redux-saga/effects';
import {
  LOAD_ALL_ADDRESS,
  DELETE_ADDRESS,
  FETCH_ADDRESS,
  REQUEST,
} from '../constants';
import {
  loadAllAddressesRequest,
  loadAllAddresses,
  loadAllAddressesSuccess,
  loadAllAddressesFail,
  deleteAdress,
  deleteAdressRequest,
  fetchAddressRequest,
  fetchAddress,
  selectAdress,
  geoLocationStart,
  geoLocationFail,
} from '../AC';
import { API_KEY, MAP_URL } from '../config';

import { stateSelector } from '../selectors';

function* loadAllAddressesSaga() {
  yield put(loadAllAddresses());

  try {
    const addresses = yield call(fetchAddressApi);
    yield put(loadAllAddressesSuccess(addresses));
  } catch (err) {
    yield put(loadAllAddressesFail({ load: err.message }));
  }
}

function* deleteAddressSaga(action) {
  try {
    const addresses = yield select(stateSelector);

    const responseAddress = yield call(
      deleteAdressApi,
      addresses.items[action.payload.id]._id,
    );

    yield put(deleteAdress(responseAddress.address.id));
  } catch (err) {
    yield put({ action: DELETE_ADDRESS + ERROR });
  }
}

function* addAddressSaga(action) {
  yield put(geoLocationStart());

  try {
    const address = yield call(fetchAddressRequestApi, action.payload.location);
    const data = yield call(addAdressApi, address);

    yield put(fetchAddress(data));
    yield put(selectAdress(data.id));
  } catch (err) {
    yield put(geoLocationFail({ location: err.message }));
  }
}

export const saga = function*() {
  yield all([takeLatest(LOAD_ALL_ADDRESS + REQUEST, loadAllAddressesSaga)]);
  yield all([takeEvery(DELETE_ADDRESS + REQUEST, deleteAddressSaga)]);
  yield all([takeLatest(FETCH_ADDRESS + REQUEST, addAddressSaga)]);
};

//api

const fetchAddressApi = () =>
  axios
    .get('/api/address', {
      headers: {
        Accept: 'application/json',
      },
    })
    .then(request => request.data)
    .catch(err => {
      throw err;
    });

const deleteAdressApi = id =>
  axios
    .delete(`/api/address/${id}`)
    .then(request => request.data)
    .catch(err => {
      throw err;
    });

const addAdressApi = address =>
  axios
    .post('/api/address', address)
    .then(request => request.data)
    .catch(err => {
      throw new Error(
        'Произошла ошибка при добавлении или такой город существует',
      );
    });

export const fetchAddressRequestApi = location =>
  axios
    .get(MAP_URL, {
      params: {
        address: location,
        key: API_KEY,
        components: ['country', 'locality', 'administrative_area'],
      },
    })
    .then(response => {
      const data = response.data.results[0];

      let storableLocation = {};

      if (response.data.status === 'OK' && data) {
        for (let ac = 0; ac < data.address_components.length; ac++) {
          const adress = data.address_components[ac];

          if (
            adress.types.includes('sublocality') ||
            adress.types.includes('locality')
          ) {
            storableLocation.city = adress.long_name;
          } else if (adress.types.includes('administrative_area_level_1')) {
            storableLocation.state = adress.short_name;
          } else if (adress.types.includes('country')) {
            storableLocation.country = adress.long_name;
            storableLocation.registered_country_iso_code = adress.short_name;
          }
        }
      }

      if (storableLocation && !storableLocation.city)
        throw new Error('Город не найден');

      const address = {
        id: data.place_id,
        address: `${storableLocation.city}, ${
          storableLocation.registered_country_iso_code
        }`,
        location: {
          lat: data.geometry.location.lat,
          lng: data.geometry.location.lng,
        },
      };
      return address;
    })
    .catch(err => {
      throw err;
    });

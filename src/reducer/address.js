import {
  FETCH_ADDRESS,
  DELETE_ADDRESS,
  SELECT_ADDRESS,
  LOAD_ALL_ADDRESS,
  CURRENT_LOCATION,
  START,
  SUCCESS,
  FAIL,
  REQUEST,
} from '../constants';

import { arrToMap } from '../helpers';

const initialState = {
  items: {},
  selectedAddress: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case FETCH_ADDRESS:
      return {
        ...state,
        items: {
          ...state.items,
          [payload.id]: payload,
        },
      };
    case DELETE_ADDRESS:
      const tmpState = { ...state };
      delete tmpState.items[payload.id];
      return tmpState;

    case SELECT_ADDRESS:
      return {
        ...state,
        selectedAddress: payload.id,
      };

    case LOAD_ALL_ADDRESS + START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOAD_ALL_ADDRESS + SUCCESS:
      const loadAdresses = arrToMap(payload.addresses);

      return {
        ...state,
        items: {
          ...state.items,
          ...loadAdresses,
        },
        loading: false,
      };

    case LOAD_ALL_ADDRESS + FAIL:
      return {
        ...state,
        loading: false,
        error: error,
      };

    case CURRENT_LOCATION + START:
      return {
        ...state,
        error: null,
      };

    case CURRENT_LOCATION + FAIL:
      return {
        ...state,
        error: error,
      };
    default:
      return state;
  }
};

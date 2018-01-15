import {
  FETCH_ADDRESS,
  DELETE_ADDRESS,
  SELECT_ADDRESS,
  LOAD_ALL_ADDRESS,
  START,
  SUCCESS,
} from '../constants';

import { arrToMap } from '../helpers';

const initialState = {
  items: {},
  selectedAddress: null,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
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

    default:
      return state;
  }
};

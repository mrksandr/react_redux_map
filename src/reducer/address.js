import { FETCH_ADDRESS, DELETE_ADDRESS, SELECT_ADDRESS } from '../constants';

const initialState = {
  items: {},
  selectedAddress: null,
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

    default:
      return state;
  }
};

import { FETCH_ADDRESS } from '../constants';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_ADDRESS:
      return {
        ...state,
        [payload.id]: payload,
      };

    default:
      return state;
  }
};

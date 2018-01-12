import { FETCH_ADDRESS, DELETE_ADDRESS } from '../constants';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_ADDRESS:
      return {
        ...state,
        [payload.id]: payload,
      };
    case DELETE_ADDRESS:
      const tmpState = { ...state };
      delete tmpState[payload.id];
      return tmpState;

    default:
      return state;
  }
};

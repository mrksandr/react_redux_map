import { mapToArr, arrToMap } from '../helpers';
import { createSelector } from 'reselect';

export const stateSelector = state => state.address;
export const addressSelector = createSelector(stateSelector, state =>
  mapToArr(state.items),
);
export const errorSelector = createSelector(
  stateSelector,
  state => state.error,
);
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading,
);

export const selectedAddressSelector = createSelector(
  stateSelector,
  state => state.selectedAddress,
);
export const selectedLocationSelector = createSelector(
  selectedAddressSelector,
  addressSelector,
  (selectedAddress, items) => {
    const itemsConvert = arrToMap(items);

    return (
      itemsConvert[selectedAddress] && itemsConvert[selectedAddress].location
    );
  },
);

import React from 'react';
import { connect } from 'react-redux';

import { mapToArr } from '../helpers';
import AddressItem from '../components/AddressItem';
// import GoogleMap from '../components/googleMap';

import { deleteAdress, selectAdress } from '../AC';

const AddressList = props => {
  const { adresses, deleteAdress, selectAdress } = props;

  if (!adresses || adresses.length === 0) return <h4>No items</h4>;

  const addressItems = adresses.map(adress => (
    <AddressItem
      key={adress.id}
      cityInfo={adress}
      handleDelete={deleteAdress}
      handleSelect={selectAdress}
    />
  ));

  return <ul className="list-group">{addressItems}</ul>;
};

export default connect(
  ({ address: { items } }) => ({
    adresses: mapToArr(items),
  }),
  { deleteAdress, selectAdress },
)(AddressList);

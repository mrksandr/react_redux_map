import React from 'react';
import { connect } from 'react-redux';

import { mapToArr } from '../helpers';
import AddressItem from '../components/AddressItem';
// import GoogleMap from '../components/googleMap';

import { deleteAdress } from '../AC';

const initialState = {};

class AddressList extends React.Component {
  state = initialState;

  handleDelete = () => {
    if (!id) return null;
    this.props.deleteAdress(id);
    this.setState(initialState);
  };

  render() {
    const adresses = this.props.adresses;

    if (!adresses || adresses.length === 0) return <h4>No items</h4>;

    const addressItems = adresses.map(adress => (
      <AddressItem
        key={adress.id}
        cityinfo={adress}
        handleDelete={this.props.deleteAdress}
      />
    ));

    return <ul>{addressItems}</ul>;
  }
}

export default connect(
  ({ address }) => ({
    adresses: mapToArr(address),
  }),
  { deleteAdress },
)(AddressList);

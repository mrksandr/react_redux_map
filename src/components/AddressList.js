import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddressItem from '../components/AddressItem';

import {
  deleteAdressRequest,
  selectAdress,
  loadAllAddressesRequest,
} from '../AC';

import { addressSelector, loadingSelector, errorSelector } from '../selectors';

class AddressList extends React.Component {
  componentDidMount() {
    this.props.loadAllAddressesRequest();
  }

  render() {
    const {
      adresses,
      deleteAdressRequest,
      selectAdress,
      loading,
      error,
    } = this.props;

    if (loading) return <div>loading...</div>;
    if (error && error.load) return <div>{error.load}</div>;

    if (!adresses || adresses.length === 0) return <h4>No items</h4>;

    const addressItems = adresses.map(adress => (
      <AddressItem
        key={adress.id}
        cityInfo={adress}
        handleDelete={deleteAdressRequest}
        handleSelect={selectAdress}
      />
    ));

    return <ul className="list-group">{addressItems}</ul>;
  }
}

const mapStateToProps = state => ({
  adresses: addressSelector(state),
  loading: loadingSelector(state),
  error: errorSelector(state),
});

export default connect(mapStateToProps, {
  deleteAdressRequest,
  selectAdress,
  loadAllAddressesRequest,
})(AddressList);

AddressList.propTypes = {
  // from connect
  adresses: PropTypes.array,
  deleteAdressRequest: PropTypes.func,
  selectAdress: PropTypes.func,
  loadAllAddresses: PropTypes.func,
};

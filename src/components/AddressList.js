import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { mapToArr } from '../helpers';
import AddressItem from '../components/AddressItem';

import { deleteAdress, selectAdress, loadAllAddresses } from '../AC';

class AddressList extends React.Component {
  componentDidMount() {
    this.props.loadAllAddresses();
  }

  render() {
    const { adresses, deleteAdress, selectAdress, loading } = this.props;

    if (loading) return <div>loading...</div>;

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
  }
}

export default connect(
  ({ address: { items, loading } }) => ({
    adresses: mapToArr(items),
    loading,
  }),
  { deleteAdress, selectAdress, loadAllAddresses },
)(AddressList);

Map.propTypes = {
  // from connect
  adresses: PropTypes.object,
  deleteAdress: PropTypes.func,
  selectAdress: PropTypes.func,
  loadAllAddresses: PropTypes.func,
};

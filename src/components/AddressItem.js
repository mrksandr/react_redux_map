import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class AddressItem extends Component {
  deleteItem = () => {
    const { handleDelete, cityinfo } = this.props;
    handleDelete(cityinfo.id);
  };

  render() {
    const { id, address, location } = this.props.cityinfo;
    const { lat, lng } = location;

    return (
      <li key={id}>
        <div>{address}</div>
        <Button onClick={this.deleteItem} bsSize="small" bsStyle="info">
          Delete
        </Button>
      </li>
    );
  }
}

AddressItem.propTypes = {};

export default AddressItem;

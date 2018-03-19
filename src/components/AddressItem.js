import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';

const AddressItem = props => {
  const { id, address, location } = props.cityInfo;

  const deleteItem = () => {
    const { handleDelete, cityInfo } = props;
    handleDelete(cityInfo.id);
  };

  const selectItem = () => {
    const { handleSelect, cityInfo } = props;
    handleSelect(cityInfo.id);
  };

  return (
    <li className="list-group-item" key={id}>
      <Row>
        <Col xs={12}>
          <Button bsStyle="link" className="no-wrap" onClick={selectItem}>
            {address}
          </Button>
          <span
            onClick={deleteItem}
            className="glyphicon glyphicon-remove delete-address"
            aria-hidden="true"
          />
        </Col>
      </Row>
    </li>
  );
};

AddressItem.propTypes = {
  // from props
  cityInfo: PropTypes.object,
  handleDelete: PropTypes.func,
  handleSelect: PropTypes.func,
};

export default AddressItem;

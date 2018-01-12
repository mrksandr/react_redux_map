import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon, NavItem, Col, Row } from 'react-bootstrap';

class AddressItem extends Component {
  deleteItem = () => {
    const { handleDelete, cityInfo } = this.props;
    handleDelete(cityInfo.id);
  };

  selectItem = () => {
    const { handleSelect, cityInfo } = this.props;
    handleSelect(cityInfo.id);
  };

  render() {
    const { id, address, location } = this.props.cityInfo;

    return (
      <li className="list-group-item" key={id}>
        <Row>
          <Col xs={12}>
            <Button
              bsStyle="link"
              className="no-wrap"
              onClick={this.selectItem}
            >
              {address}
            </Button>
            <span
              onClick={this.deleteItem}
              className="glyphicon glyphicon-remove delete-address"
              aria-hidden="true"
            />
          </Col>
        </Row>
      </li>
    );
  }
}

AddressItem.propTypes = {
  // from props
  cityInfo: PropTypes.object,
  handleDelete: PropTypes.func,
  handleSelect: PropTypes.func,
};

export default AddressItem;

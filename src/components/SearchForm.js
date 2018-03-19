import React from 'react';
import { connect } from 'react-redux';
import { FormControl, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { fetchAddressRequest } from '../AC/index';
import { errorSelector } from '../selectors';

const initialState = {
  search: '',
};

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  onInputChange = ev => {
    this.setState({
      search: ev.target.value,
    });
  };

  onFormSubmit = ev => {
    ev.preventDefault();

    this.state.search && this.props.fetchAddressRequest(this.state.search);
    this.setState(initialState);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="input-group search-block">
          <FormControl
            type="text"
            value={this.state.search}
            placeholder="Добавить адрес"
            onChange={this.onInputChange}
          />

          <span className="input-group-btn">
            <Button type="submit">Submit</Button>
          </span>
        </form>
        {this.props.error &&
          this.props.error.location && (
            <Alert bsStyle="warning">{this.props.error.location}</Alert>
          )}
      </div>
    );
  }
}

export default connect(
  state => ({
    error: errorSelector(state),
  }),
  { fetchAddressRequest },
)(SearchForm);

SearchForm.propTypes = {
  // from connect
  fetchAddressRequest: PropTypes.func,
};

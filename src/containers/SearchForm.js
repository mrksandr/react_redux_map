import React from 'react';
import { connect } from 'react-redux';
import { FormControl, Button } from 'react-bootstrap';
import { fetchAddress } from '../AC/index';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  onInputChange = ev => {
    this.setState({
      search: ev.target.value,
    });
    console.log(ev.target.value);
  };

  onFormSubmit = ev => {
    ev.preventDefault();

    this.props.fetchAddress(this.state.search);
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
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
    );
  }
}

export default connect(null, { fetchAddress })(SearchForm);

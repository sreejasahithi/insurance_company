import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class Deletebeneficiary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: '',
      lname: '',
      phone: '',
      username:this.props.user_name,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.user_name)
    axios
      .delete('http://localhost:3001/delete_beneficiary', { data: this.state })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          alert(res.data.success);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="First Name"
            type="text"
            name="fname"
            value={this.state.fname}
            onChange={this.handleChange}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Last Name"
            type="text"
            name="lname"
            value={this.state.lname}
            onChange={this.handleChange}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Phone Number"
            type="tel"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <Button type="submit" variant="contained" color="secondary">
            Delete Beneficiary
          </Button>
        </form>
      </div>
    );
  }
}

export default Deletebeneficiary;

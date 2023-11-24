/*import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
class Register extends Component {
  state = {
    firstname: '', 
    lastname: '',  
    email: '',
    phonenumber: '',  
    licensenumber: '', 
    dob: '',
    city: '',
    street: '',
    zipcode: '',
    username: '',
    password: '',
    formSubmitted: false,
    error: null,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
/*
  handleSubmit = (event) => {
    event.preventDefault();

    // Sending form data to the server
    axios
      .post('http://localhost:3001/submit-registration', this.state)
      .then((response) => {
        this.setState({ formSubmitted: true });
      })
      .catch((error) => {
        this.setState({ error });
        console.error('Error submitting registration details:', error);
      });
  };
*/
/*
handleSubmit = (event) => {
  event.preventDefault();

  // Sending form data to the server
  axios
    .post('http://localhost:3001/submit-registration', this.state)
    .then((response) => {
      // Registration successful, save the JWT token in a cookie
      Cookies.set('jwt', response.data.token); // Save the token in a cookie
      this.setState({ formSubmitted: true });
    })
    .catch((error) => {
      this.setState({ error });
      console.error('Error submitting registration details:', error);
    });
};
  render() {
    const { formSubmitted, error } = this.state;

    if (formSubmitted) {
      return (
        <div>
          <h1>Registration Successful</h1>
        </div>
      );
    }

    return (
      <div>
        <h1>Registration Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={this.state.firstname}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={this.state.lastname}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="phonenumber">Phone Number:</label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={this.state.phonenumber}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="licensenumber">License Number:</label>
          <input
            type="text"
            id="licensenumber"
            name="licensenumber"
            value={this.state.licensenumber}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={this.state.dob}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={this.state.city}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            value={this.state.street}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="zipcode">Zip Code:</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={this.state.zipcode}
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            required
          />

          
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          <button type="submit">Register</button>
        </form>

        {error && <p>Error: {error.message}</p>}
      </div>
    );
  }
}

export default Register;
*/



import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const paperStyle = {
  padding: 16, // Reduce the padding
  width: 400,
  height: 'auto',
  margin: '0 auto',
};

const textFieldStyle = {
  marginBottom: 10, // Reduce the margin between input fields
  fontSize: 14, // Reduce font size
  width: '100%', // Make the input fields 100% width
};

const inputLabelProps = {
  shrink: true, // Adjust the label behavior
  style: {
    fontSize: 14, // Customize label font size
  },
};

const inputProps = {
  style: {
    fontSize: 14, // Customize input field font size
  },
};
const placeholderStyle = {
  fontSize: 12, // Customize the font size of the placeholder text
  lineHeight: 1, // Adjust the line height to reduce height
};

class Register extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    licensenumber: '',
    dob: '',
    city: '',
    street: '',
    zipcode: '',
    username: '',
    password: '',
    formSubmitted: false,
    error: null,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Sending form data to the server
    axios
      .post('http://localhost:3001/submit-registration', this.state)
      .then((response) => {
        // Registration successful, save the JWT token in a cookie
        Cookies.set('jwt', response.data.token); // Save the token in a cookie
        this.setState({ formSubmitted: true });
      })
      .catch((error) => {
        this.setState({ error });
        console.error('Error submitting registration details:', error);
      });
  };

  render() {
    const { formSubmitted, error } = this.state;

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#FFFF99" // Change the background color to your desired color
      >
        <Paper elevation={24} style={paperStyle}>
        <h1 style={{ color: 'white' }}>Agent Registration Form</h1>
          {formSubmitted ? (
            <div>
              <h1>Registration Successful</h1>
            </div>
          ) : (
            <div>
              <h1>Agent Registration form</h1>
              <form onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                  <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleInputChange}
                  style={textFieldStyle}
                  InputLabelProps={inputLabelProps}
                  InputProps={{
                    style: placeholderStyle,
                  }}
                  required
                />
                </Grid>
                  <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleInputChange}
                  style={textFieldStyle}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                  required
                />
                </Grid>
              </Grid>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  style={textFieldStyle}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                  required
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  name="phonenumber"
                  value={this.state.phonenumber}
                  onChange={this.handleInputChange}
                  style={textFieldStyle}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                  required
                />
                <TextField
                  fullWidth
                  label="License Number"
                  variant="outlined"
                  name="licensenumber"
                  value={this.state.licensenumber}
                  onChange={this.handleInputChange}
                  style={textFieldStyle}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                  required
                />
                <TextField
                  fullWidth
                  label="Date of Birth"
                  variant="outlined"
                  type="date"
                  name="dob"
                  value={this.state.dob}
                  onChange={this.handleInputChange}
                  style={textFieldStyle}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                  required
                />
                <TextField
                  fullWidth
                  label="City"
                  variant="outlined"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleInputChange}
                  style={textFieldStyle}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                  required
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Street"
                  variant="outlined"
                  name="street"
                  value={this.state.street}
                  onChange={this.handleInputChange}
                  style={textFieldStyle}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                  required
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  variant="outlined"
                  name="zipcode"
                  value={this.state.zipcode}
                  onChange={this.handleInputChange}
                  style={textFieldStyle}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                  required
                />
                </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  style={textFieldStyle}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  style={textFieldStyle}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                  required
                />
                <Button type="submit" variant="contained" color="primary">
                  Register
                </Button>
              </form>

              {error && <p>Error: {error.message}</p>}
            </div>
          )}
        </Paper>
      </Box>
    );
  }
}

export default Register;

import React, { Component } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


class Password_change_agent extends Component {
  state = {
    username: '',
    password: '',
    loginStatus: null, // Added loginStatus state
    error: null,
    
  };






  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Sending login data to the server
    axios
      .post('http://localhost:3001/agent_password_change', {username:this.state.username,password:this.state.password})
      .then((response) => {
        // Check the login status from the server
        if (response.data.loginStatus === 'success') {
          // Login successful, save the JWT token in a cookie and set loginStatus to 'success'
          console.log("done")
       
        } else {
          // Login failed, set loginStatus to 'invalid'
          this.setState({ loginStatus: 'invalid' });
        }
      })
      .catch((error) => {
        this.setState({ error });
        console.error('Error during login:', error);
      });
  };

  

  render() {
    const { loginStatus, error } = this.state;

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#FFFF99" // Change the background color to your desired color
      >
        <Paper elevation={24} style={{ padding: 16 }}>
          {loginStatus === 'success' ? (
            <div>
             <div>Password changes successfuly</div>

            </div>
          ) : (
            <div>
              <h2>Change Password</h2>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  label="New_Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
                <Button type="submit" variant="contained" color="primary">
                  Change
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

export default Password_change_agent;
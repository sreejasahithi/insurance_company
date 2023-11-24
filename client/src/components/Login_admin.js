import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import AnalysePolicy from './AnalysePolicy';
import Bonus from './Bonus';

class Login_admin extends Component {
  state = {
    username: '',
    password: '',
    loginStatus: null, // Added loginStatus state
    error: null,
    data: [],
  
    isobservepolicy:false,
    isbonus:false,
   
    
  };






  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();



    // Sending login data to the server
    axios
      .post('http://localhost:3001/login_admin', this.state)
      .then((response) => {
        // Check the login status from the server
        if (response.data.loginStatus === 'success') {
          // Login successful, save the JWT token in a cookie and set loginStatus to 'success'
          Cookies.set('jwt', response.data.token); // Save the token in a cookie
          this.setState({ loginStatus: 'success' });
        } else {
          // Login failed, set loginStatus to 'invalid'
          this.setState({ loginStatus: 'invalid' });
        }
      })
      .catch((error) => {
        this.setState({ error });
        console.error('Error during login:', error);
      });
 

/*
  axios.get('http://localhost:3001/demo_agent').then((response) => {
        this.setState({ data: response.data, loading: false });
        console.log('State updated:', this.state.data);
      })
      .catch((error) => {
        //this.setState({ error, loading: false });
        console.error('Error fetching data:', error);
      });
      */
  };


  observ_policy=()=>{
    this.setState({isobservepolicy:true,isbonus:false})
  }

  send_bonus=()=>{
    this.setState({isobservepolicy:false,isbonus:true})
  }

  



  render() {
    const { loginStatus, error } = this.state;

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor=" #FFFF99" // Change the background color to your desired color
      >
        <Paper elevation={24} style={{ padding: 16 }}>
          {loginStatus === 'success' ? (
            <div>
             

              
              
              <Button variant="contained" onClick={this.observ_policy}>Observe Policy</Button>
              <Button variant="contained" onClick={this.send_bonus}>Bonus</Button>
            
            

              
              {this.state.isobservepolicy?<AnalysePolicy/>:null}
              {this.state.isbonus?<Bonus/>:null}


            </div>
            
          ) : loginStatus === 'invalid' ? (
            <div>
              <h1>Invalid Username or Password</h1>
              <Link to="/register">New user ? Register here</Link>
            </div>
          ) : (
            <div>
              <h2>Admin Login</h2>
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
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
                <Button type="submit" variant="contained" color="primary" >
                  Login
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

export default Login_admin;

/*import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p><Link to="/register">New User? Register here</Link></p>
    </div>
  );
}

export default Login;
*/
/*
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

class Login extends Component {
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
      .post('http://localhost:3001/login', this.state)
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
  };

  render() {
    const { loginStatus, error } = this.state;

    if (loginStatus === 'success') {
      return (
        <div>
          <h1>Login Successful</h1>
        </div>
      );
    } else if (loginStatus === 'invalid') {
      return (
        <div>
          <h1>Invalid Username or Password</h1>
          <Link to="/register">Register here</Link>
        </div>
      );
    }

    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <button type="submit">Login</button>
          <Link to="/register">New user ? Register here</Link>
        </form>

        {error && <p>Error: {error.message}</p>}
      </div>
    );
  }
}

export default Login;
*/

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Sample from './Sample';
import Agentdetails from './Agentdetails';
import Sellpolicy from './Agent_sell';
import SoldPolicies from './SoldPolicies';
import AnalysePolicy from './AnalysePolicy';

class Login_agent extends Component {
  state = {
    username: '',
    password: '',
    loginStatus: null, // Added loginStatus state
    error: null,
    data: [],
    ispersonal:false,
    isSell:false,
    isSold:false,
    //isobservepolicy:false,
   
    
  };






  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();



    // Sending login data to the server
    axios
      .post('http://localhost:3001/login_agent', this.state)
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

  personal_info=()=>{
    this.setState({ispersonal:true,isSell:false,isSold:false})

  }
  sellpolicy=()=>{
    this.setState({isSell:true,ispersonal:false,isSold:false})
  }
  soldpolicy=()=>{
    this.setState({isSell:false,ispersonal:false,isSold:true})
  }
 /* observ_policy=()=>{
    this.setState({isobservepolicy:true,isSell:false,ispersonal:false,isSold:false})
  }*/



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
             

              
              <Button variant="contained" onClick={this.personal_info}>Personal Info</Button>
              <Button variant="contained" onClick={this.sellpolicy}>Sell Policy</Button>
              <Button variant="contained" onClick={this.soldpolicy}>Sold Policy</Button>
             {/* <Button variant="contained" onClick={this.observ_policy}>Observe Policy</Button>*/}
            
              {/*<Policyholder_details user_name={this.state.username}/>*/}
              {/*<Buypolicy/>*/}

              {this.state.ispersonal? <Agentdetails user_name={this.state.username}/>:null}
              {this.state.isSell?<Sellpolicy user_name={this.state.username}/>:null}
              {this.state.isSold?<SoldPolicies user_name={this.state.username}/>:null}
              {/*this.state.isobservepolicy?<AnalysePolicy/>:null*/}


            </div>
            
          ) : loginStatus === 'invalid' ? (
            <div>
              <h1>Invalid Username or Password</h1>
              <Link to="/register">New user ? Register here</Link>
            </div>
          ) : (
            <div>
              <h2>Agent Login</h2>
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
                <Link to="/register">New user ? Register here</Link>
                <Link to="/change_password_agent">Change Password ?</Link>


              </form>

              {error && <p>Error: {error.message}</p>}
            </div>
          )}
        </Paper>
      </Box>
    );
  }
}

export default Login_agent;

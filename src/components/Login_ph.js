import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Policyholder_details from './Policyholder_details';
import Buypolicy from './Buypolicy';
import Boughtpolicy from './Boughtpolicy';
import Benificiary from './Benificiary';
import Makeclaim from './Makeclaim';
import Deletebeneficiary from './Deletebeneficiary';


class Login_policy_holder extends Component {
  state = {
    username: '',
    password: '',
    loginStatus: null, // Added loginStatus state
    error: null,
    ispersonal:false,
    isbuy:false,
    ishistory:false,
    benificiary:false,
    claim:false,
    isdelete:false,
    
  };






  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Sending login data to the server
    axios
      .post('http://localhost:3001/login_policyholder', this.state)
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

  personal_info=()=>{
    this.setState({ispersonal:true,isbuy:false,ishistory:false,benificiary:false,claim:false,isdelete:false})

  }
  buypolicy=()=>{
    this.setState({isbuy:true,ispersonal:false,ishistory:false,benificiary:false,claim:false,isdelete:false})
  }
  bought_policy=()=>{
    this.setState({isbuy:false,ispersonal:false,ishistory:true,benificiary:false,claim:false,isdelete:false})
  }
  call_benificiary=()=>{
    this.setState({isbuy:false,ispersonal:false,ishistory:false,benificiary:true,claim:false,isdelete:false})
  }
  make_claim=()=>{
    this.setState({isbuy:false,ispersonal:false,ishistory:false,benificiary:false,claim:true,isdelete:false})
  }
  delete_ben=()=>{
    this.setState({isbuy:false,ispersonal:false,ishistory:false,benificiary:false,claim:false,isdelete:true})
  }

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
              <Button variant="contained" onClick={this.personal_info}>Personal Info</Button>
              <Button variant="contained" onClick={this.buypolicy}>Buy Policy</Button>
              <Button variant="contained" onClick={this.bought_policy}>Bought Policy</Button>
              <Button variant="contained" onClick={this.call_benificiary}>Benificiary</Button>
              <Button variant="contained" onClick={this.make_claim}>File a claim</Button>
              <Button variant="contained" onClick={this.delete_ben}>Delete a Beneficiary</Button>
              

              {this.state.ispersonal?<Policyholder_details user_name={this.state.username}/>:null}
              {this.state.isbuy?<Buypolicy user_name={this.state.username}/>:null}
              {this.state.ishistory?<Boughtpolicy user_name={this.state.username}/>:null}
              {this.state.benificiary?<Benificiary user_name={this.state.username}/>:null}
              {this.state.claim?<Makeclaim user_name={this.state.username}/>:null}
              {this.state.isdelete?<Deletebeneficiary user_name={this.state.username}/>:null}


            </div>
          ) : loginStatus === 'invalid' ? (
            <div>
              <h1>Invalid Username or Password</h1>
              <Link to="/register">New user ? Register here</Link>
            </div>
          ) : (
            <div>
              <h2>Policy Holder Login</h2>
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
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
                <Link to="/register_policyholder">New user ? Register here</Link>
                <Link to="/change_password">Change Password ?</Link>
                



              </form>

              {error && <p>Error: {error.message}</p>}
            </div>
          )}
        </Paper>
        
      </Box>
    );
  }
}

export default Login_policy_holder;




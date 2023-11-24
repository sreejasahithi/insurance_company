/*
import React, {Component} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';


class Benificiary extends Component{
    constructor(props){
        super(props)

        this.state = {
            fname: '',
            lname: '',
            age: '',
            email: '',
            phone: '',
            dob: '',
            city: '',
            statee: '',
            pin: '',
            username: this.props.user_name,
            
            
        
          };
    }
    
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.user_name)
        axios.post("http://localhost:3001/policy_beneficiary", this.state)
          .then(res => {
            console.log(res.data); 
            if (res.data.success) {
              alert(res.data.success);
              

            } 
          })
          .catch(err => {
            console.log(err); 
          });
      };
    
      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
    
      render() {
        const formStyle = {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        };
    
        const backgroundStyle = {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
    
        const centerStyle = {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        };
    
        const paperStyle = {
          padding: '20px',
        };
    
        const fieldStyle = {
          marginBottom: '20px',
        };
        const inputLabelProps = {
          shrink: true, // Adjust the label behavior
          style: {
            fontSize: 14, // Customize label font size
          },
        };
    //bgcolor="#FFFF99"
        return (
          <div>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
               
                "& > :not(style)": {
                  m: 1,
                  width: 500,
                  height: 800,
                },
              }}
              
              style={centerStyle}
            >
      
              <Paper elevation={3} style={paperStyle}>
                <Typography variant="h4" gutterBottom>
                  Benificiary Registration
                  {this.state.username}
                </Typography>
                <div>
                  <form onSubmit={this.handleSubmit} style={formStyle}>
                    <TextField
                      label="First Name"
                      type="text"
                      name="fname"
                      value={this.state.fname}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      label="Last Name"
                      type="text"
                      name="lname"
                      value={this.state.lname}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      label="Age"
                      type="number"
                      name="age"
                      value={this.state.age}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      label="Email"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      
                      type="date"
                      name="dob"
                      value={this.state.dob}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      label="City"
                      type="text"
                      name="city"
                      value={this.state.city}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      label="State"
                      type="text"
                      name="statee"
                      value={this.state.statee}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      label="Pincode"
                      type="text"
                      name="pin"
                      value={this.state.pin}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    
                    <button type="submit" color="primary">Submit</button>
                  </form>
                </div>
              </Paper>
            </Box>
          </div>
        );
      }
}
export default Benificiary;*/


import React, { Component } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Typography, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

class Benificiary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: '',
      lname: '',
      age: '',
      email: '',
      phone: '',
      dob: '',
      city: '',
      statee: '',
      pin: '',
      username: this.props.user_name,
      isAlert: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.user_name);
    const { fname, lname, age, email, phone, dob, city, statee, pin, username } = this.state;

    axios
      .post('http://localhost:3001/policy_beneficiary', {
        fname,
        lname,
        age,
        email,
        phone,
        dob,
        city,
        statee,
        pin,
        username,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          this.setState({ isAlert: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCloseAlert = () => {
    this.setState({ isAlert: false });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const formStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const centerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    };

    const paperStyle = {
      padding: '20px',
      marginBottom: '20px',
    };

    const fieldStyle = {
      marginBottom: '20px',
    };

    const inputLabelProps = {
      shrink: true,
      style: {
        fontSize: 14,
      },
    };

    return (
      <div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {this.state.isAlert ? (
            <Alert
            severity="error"
            onClose={this.handleCloseAlert}
            style={{ width: '100%', marginBottom: '20px' }}
          >
            <AlertTitle>Error</AlertTitle>
            The limit for your Beneficiary is exceeded
          </Alert>
          
          ) : null}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              "& > :not(style)": {
                m: 1,
                width: 500,
                height: 800,
              },
            }}
            style={centerStyle}
          >
            <Paper elevation={3} style={paperStyle}>
              <Typography variant="h4" gutterBottom>
                Beneficiary Registration 
              </Typography>
              <form onSubmit={this.handleSubmit} style={formStyle}>
                <TextField
                  label="First Name"
                  type="text"
                  name="fname"
                  value={this.state.fname}
                  onChange={this.handleChange}
                  fullWidth
                  style={fieldStyle}
                  InputLabelProps={inputLabelProps}
                />
                <TextField
                      label="Last Name"
                      type="text"
                      name="lname"
                      value={this.state.lname}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      label="Age"
                      type="number"
                      name="age"
                      value={this.state.age}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      label="Email"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      
                      type="date"
                      name="dob"
                      value={this.state.dob}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      label="City"
                      type="text"
                      name="city"
                      value={this.state.city}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      label="State"
                      type="text"
                      name="statee"
                      value={this.state.statee}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                    <TextField
                      label="Pincode"
                      type="text"
                      name="pin"
                      value={this.state.pin}
                      onChange={this.handleChange}
                      fullWidth
                      style={fieldStyle}
                      InputLabelProps={inputLabelProps}
                    />
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>
            </Paper>
          </Box>
        </Box>
      </div>
    );
  }
}

export default Benificiary;




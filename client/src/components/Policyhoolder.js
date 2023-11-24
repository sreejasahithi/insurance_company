/*import React, { Component } from 'react';
import axios from 'axios';
//import holder from './holder.jpg'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

class Policy_holder extends Component {
  state = {
   
    fname: '',
    lname:'',
    age: '',
    email: '',
    phone:'',
    dob:'',
    city:'',
    statee:'',
    pin:''
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/policyholder",this.state)
      .then(res=>{console.log(this.state)})
      .catch(err=>{console.log(err)})

    
    
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
          height: 800
        }
      }}
      style={centerStyle}
    >
      <Paper elevation={24}  style={paperStyle}>

      <div style={backgroundStyle}>
        <form onSubmit={this.handleSubmit} style={formStyle}>
          

          <label>
            First Name:
            <input type="text" name="fname" value={this.state.fname} onChange={this.handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="lname" value={this.state.lname} onChange={this.handleChange} />
          </label>

          <label>
            Age:
            <input type="number" name="age" value={this.state.age} onChange={this.handleChange} />
          </label>

          <label>
            Email:
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            Phone number:
            <input type="tel" name="phone" value={this.state.phone} onChange={this.handleChange} />
          </label>
          <label>
            Date of Birth:
            <input type="date" name="dob" value={this.state.dob} onChange={this.handleChange} />
          </label>
          <label>
            City:
            <input type="text" name="city" value={this.state.city} onChange={this.handleChange} />
          </label>
          <label>
            State:
            <input type="text" name="statee" value={this.state.statee} onChange={this.handleChange} />
          </label>
          <label>
            Pincode:
            <input type="text" name="pin" value={this.state.pin} onChange={this.handleChange} />
          </label>
          
          <button type="submit">Submit</button>
        </form>
      </div>


       
      </Paper>
    </Box>

      </div>
    );
  }
}

export default Policy_holder;*/
import React, { Component } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

class Policy_holder extends Component {
  state = {
    fname: '',
    lname: '',
    age: '',
    email: '',
    phone: '',
    dob: '',
    city: '',
    statee: '',
    pin: '',
    username:'',
    password:'',

  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/policyholder", this.state)
      .then(res => {
        console.log(this.state);
        /*if (res.data.message) {
          // Display an alert with the message
          alert(res.data.message);
        }*/
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
          bgcolor="#FFFF99"
          style={centerStyle}
        >
          <Paper elevation={3} style={paperStyle}>
            <Typography variant="h4" gutterBottom>
              Policy Holder Registration
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
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  
                  style={fieldStyle}
                  InputLabelProps={inputLabelProps}
               
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  
                  style={fieldStyle}
                  InputLabelProps={inputLabelProps}
                
                  required
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

export default Policy_holder;



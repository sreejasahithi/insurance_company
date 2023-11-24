/*import React, { Component } from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';

import login_image from './image_login.jpg'

class LoginPage extends Component {
  state = {
    userType: '',
  };

  handleUserTypeChange = (e) => {
    this.setState({ userType: e.target.value });
  };

  render() {
    const backgroundStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${login_image})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
      };
    return (
      <div style={backgroundStyle}>
        <div>
          <h1>Serenity Insurance Company</h1>
          <h1 >Login Page</h1>
          <select onChange={this.handleUserTypeChange}>
            <option value="">Select User Type</option>
             <option value="agent">Agent</option>
            <option value="policyholder">Policy Holder</option>
            <option value="admin">Admin</option>
          </select>
          {this.state.userType === 'agent' ? (
            <div>
              
            <Link to="/login_agent">AGENT</Link>
          </div>
          ) : this.state.userType === 'policyholder' ? (
            <div>
              
              <Link to="/login_policyholder">Policy Holder</Link>
            </div>
          ) :this.state.userType === 'admin' ? (
            <div>
              
              <Link to="/login_admin">Admin</Link>
            </div>):null }
        </div>
      </div>
    );
  }
}

export default LoginPage;
*/



import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Select, MenuItem } from '@mui/material';
import login_image from './image_login.jpg';
import agentImage from './agent.jpg';
import policyholderImage from './policyholder.jpg';
import adminImage from './admin.jpg';

class LoginPage extends Component {
  state = {
    userType: '',
  };

  handleUserTypeChange = (e) => {
    this.setState({ userType: e.target.value });
  };

  render() {
    const backgroundStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#FFFF99',
    };

    const containerStyle = {
      display: 'flex',
      flexDirection: 'row', // Horizontal direction
    };

    const linkStyle = {
      margin: '10px', // Adjust the margin as needed
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add box shadow for elevation
      borderRadius: '8px', // Optional: Add border radius for a rounded appearance
      overflow: 'hidden', // Optional: Hide overflowing box shadow
      textAlign: 'center',
      textDecoration: 'none', // Remove default Link underline
    };

    const imageStyle = {
      width: '400px',
      height: '400px',
    };
    const headingStyle = {
      fontSize: '2em',
      fontWeight: 'bold',
      color: '#333', // Example color
      marginBottom: '20px', // Example margin bottom
      fontFamily: 'Dancing Script, cursive',
    };

    const nameStyle = {
      marginTop: '5px', // Adjust the margin as needed
      fontWeight: 'bold',
    };

    return (
      <div style={backgroundStyle}>
         <h1 style={headingStyle}>Serenity Insurance Company</h1>
        <h1>Login Page</h1>

        <div style={containerStyle}>
          <Link to="/login_agent" style={linkStyle}>
            <img src={agentImage} alt="Agent" style={{ ...imageStyle, borderRadius: '8px' }} />
            <div style={nameStyle}>Agent</div>
          </Link>

          <Link to="/login_policyholder" style={linkStyle}>
            <img src={policyholderImage} alt="Policy Holder" style={{ ...imageStyle, borderRadius: '8px' }} />
            <div style={nameStyle}>Policy Holder</div>
          </Link>

          <Link to="/login_admin" style={linkStyle}>
            <img src={adminImage} alt="Admin" style={{ ...imageStyle, borderRadius: '8px' }} />
            <div style={nameStyle}>Admin</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default LoginPage;




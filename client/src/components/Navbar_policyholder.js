import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    const navStyle = {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      background: '#333', // Background color
      color: 'white', // Text color
      padding: '10px 20px', // Adjust padding as needed
    };

    const linkStyle = {
      color: 'white',
      textDecoration: 'none',
      margin: '0 10px', // Adjust margin as needed
    };

    return (
      <div>
        <nav style={navStyle}>
          <Link to="/personal_info" style={linkStyle}>
            LOGIN
          </Link>
          <Link to="/policy_to_buy" style={linkStyle}>
            POLICY HISTORY
          </Link>
        </nav>
      </div>
    );
  }
}

export default NavBar;
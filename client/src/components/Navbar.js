/*import React ,{Component} from 'react'
import {Link} from 'react-router-dom'

class NavBar extends Component
{
    render(){
        return(
            <div>
            <nav>
            
             
             <Link to="/">LOGIN</Link>
              <Link to="/policy_history">POLICY HISTORY</Link>
            </nav>
          </div>
        )
    }
}

export default NavBar;*/


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
          <Link to="/" style={linkStyle}>
            LOGIN
          </Link>
          {/*<Link to="/policy_history" style={linkStyle}>
            POLICY HISTORY
          </Link>*/}

          <Link to="/about" style={linkStyle}>About Us</Link>
        </nav>
      </div>
    );
  }
}

export default NavBar;

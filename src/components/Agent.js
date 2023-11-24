import React, { Component } from 'react';
import axios from 'axios';
class Agent extends Component {
    state = {
      agentId: '',
      licenseNumber: '',
      phoneNumber: '',
      dob: '',
      email: '',
      name: '',
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
        .post('http://localhost:3001/api/submit-agent', this.state)
        .then((response) => {
          
          this.setState({ formSubmitted: true });
        })
        .catch((error) => {
          this.setState({ error });
          console.error('Error submitting agent details:', error);
        });
    };
  
    render() {
      const { formSubmitted, error } = this.state;
  
      if (formSubmitted) {
        return (
          <div>
            <h1>Agent Details Submitted Successfully</h1>
          </div>
        );
      }
  
      return (
        <div>
          <h1>Agent Details Form</h1>
          <form onSubmit={this.handleSubmit}>

          <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="agentId">Agent ID:</label>
            <input
              type="text"
              id="agentId"
              name="agentId"
              value={this.state.agentId}
              onChange={this.handleInputChange}
              required
            />
  
            <label htmlFor="licenseNumber">License Number:</label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={this.state.licenseNumber}
              onChange={this.handleInputChange}
              required
            />
  
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={this.state.phoneNumber}
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
  
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
  
            
  
            <button type="submit">Submit</button>
          </form>
  
          {error && <p>Error: {error.message}</p>}
        </div>
      );
    }
  }
  
  export default Agent;
  
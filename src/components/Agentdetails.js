import React, { Component } from 'react';
import axios from 'axios';

class Agentdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
      username: this.props.user_name,
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.post('http://localhost:3001/demo_agent', {
        username: this.state.username,
      });

      if (response.status === 200) {
        const data = response.data;
        this.setState({ data, loading: false });
        console.log(data); // Data received from the server
      } else {
        console.error('Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  render() {
    const { data, loading, error } = this.state;
    const listStyle = {
      listStyleType: 'none',
      padding: 0,
    };

    const listItemStyle = {
      margin: '100px', // Adjusted margin for spacing
      border: '1px solid #ccc',
      padding: '100px', // Adjusted padding for spacing
      backgroundColor: '#f5f5f5',
      cursor: 'pointer',
    };

    return (
      <div>
        <h1>PERSONAL INFO:--</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <ul style={listStyle}>
            {data.map((item) => (
              <li key={item.phone} style={{ ...listItemStyle, marginBottom: 'px' }}>
                <div>
                  First name: {item.firstname}
                </div>
                <div>
                  Last name: {item.lastname}
                </div>
                <div>
                  License Number: {item.licensenumber}
                </div>
                <div>
                  Email: {item.email}
                </div>
                <div>
                  Phone Number: {item.phonenumber}
                </div>
                <div>
                  Date of birth: {new Date(item.dob).toISOString().split('T')[0]}
                </div>
                <div>
                  City: {item.city}
                </div>
                <div>
                  Street: {item.street}
                </div>
                <div>
                  Zipcode: {item.zipcode}
                </div>
                <div>
                  Your ID is : {item.agent_id}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Agentdetails;

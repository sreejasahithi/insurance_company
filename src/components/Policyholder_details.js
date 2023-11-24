import React, { Component } from 'react';
import axios from 'axios';

class Policyholder_details extends Component {
  constructor(props){
    super(props)
   this.state = {
      data: [],
      loading: true,
      error: null,
      username:this.props.user_name,
    };

  }
 

/*
  componentDidMount() {
    axios.get('http://localhost:3001/demo_agent')
      .then((response) => {
        this.setState({ data: response.data, loading: false });
        console.log('State updated:', this.state.data);
      })
      .catch((error) => {
        this.setState({ error, loading: false });
        console.error('Error fetching data:', error);
      });


     axios.post("http://localhost:3001/api/demoagent", this.state.username)
  .then(res => {
    console.log(this.state.username);
  })
  .catch(err => {
    console.log(err);
  });
}*/
  
async componentDidMount() {
  try {
    const response = await axios.post('http://localhost:3001/demo_holder', {
      username: this.state.username,
    });

    if (response.status === 200) {
      const data = response.data;
      this.setState({ data, loading: false });
      console.log(data); // Data received from the server
    } else {
      console.error('Failed to fetch data from the server');
      alert(response.data.error);
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
        margin: '100px',
        border: '1px solid #ccc',
        padding: '100px',
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
                <li key={item.phone} style={{ ...listItemStyle, marginBottom: '2px' }}>
                  <div>
                    First name: {item.fname}
                  </div>
                  <div>
                    Last name: {item.lname}
                  </div>
                  <div>
                    Email: {item.email}
                  </div>
                  <div>
                    Phone Number: {item.phone}
                  </div>
                  <div>
                    Date of birth: {new Date(item.dob).toISOString().split('T')[0]}
                  </div>
                  <div>
                    Age: {item.age}
                  </div>
                  <div>
                    City: {item.city}
                  </div>
                  <div>
                    State: {item.statee}
                  </div>
                  <div>
                    Pincode: {item.pin}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
      
      
      
  }
}

export default Policyholder_details;
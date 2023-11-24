/*import React, { Component } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';





class Sellpolicy extends Component {
  state = {
    data: [],
    loading: true,
    error: null,
    policy_id:'',
    username:this.props.user_name,

  };

  componentDidMount() {
    axios.get("http://localhost:3001/get_all_policy")
      .then((res) => {
        this.setState({ data: res.data ,loading:false});
        console.log(this.state.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Sending form data to the server
    axios
      .post('http://localhost:3001/sell_policy', {username:this.state.username,policy_id:this.state.policy_id})
      .then((response) => {
        // Registration successful, save the JWT token in a cookie
       
        console.log("submitted");
      })
      .catch((error) => {
  
        console.error('Error submitting registration details:', error);
      });
  };

   textFieldStyle = {
    marginBottom: 10, // Reduce the margin between input fields
    fontSize: 14, // Reduce font size
    width: '100%', // Make the input fields 100% width
  };
  
   inputLabelProps = {
    shrink: true, // Adjust the label behavior
    style: {
      fontSize: 14, // Customize label font size
    },
  };
  
   inputProps = {
    style: {
      fontSize: 14, // Customize input field font size
    },
  };
   placeholderStyle = {
    fontSize: 12, // Customize the font size of the placeholder text
    lineHeight: 1, // Adjust the line height to reduce height
  };

  render() {
    return (
      <div>
        
        <div>
          <h1>SELL POLICY:--</h1>
          {this.state.loading ? (
            <p>Loading...</p>
          ) : this.state.error ? (
            <p>Error: some error</p>
          ) : (
            <ul >
     {this.state.data.map((item, index) => {
  console.log('Item:', item.type);
  return (
    <li key={item.policy_id || index}>
      <div>
        Policy Type: {item.type}
      </div>
      <div>
        Policy ID: {item.policy_id}
      </div>
    </li>
  );
})}


            </ul>
          )}
        </div>
        
        <TextField
                  fullWidth
                  label="Policy_ID"
                  variant="outlined"
                  name="policy_id"
                  value={this.state.policy_id}
                  onChange={this.handleInputChange}
                 
                 
                  required
                />

<Button type="submit" variant="contained" color="primary" onClick={this.handle_submit}>
                  SELL
              </Button>*


      </div>
    );
  }
}

export default Sellpolicy;*/



import React, { Component } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

class Sellpolicy extends Component {
  state = {
    data: [],
    loading: true,
    error: null,
    policy_id: '',
    username: this.props.user_name,
  };

  componentDidMount() {
    axios.get("http://localhost:3001/get_all_policy")
      .then((res) => {
        this.setState({ data: res.data, loading: false });
        console.log(this.state.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSellPolicy = () => {
    // Sending form data to the server
    axios
      .post('http://localhost:3001/sell_policy', {
        username: this.state.username,
        policy_id: this.state.policy_id
      })
      .then((response) => {
        console.log("Policy sold successfully");
        // Handle success, e.g., update UI or show a success message
      })
      .catch((error) => {
        console.error('Error selling policy:', error);
        // Handle error, e.g., show an error message to the user
      });
  };

  render() {
    return (
      <div>
        <div>
          <h1>SELL POLICY:--</h1>
          {this.state.loading ? (
            <p>Loading...</p>
          ) : this.state.error ? (
            <p>Error: {this.state.error}</p>
          ) : (
            <ul>
              {this.state.data.map((item, index) => (
                <li key={item.policy_id || index}>
                  <div>
                    Policy Type: {item.type}
                  </div>
                  <div>
                    Policy ID: {item.policy_id}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <TextField
          fullWidth
          label="Policy_ID"
          variant="outlined"
          name="policy_id"
          value={this.state.policy_id}
          onChange={this.handleInputChange}
          required
        />

        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={this.handleSellPolicy}
        >
          SELL
        </Button>
      </div>
    );
  }
}

export default Sellpolicy;


import React, { Component } from 'react';
import axios from 'axios';


class SoldPolicies extends Component {
  state = {
    soldPolicies: [],
    username: this.props.user_name,
    error: null,
  };

  async componentDidMount() {
    try {
      const response = await axios.post('http://localhost:3001/get_sold_policies', {
        username: this.state.username,
      });

      if (response.status === 200) {
        const soldPolicies = response.data;
        this.setState({ soldPolicies, loading: false });
        console.log('Sold Policies Data:', soldPolicies);
      } else {
        console.error('Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  render() {
    const { soldPolicies } = this.state;

    return (
      <div>
        {soldPolicies.length === 0 ? (
          <div>No sold policies available</div>
        ) : (
          <div>
            <h1>Sold Policies:</h1>
            <ul>
              {soldPolicies.map((policy) => (
                <li key={policy.policy_id}>
                  <p>Policy Holder Name: {policy.policyholder_name}</p>
                  <p>Phone Number: {policy.phone}</p>
                  <p>Policy Type:{policy.policy_type}</p>
                  <p>Plan Name: {policy.plan_name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default SoldPolicies;



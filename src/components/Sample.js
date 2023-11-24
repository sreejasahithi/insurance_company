import React, { Component } from 'react';
import axios from 'axios';

class Sample extends Component {
  state = {
    data: [],
    loading: true,
    error: null,
  };


  componentDidMount() {
    axios.get('http://localhost:3001/api/data')
      .then((response) => {
        this.setState({ data: response.data, loading: false });
        console.log('State updated:', this.state.data);
      })
      .catch((error) => {
        this.setState({ error, loading: false });
        console.error('Error fetching data:', error);
      });
  }

  render() {
    const { data, loading, error } = this.state;

    return (
      <div>
      <h1>Data Display</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.loan_id}>
              Loan ID: {item.loan_id}, Branch: {item.branch}, Amount: {item.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
    );
  }
}

export default Sample;
/*import React, { Component } from 'react';
import axios from 'axios';

class Buypolicy extends Component {
  state = {
    policy_type: 'life',
    data_policy:[],
    data_plan:[],

  };


  
  async componentDidMount() {
    try {
      // Make the GET request
      const policyResponse = await axios.get('http://localhost:3001/choose_policy');
      this.setState({ data_policy: policyResponse.data });

      // Make the POST request with policy_type from state
      const planResponse = await axios.post('http://localhost:3001/choose_plan', {
        policy_type: this.state.policy_type,
      });

      if (planResponse.status === 200) {
        const data = planResponse.data;
        this.setState({ data_plan: data, loading: false });
      } else {
        console.error('Failed to fetch data from the server');
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error('Error:', error);
      this.setState({ error, loading: false });
    }
  }
    


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
    };

    return (
      <div>
        <ul>
         
       
       
         { this.state.data_policy.map((item) => (
           <li key={item.policy_id}>
             type : {item.type}  
            
             
            
           
           </li>
         ))}
       </ul>

      </div>
    )
      
    
  }
}

export default Buypolicy;*/

/*
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
class Buypolicy extends Component {
  state = {
    data_policy: [],
    data_plan: [],
    selectedType: '',
    plantype:'',
    username:this.props.user_name,
    user_data:[],
    startDate: '', 
    endDate: '',
    showDetails: false,
   
    showPlanDialog: false,
  };
  async componentDidMount() {
    try {
      const response = await axios.post('http://localhost:3001/demo_holder', {
        username: this.state.username,
      });

      if (response.status === 200) {
        const data = response.data;
        this.setState({ user_data: data, loading: false });
        console.log(data); // Data received from the server
      } else {
        console.error('Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      const policyResponse = await axios.get('http://localhost:3001/choose_policy');
      this.setState({ data_policy: policyResponse.data });
    } catch (error) {
      console.error('Error fetching policy data:', error);
    }
  }

  handleTypeSelect = async (policyType) => {
    try {
      // Make the POST request with selected policy type to fetch plan data
      const planResponse = await axios.post('http://localhost:3001/choose_plan', {
        policy_type: policyType,
      });

      if (planResponse.status === 200) {
        const data = planResponse.data;
        this.setState({ data_plan: data, selectedType: policyType });
      } else {
        console.error('Failed to fetch plan data from the server');
      }
    } catch (error) {
      console.error('Error fetching plan data:', error);
    }
  };
  
  handlePlanType=(plantype)=>{
  this.setState({plantype});
};

handleStartDateChange = (e) => {
  this.setState({ startDate: e.target.value });
};

handleEndDateChange = (e) => {
  this.setState({ endDate: e.target.value });
};
handleSubmit = () => {
  this.setState({ showDetails: true });
};

handleSubmit = (e) => {
  e.preventDefault();
  axios.post("http://localhost:3001/chosenpolicy_plan", {
  selectedType: this.state.selectedType,
  plantype: this.state.plantype,
  startDate: this.state.startDate,
  endDate: this.state.endDate,
  policyholder_id: this.state.user_data[0].policyholder_id
})
  .then(res => {
    console.log(this.state);
  })
  .catch(err => {
    console.log(err);
  });
  this.setState({ showPlanDialog: true });

};
closePlanDialog = () => {
  this.setState({ showPlanDialog: false });
};

  render() {
    const listStyle = {
      listStyleType: 'none',
      padding: 0,
    };

    const listItemStyle = {
      margin: '10px',
      border: '1px solid #ccc',
      padding: '10px',
      backgroundColor: '#f5f5f5',
      cursor: 'pointer',
    };

    return (
      <div>
        <ul>
         
        
       
         {this.state.user_data.map((item) => (
           <li key={item.policyholder_id}>
             <p>Policy holder ID: {item.policyholder_id}</p>
           </li>
         ))}
       </ul>
        <ul style={listStyle}>
          {this.state.data_policy.map((item) => (
            <li
              key={item.policy_id}
              style={listItemStyle}
              onClick={() => this.handleTypeSelect(item.type)}
            >
              <p>Type: {item.type}</p>
              <p>Description: {item.description}</p>
            </li>
          ))}
        </ul>
        {this.state.selectedType && (
          <div>
            <p>Selected Type is: {this.state.selectedType}</p>
            <p>Available Plans are:</p>
            <ul style={listStyle}>
              {this.state.data_plan.map((item) => (
                <li key={item.plan_id} style={listItemStyle} onClick={()=>this.handlePlanType(item.name)}>
                  <p>Plan Name: {item.name}</p>
                  <p>Premium Amount: {item.premiumamount}</p>
                  <p>Plan Description: {item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {this.state.plantype &&(
          <div>
            <p>Policyholder id:{this.state.user_data[0].policyholder_id}</p>
            <p>Selected Policy is:{this.state.selectedType}</p>
            <p>Selected Plan is: {this.state.plantype}</p>
          </div>
        )}
        <div>
          <p>Choose Start Date:</p>
          <input
            type="date"
            value={this.state.startDate}
            onChange={this.handleStartDateChange}
          />
          <p>Choose End Date:</p>
          <input
            type="date"
            value={this.state.endDate}
            onChange={this.handleEndDateChange}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        {this.state.showDetails && (
          <div>
            <p>Policy holder ID: {this.state.user_data[0].policyholder_id}</p>
            <p>Selected Policy is: {this.state.selectedType}</p>
            <p>Selected Plan is: {this.state.plantype}</p>
            <p>Start Date: {this.state.startDate}</p>
            <p>End Date: {this.state.endDate}</p>
          </div>
        )}

<Dialog open={this.state.showPlanDialog} onClose={this.closePlanDialog}>
            <DialogTitle> SUMMARY : </DialogTitle>
            <DialogContent>
              <DialogContentText>
              
            <div>
           
            <p>Selected Policy is: {this.state.selectedType}</p>
            <p>Selected Plan is: {this.state.plantype}</p>
            <p>Start Date: {this.state.startDate}</p>
            <p>End Date: {this.state.endDate}</p>
          </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closePlanDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>


      </div>
    );
  }
}
export default Buypolicy;
*/


/*import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Buypolicy extends Component {
  state = {
    data_policy: [],
    data_plan: [],
    selectedType: '',
    plantype:'',
    username:this.props.user_name,
    user_data:[],
    startDate: '', 
    endDate: '',
    showDetails: false,
  };
  async componentDidMount() {
    try {
      const response = await axios.post('http://localhost:3001/demo_holder', {
        username: this.state.username,
      });

      if (response.status === 200) {
        const data = response.data;
        this.setState({ user_data: data, loading: false });
        console.log(data); // Data received from the server
      } else {
        console.error('Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      const policyResponse = await axios.get('http://localhost:3001/choose_policy');
      this.setState({ data_policy: policyResponse.data });
    } catch (error) {
      console.error('Error fetching policy data:', error);
    }
  }

  handleTypeSelect = async (policyType) => {
    try {
      // Make the POST request with selected policy type to fetch plan data
      const planResponse = await axios.post('http://localhost:3001/choose_plan', {
        policy_type: policyType,
      });

      if (planResponse.status === 200) {
        const data = planResponse.data;
        this.setState({ data_plan: data, selectedType: policyType });
      } else {
        console.error('Failed to fetch plan data from the server');
      }
    } catch (error) {
      console.error('Error fetching plan data:', error);
    }
  };
  
  handlePlanType=(plantype)=>{
  this.setState({plantype});
};

handleStartDateChange = (e) => {
  this.setState({ startDate: e.target.value });
};

handleEndDateChange = (e) => {
  this.setState({ endDate: e.target.value });
};
handleSubmit = () => {
  this.setState({ showDetails: true });
};

handleSubmit = (e) => {
  e.preventDefault();
  axios.post("http://localhost:3001//chosenpolicy_plan", this.state.selectedType,
  this.state.plantype,this.state.startDate,this.state.endDate,this.state.user_data[0].policyholder_id)
    .then(res => {
      console.log(this.state);
    })
    .catch(err => {
      console.log(err);
    });
};
  render() {
    const listStyle = {
      listStyleType: 'none',
      padding: 0,
    };

    const listItemStyle = {
      margin: '10px',
      border: '1px solid #ccc',
      padding: '10px',
      backgroundColor: '#f5f5f5',
      cursor: 'pointer',
    };

    return (
      <div>
        <ul>
         
         
       
         {this.state.user_data.map((item) => (
           <li key={item.policyholder_id}>
             <p>Policy holder ID: {item.policyholder_id}</p>
           </li>
         ))}
       </ul>
        <ul style={listStyle}>
          {this.state.data_policy.map((item) => (
            <li
              key={item.policy_id}
              style={listItemStyle}
              onClick={() => this.handleTypeSelect(item.type)}
            >
              <p>Type: {item.type}</p>
              <p>Description: {item.description}</p>
            </li>
          ))}
        </ul>
        {this.state.selectedType && (
          <div>
            <p>Selected Type is: {this.state.selectedType}</p>
            <p>Available Plans are:</p>
            <ul style={listStyle}>
              {this.state.data_plan.map((item) => (
                <li key={item.plan_id} style={listItemStyle} onClick={()=>this.handlePlanType(item.name)}>
                  <p>Plan Name: {item.name}</p>
                  <p>Premium Amount: {item.premiumamount}</p>
                  <p>Plan Description: {item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {this.state.plantype &&(
          <div>
            <p>Policyholder id:{this.state.user_data[0].policyholder_id}</p>
            <p>Selected Policy is:{this.state.selectedType}</p>
            <p>Selected Plan is: {this.state.plantype}</p>
          </div>
        )}
        <div>
          <p>Choose Start Date:</p>
          <input
            type="date"
            value={this.state.startDate}
            onChange={this.handleStartDateChange}
          />
          <p>Choose End Date:</p>
          <input
            type="date"
            value={this.state.endDate}
            onChange={this.handleEndDateChange}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        {this.state.showDetails && (
          <div>
            <p>Policy holder ID: {this.state.user_data[0].policyholder_id}</p>
            <p>Selected Policy is: {this.state.selectedType}</p>
            <p>Selected Plan is: {this.state.plantype}</p>
            <p>Start Date: {this.state.startDate}</p>
            <p>End Date: {this.state.endDate}</p>
          </div>
        )}
      </div>
    );
  }
}
export default Buypolicy;
*/

/*
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
class Buypolicy extends Component {
  state = {
    data_policy: [],
    data_plan: [],
    selectedType: '',
    plantype:'',
    username:this.props.user_name,
    user_data:[],
    startDate: '', 
    endDate: '',
    showDetails: false,
   
    showPlanDialog: false,
  };
  async componentDidMount() {
    try {
      const response = await axios.post('http://localhost:3001/demo_holder', {
        username: this.state.username,
      });

      if (response.status === 200) {
        const data = response.data;
        this.setState({ user_data: data, loading: false });
        console.log(data); // Data received from the server
      } else {
        console.error('Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      const policyResponse = await axios.get('http://localhost:3001/choose_policy');
      this.setState({ data_policy: policyResponse.data });
    } catch (error) {
      console.error('Error fetching policy data:', error);
    }
  }

  handleTypeSelect = async (policyType) => {
    try {
      // Make the POST request with selected policy type to fetch plan data
      const planResponse = await axios.post('http://localhost:3001/choose_plan', {
        policy_type: policyType,
      });

      if (planResponse.status === 200) {
        const data = planResponse.data;
        this.setState({ data_plan: data, selectedType: policyType });
      } else {
        console.error('Failed to fetch plan data from the server');
      }
    } catch (error) {
      console.error('Error fetching plan data:', error);
    }
  };
  
  handlePlanType=(plantype)=>{
  this.setState({plantype});
};

handleStartDateChange = (e) => {
  this.setState({ startDate: e.target.value });
};

handleEndDateChange = (e) => {
  this.setState({ endDate: e.target.value });
};
handleSubmit = () => {
  this.setState({ showDetails: true });
};

handleSubmit = (e) => {
  e.preventDefault();
  axios.post("http://localhost:3001/chosenpolicy_plan", {
  selectedType: this.state.selectedType,
  plantype: this.state.plantype,
  startDate: this.state.startDate,
  endDate: this.state.endDate,
  policyholder_id: this.state.user_data[0].policyholder_id
})
  .then(res => {
    console.log(this.state);
  })
  .catch(err => {
    console.log(err);
  });
  this.setState({ showPlanDialog: true });

};
closePlanDialog = () => {
  this.setState({ showPlanDialog: false });
};

  render() {
    const listStyle = {
      listStyleType: 'none',
      padding: 0,
    };

    const listItemStyle = {
      margin: '10px',
      border: '1px solid #ccc',
      padding: '10px',
      backgroundColor: '#f5f5f5',
      cursor: 'pointer',
    };

    return (
      <div>
        <ul>
         
        
       
         {this.state.user_data.map((item) => (
           <li key={item.policyholder_id}>
             <p>Policy holder ID: {item.policyholder_id}</p>
           </li>
         ))}
       </ul>
        <ul style={listStyle}>
          {this.state.data_policy.map((item) => (
            <li
              key={item.policy_id}
              style={listItemStyle}
              onClick={() => this.handleTypeSelect(item.type)}
            >
              <p>Type: {item.type}</p>
              <p>Description: {item.description}</p>
            </li>
          ))}
        </ul>
        {this.state.selectedType && (
          <div>
            <p>Selected Type is: {this.state.selectedType}</p>
            <p>Available Plans are:</p>
            <ul style={listStyle}>
              {this.state.data_plan.map((item) => (
                <li key={item.plan_id} style={listItemStyle} onClick={()=>this.handlePlanType(item.name)}>
                  <p>Plan Name: {item.name}</p>
                  <p>Premium Amount: {item.premiumamount}</p>
                  <p>Plan Description: {item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {this.state.plantype &&(
          <div>
            <p>Policyholder id:{this.state.user_data[0].policyholder_id}</p>
            <p>Selected Policy is:{this.state.selectedType}</p>
            <p>Selected Plan is: {this.state.plantype}</p>
          </div>
        )}
        <div>
          <p>Choose Start Date:</p>
          <input
            type="date"
            value={this.state.startDate}
            onChange={this.handleStartDateChange}
          />
          <p>Choose End Date:</p>
          <input
            type="date"
            value={this.state.endDate}
            onChange={this.handleEndDateChange}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        {/*this.state.showDetails && (
          <div>
            <p>Policy holder ID: {this.state.user_data[0].policyholder_id}</p>
            <p>Selected Policy is: {this.state.selectedType}</p>
            <p>Selected Plan is: {this.state.plantype}</p>
            <p>Start Date: {this.state.startDate}</p>
            <p>End Date: {this.state.endDate}</p>
          </div>
        )}

<Dialog open={this.state.showPlanDialog} onClose={this.closePlanDialog}>
            <DialogTitle> SUMMARY : </DialogTitle>
            <DialogContent>
              <DialogContentText>
              
            <div>
            <p>Selected Policy is: {this.state.selectedType}</p>
            <p>Selected Plan is: {this.state.plantype}</p>
            <p>Start Date: {this.state.startDate}</p>
            <p>End Date: {this.state.endDate}</p>
          </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closePlanDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>


      </div>
    );
  }
}
export default Buypolicy;
*/

/*
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,} from '@mui/material';

const calculateEndDate = async (start_date) => {
  try {
    const response = await axios.post('http://localhost:3001/calculate_end_date', {
      start_date: start_date,
    });

    if (response.status === 200) {
      const end_date = response.data.end_date;
      return end_date;
    } else {
      console.error('Failed to calculate end date from the server');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
class Buypolicy extends Component {
  state = {
    data_policy: [],
    data_plan: [],
    selectedType: '',
    plantype:'',
    username:this.props.user_name,
    user_data:[],
    startDate: '', 
    endDate: '',
    showDetails: false,
   
    showPlanDialog: false,
  };
  async componentDidMount() {
    try {
      const response = await axios.post('http://localhost:3001/demo_holder', {
        username: this.state.username,
      });

      if (response.status === 200) {
        const data = response.data;
        this.setState({ user_data: data, loading: false });
        console.log(data); 
      } else {
        console.error('Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      const policyResponse = await axios.get('http://localhost:3001/choose_policy');
      this.setState({ data_policy: policyResponse.data });
    } catch (error) {
      console.error('Error fetching policy data:', error);
    }
  }

  handleTypeSelect = async (policyType) => {
    try {
      const planResponse = await axios.post('http://localhost:3001/choose_plan', {
        policy_type: policyType,
      });

      if (planResponse.status === 200) {
        const data = planResponse.data;
        this.setState({ data_plan: data, selectedType: policyType });
      } else {
        console.error('Failed to fetch plan data from the server');
      }
    } catch (error) {
      console.error('Error fetching plan data:', error);
    }
  };
  
  handlePlanType=(plantype)=>{
  this.setState({plantype});
};

handleStartDateChange = (e) => {
  this.setState({ startDate: e.target.value });
};

handleEndDateChange = (e) => {
  this.setState({ endDate: e.target.value });
};

handleSubmit = async (e) => {
  e.preventDefault();
  const end_date = await calculateEndDate(this.state.startDate);
  const extractedEndDate = new Date(end_date).toISOString().split('T')[0];
  this.setState({ endDate: extractedEndDate });

  axios.post("http://localhost:3001/chosenpolicy_plan", {
    selectedType: this.state.selectedType,
    plantype: this.state.plantype,
    startDate: this.state.startDate,
    endDate: extractedEndDate, 
    policyholder_id: this.state.user_data[0].policyholder_id,
  })
    .then(res => {
      console.log(this.state);
    })
    .catch(err => {
      console.log(err);
    });
  this.setState({ showPlanDialog: true });
};
closePlanDialog = () => {
  this.setState({ showPlanDialog: false });
};

  render() {
    const listStyle = {
      listStyleType: 'none',
      padding: 0,
    };

    const listItemStyle = {
      margin: '10px',
      border: '1px solid #ccc',
      padding: '10px',
      backgroundColor: '#f5f5f5',
      cursor: 'pointer',
    };

    return (
      <div>
        <ul>
         
        
       
         {this.state.user_data.map((item) => (
           <li key={item.policyholder_id}>
             <p>Policy holder ID: {item.policyholder_id}</p>
           </li>
         ))}
       </ul>
        <ul style={listStyle}>
          {this.state.data_policy.map((item) => (
            <li
              key={item.policy_id}
              style={listItemStyle}
              onClick={() => this.handleTypeSelect(item.type)}
            >
              <p>Type: {item.type}</p>
              <p>Description: {item.description}</p>
            </li>
          ))}
        </ul>
        {this.state.selectedType && (
          <div>
            <p>Selected Type is: {this.state.selectedType}</p>
            <p>Available Plans are:</p>
            <ul style={listStyle}>
              {this.state.data_plan.map((item) => (
                <li key={item.plan_id} style={listItemStyle} onClick={()=>this.handlePlanType(item.name)}>
                  <p>Plan Name: {item.name}</p>
                  <p>Premium Amount: {item.premiumamount}</p>
                  <p>Plan Description: {item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {this.state.plantype &&(
          <div>
            <p>Policyholder id:{this.state.user_data[0].policyholder_id}</p>
            <p>Selected Policy is:{this.state.selectedType}</p>
            <p>Selected Plan is: {this.state.plantype}</p>
          </div>
        )}
        <div>
          <p>Choose Start Date:</p>
          <input
            type="date"
            value={this.state.startDate}
            onChange={this.handleStartDateChange}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
     

<Dialog open={this.state.showPlanDialog} onClose={this.closePlanDialog}>
            <DialogTitle> SUMMARY : </DialogTitle>
            <DialogContent>
              <DialogContentText>
              
            <div>
            <p>Selected Policy is: {this.state.selectedType}</p>
            <p>Selected Plan is: {this.state.plantype}</p>
            <p>Start Date: {this.state.startDate}</p>
            <p>End Date: {this.state.endDate}</p>
          </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closePlanDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>


      </div>
    );
  }
}
export default Buypolicy;*/

import React, { Component } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const calculateEndDate = async (start_date) => {
  try {
    const response = await axios.post('http://localhost:3001/calculate_end_date', {
      start_date: start_date,
    });

    if (response.status === 200) {
      const end_date = response.data.end_date;
      return end_date;
    } else {
      console.error('Failed to calculate end date from the server');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

class Buypolicy extends Component {
  state = {
    data_policy: [],
    data_plan: [],
    selectedType: '',
    plantype: '',
    username: this.props.user_name,
    user_data: [],
    startDate: '',
    endDate: '',
    showDetails: false,
    showPlanDialog: false,
  };

  async componentDidMount() {
    try {
      const response = await axios.post('http://localhost:3001/demo_holder', {
        username: this.state.username,
      });

      if (response.status === 200) {
        const data = response.data;
        this.setState({ user_data: data, loading: false });
        console.log(data);
      } else {
        console.error('Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      const policyResponse = await axios.get('http://localhost:3001/choose_policy');
      this.setState({ data_policy: policyResponse.data });
    } catch (error) {
      console.error('Error fetching policy data:', error);
    }
  }

  handleTypeSelect = async (policyType) => {
    try {
      const planResponse = await axios.post('http://localhost:3001/choose_plan', {
        policy_type: policyType,
      });

      if (planResponse.status === 200) {
        const data = planResponse.data;
        this.setState({ data_plan: data, selectedType: policyType });
      } else {
        console.error('Failed to fetch plan data from the server');
      }
    } catch (error) {
      console.error('Error fetching plan data:', error);
    }
  };

  handlePlanType = (plantype) => {
    this.setState({ plantype });
  };

  handleStartDateChange = (e) => {
    this.setState({ startDate: e.target.value });
  };

  handleEndDateChange = (e) => {
    this.setState({ endDate: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const end_date = await calculateEndDate(this.state.startDate);
    const extractedEndDate = new Date(end_date).toISOString().split('T')[0];
    this.setState({ endDate: extractedEndDate });

    axios.post("http://localhost:3001/chosenpolicy_plan", {
      selectedType: this.state.selectedType,
      plantype: this.state.plantype,
      startDate: this.state.startDate,
      endDate: extractedEndDate,
      policyholder_id: this.state.user_data[0].policyholder_id,
    })
      .then(res => {
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({ showPlanDialog: true });
  };

  closePlanDialog = () => {
    this.setState({ showPlanDialog: false });
  };

  render() {
    const containerStyle = {
      height: '400px', // Adjust the height as needed
      overflowY: 'auto',
    };

    const listStyle = {
      listStyleType: 'none',
      padding: 0,
    };

    const listItemStyle = {
      margin: '10px',
      border: '1px solid #ccc',
      padding: '10px',
      backgroundColor: '#f5f5f5',
      cursor: 'pointer',
    };

    return (
      <div>
        <div style={containerStyle}>
          <ul>
            {this.state.user_data.map((item) => (
              <li key={item.policyholder_id}>
                <p>Policy holder ID: {item.policyholder_id}</p>
              </li>
            ))}
          </ul>
          <ul style={listStyle}>
            {this.state.data_policy.map((item) => (
              <li
                key={item.policy_id}
                style={listItemStyle}
                onClick={() => this.handleTypeSelect(item.type)}
              >
                <p>Type: {item.type}</p>
                <p>Description: {item.description}</p>
              </li>
            ))}
          </ul>
          {this.state.selectedType && (
            <div>
              <p>Selected Type is: {this.state.selectedType}</p>
              <p>Available Plans are:</p>
              <ul style={listStyle}>
                {this.state.data_plan.map((item) => (
                  <li key={item.plan_id} style={listItemStyle} onClick={() => this.handlePlanType(item.name)}>
                    <p>Plan Name: {item.name}</p>
                    <p>Premium Amount: {item.premiumamount}</p>
                    <p>Plan Description: {item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {this.state.plantype && (
            <div>
              <p>Policyholder id:{this.state.user_data[0].policyholder_id}</p>
              <p>Selected Policy is:{this.state.selectedType}</p>
              <p>Selected Plan is: {this.state.plantype}</p>
            </div>
          )}
          <div>
            <p>Choose Start Date:</p>
            <input
              type="date"
              value={this.state.startDate}
              onChange={this.handleStartDateChange}
            />
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>

        <Dialog open={this.state.showPlanDialog} onClose={this.closePlanDialog}>
          <DialogTitle> SUMMARY : </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div>
                <p>Selected Policy is: {this.state.selectedType}</p>
                <p>Selected Plan is: {this.state.plantype}</p>
                <p>Start Date: {this.state.startDate}</p>
                <p>End Date: {this.state.endDate}</p>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closePlanDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Buypolicy;


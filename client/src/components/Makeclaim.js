/*import React, { Component } from 'react';
import axios from 'axios';
class Makeclaim extends Component{
    state={
        reason:'',
        date:'',
        username:this.props.user_name,
        claimed_amount:'',
        category:'',
    };
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        });
    };
    handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/make_claim", this.state)
        .then(res => {
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
    };
    render(){
        return(
        <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Claim Category:
            <input type="text" name="category" value={this.state.category} onChange={this.handleChange}/>
          </label>
          <br />
          <label>
            Claim Reason:
            <textarea type="text" name="reason" value={this.state.reason} onChange={this.handleChange} rows={3}/>
          </label>
          <br />
          <label>
            Claim Amount:
            <input type="text" name="claimed_amount" value={this.state.claimed_amount} onChange={this.handleChange}/>
          </label>
          <br />
          <label>
            Date:
            <input type="date" name="date" value={this.state.date} onChange={this.handleChange}/>
          </label>
          <br />
        </form>
        </div>

        );
    }

}
export default Makeclaim;
*/

/*
import React, { Component } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


class Makeclaim extends Component {
  state = {
    reason: '',
    date: '',
    username: this.props.user_name,
    claimed_amount: '',
    category: '',
    isAlert: false,
    msg:"",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleCloseAlert = () => {
    this.setState({ isAlert: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/make_claim", {reason:this.state.reason,date:this.state.date,claimed_amount:this.state.claimed_amount,username:this.state.username,category:this.state.category})
      .then((res) => {
        console.log(this.state);
        if (res.data.success) {
          // /alert(res.data.success);
          if(res.data.success==='Rejected'){
            this.setState({msg:res.data.success});
          }
          else{
            this.setState({msg:res.data.success});

          }
        } 
      })
      .catch((err) => {
        console.log(err);
        
      });
  };

  render() {
    return (
      <div>
         {this.state.isAlert ? (
            <Alert
            severity="error"
            onClose={this.handleCloseAlert}
            style={{ width: '100%', marginBottom: '20px' }}
          >
            <AlertTitle>Error</AlertTitle>
            {this.state.msg}
          </Alert>
          
          ) : null}
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: '20px',
            maxWidth: '400px',
            width: '100%',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Make a Claim
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Claim Category"
              type="text"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Claim Reason"
              multiline
              type="text"
              name="reason"
              value={this.state.reason}
              onChange={this.handleChange}
              rows={3}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Claim Amount"
              type="text"
              name="claimed_amount"
              value={this.state.claimed_amount}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date"
              type="date"
              name="date"
              variant="outlined"
              value={this.state.date}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit Claim
            </Button>
          </form>
        </Paper>
      </Box>
      </div>
    );
  }
}

export default Makeclaim;*/


import React, { Component } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

class Makeclaim extends Component {
  state = {
    reason: '',
    date: '',
    username: this.props.user_name,
    claimed_amount: '',
    category: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/make_claim", this.state)
      .then((res) => {
        console.log(this.state);
        if (res.data.success) {
          alert(res.data.success);
        } 
      })
      .catch((err) => {
        console.log(err);
        
      });
  };

  render() {
    return (
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: '20px',
            maxWidth: '400px',
            width: '100%',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Make a Claim
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Claim Category"
              type="text"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Claim Reason"
              multiline
              type="text"
              name="reason"
              value={this.state.reason}
              onChange={this.handleChange}
              rows={3}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Claim Amount"
              type="text"
              name="claimed_amount"
              value={this.state.claimed_amount}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date"
              type="date"
              name="date"
              variant="outlined"
              value={this.state.date}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit Claim
            </Button>
          </form>
        </Paper>
      </Box>
    );
  }
}

export default Makeclaim;

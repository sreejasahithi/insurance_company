import React, { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function Bonus() {
  const [agentID, setAgentID] = useState('');
  const [bonus, setBonus] = useState(null);
  const [isalert,setIsalert]=useState(false);
 

  const handleAgentIDChange = (event) => {
    setAgentID(event.target.value);
  };

 const  handleCloseAlert = () => {
    setIsalert(false);
  };

  const calculateBonus = async () => {
    try {
      const response = await axios.post('http://localhost:3001/calculateBonus', { agentID });
      const bonusAmount = response.data.bonus;
      setBonus(bonusAmount);
      setIsalert(true);
     // alert(`Agent ID: ${agentID}\nBonus: ${bonusAmount}`);
    } catch (error) {
      console.error('Error calculating bonus:', error);
      alert('Error calculating bonus. Please try again.');
    }
  };

  return (
    <div className="App">
       {isalert ? (
            <Alert
            severity="success"
            onClose={handleCloseAlert}
            style={{ width: '100%', marginBottom: '20px' }}
          >
            <AlertTitle>success</AlertTitle>
            `Agent ID: {agentID} Bonus: {bonus}`
          </Alert>
          
          ) : null}
      <h1>Agent Bonus </h1>
      <div>
        <label>Agent ID:</label> 
        <input type="text" value={agentID} onChange={handleAgentIDChange} />
      </div>
      <button onClick={calculateBonus}>Calculate Bonus</button>
      {bonus !== null && <p>Bonus: {bonus}</p>}
      <h4>DISCLAIMER-</h4>
      <p>The bonus is based on the number of policies sold by the agent</p>
    </div>
  );
}

export default Bonus;

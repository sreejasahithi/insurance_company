import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import axios from 'axios';
import NavBar from './components/Navbar';

import Policy_holder from './components/Policyhoolder';
//import LoginPage from './components/Login';
//import Agent from './components/Agent';
import Register from './components/Register';

import Login_agent from './components/Login_page';
import Login_policy_holder from './components/Login_ph';
import LoginPage from './components/Login';
import About from './components/About';
import Password_change_ph from './components/Password_change_ph';
import Password_change_agent from './components/Password_change_agent';
import Login_admin from './components/Login_admin';


function App() {
  return (
    <div>
      
    <Router> 
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
        <Route path="/login_agent" element={<Login_agent/>} />
        <Route path="/register" element={<Register />} />
         <Route path="/login_policyholder" element={<Login_policy_holder />} />
         <Route path="/register_policyholder" element={<Policy_holder />} />
         <Route path="/login_admin" element={<Login_admin/>} />
          <Route path="/about" element={<About/>}/>
          <Route path="/change_password" element={<Password_change_ph/>}/>
          <Route path="/change_password_agent" element={<Password_change_agent/>}/>
         {/*<Route path="/submit-registration" element={<Register/>} />*/}
         
          
        </Routes>
      </div>
    </Router>
   
    </div>
     
  );
}

export default App;



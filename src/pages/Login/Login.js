import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import './Login.css';

async function loginUser(credentials) {
  return fetch('https://l120221113204654.azurewebsites.net/api/login', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
}

const Login = ({setToken}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    navigate('/hotels');
  }

  const paperStyle={padding: 20, height:'30vh', width:280, margin:"20px auto"}
  return (
    <Grid style={paperStyle}>
        <TextField id="outlined-basic" autoFocus fullWidth label="Username" variant="outlined" style={{padding:7}} onChange={e => setUsername(e.target.value)}/>
        <TextField id="outlined-basic3" fullWidth label="Password" type="password" style={{padding:7}} variant="outlined" onChange={e => setPassword(e.target.value)}/>
        <Button type='submit' color='primary' variant="contained" fullWidth   onClick={handleSubmit}>Login</Button>
    </Grid>
  )
}



Login.propTypes = {
  setToken: propTypes.func.isRequired
}

export default Login
import { TextField, Grid} from '@material-ui/core'
import { Button } from '@mui/material'
import { React, useState } from 'react'
import { useNavigate } from "react-router-dom";

async function registerUser(credentials) {
  return fetch('https://l120221113204654.azurewebsites.net/api/register', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
}

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    await registerUser({
      username,
      email,
      password
    });
    navigate('/login');
  }


  const paperStyle={padding: 20, height:'30vh', width:280, margin:"20px auto"}
  return (
    <Grid style={paperStyle}>
        <TextField id="outlined-basic" autoFocus fullWidth label="Username" variant="outlined" style={{padding:7}} onChange={e => setUsername(e.target.value)}/>
        <TextField id="outlined-basic2" fullWidth label="Email" variant="outlined" style={{padding:7}} onChange={e => setEmail(e.target.value)}/>
        <TextField id="outlined-basic3" fullWidth label="Password" type="password" style={{padding:7}} variant="outlined" onChange={e => setPassword(e.target.value)}/>
        <Button type='submit' color='primary' variant="contained" fullWidth   onClick={handleSubmit}>Register</Button>
    </Grid>
  )
}

export default Register
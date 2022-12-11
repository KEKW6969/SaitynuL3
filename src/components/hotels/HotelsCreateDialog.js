import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import building from '../../hotel.jpg'

export default function HotelsCreateDialog(token) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(undefined);
  const [address, setAddress] = React.useState(undefined);
  const [number, setNumber] = React.useState(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    handleClose();
    fetch('https://l120221113204654.azurewebsites.net/api/hotels', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token.token.token.accessToken
      },
      body: JSON.stringify({
        'Name': name,
        'Address': address,
        'PhoneNumber': number
      })
    })
    .then(data => data.json())
  }

  return (
    <div>
      <div style={{alignItems:'center'}}>
        <img src={building} sx={{ marginLeft:5, marginTop:3 }} style={{maxWidth:5000, height:'auto'}}></img>
      </div>
      <Button variant="outlined" disabled={!token.token.token} onClick={handleClickOpen} sx={{ marginLeft:5, marginTop:3 }} style={{ backgroundImage: `url(${building})`, maxHeight:100 }}>
        Create Hotel
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a hotel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setName(e.target.value)}

          />
          <TextField
            margin="normal"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setAddress(e.target.value)}
          />
          <TextField
            margin="normal"
            id="number"
            label="Phone number"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
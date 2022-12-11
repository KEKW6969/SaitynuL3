import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function HotelsEditDialog(token) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(undefined);
  const [address, setAddress] = React.useState(undefined);
  const [number, setNumber] = React.useState(undefined);


  

  const handleClickOpen = () => {
    setName(token.token[2])
    setAddress(token.token[3])
    setNumber(token.token[4])
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    handleClose();
    fetch('https://l120221113204654.azurewebsites.net/api/hotels/' + token.token[1], {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token.token[0].token.accessToken
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
      <Button variant="outlined" disabled={!token.token[0].token || (token.token[6] !== token.token[5])} onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit hotel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={token.token[2]}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={token.token[3]}
            onChange={e => setAddress(e.target.value)}
          />
          <TextField
            margin="normal"
            id="number"
            label="Phone number"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={token.token[4]}
            onChange={e => setNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
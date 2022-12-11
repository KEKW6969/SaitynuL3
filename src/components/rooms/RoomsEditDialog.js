import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function RoomsEditDialog(token) {
  const [open, setOpen] = React.useState(false);
  const [number, setNumber] = React.useState(undefined);
  const [price, setPrice] = React.useState(undefined);
  const [description, setDescription] = React.useState(undefined);
  const handleClickOpen = () => {
    setNumber(token.token[4]);
    setPrice(token.token[5]);
    setDescription(token.token[6]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    handleClose();
    fetch('https://l120221113204654.azurewebsites.net/api/hotels/' + token.token[1] + '/floors/' + token.token[2]+'/rooms/'+ token.token[3] , {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token.token[0].accessToken
      },
      body: JSON.stringify({
        'Number': number,
        'Price': price,
        'Description': description

      })
    })
    .then(data => data.json())
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit room</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            id="number"
            label="Rooms's number"
            type="number"
            inputProps={{
              min: 0
            }}
            fullWidth
            variant="standard"
            defaultValue={token.token[4]}
            onChange={e => setNumber(e.target.value)}
          />
          <TextField
            margin="normal"
            id="price"
            label="Room's price"
            type="number"
            inputProps={{
              min: 0,
              step: 0.01,
            }}
            fullWidth
            variant="standard"
            defaultValue={token.token[5]}
            onChange={e => setPrice(e.target.value)}
          />
          <TextField
            margin="normal"
            id="description"
            label="Room's description"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={token.token[6]}
            onChange={e => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
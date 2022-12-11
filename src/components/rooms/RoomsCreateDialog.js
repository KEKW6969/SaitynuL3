import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function RoomsCreateDialog(token) {
  const [open, setOpen] = React.useState(false);
  const [number, setNumber] = React.useState(undefined);
  const [price, setPrice] = React.useState(undefined);
  const [description, setDescription] = React.useState(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    handleClose();
    fetch('https://l120221113204654.azurewebsites.net/api/hotels/'+token.token[1]+'/floors/'+token.token[2]+'/rooms', {
      method: 'POST',
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
      <Button variant="outlined" onClick={handleClickOpen} sx={{ marginLeft:5, marginTop:3 }}>
        Create Room
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="normal"
            id="number"
            label="Number"
            type="number"
            inputProps={{
              min: 0
            }}
            fullWidth
            variant="standard"
            onChange={e => setNumber(e.target.value)}
          />
          <TextField
            required
            margin="normal"
            id="number"
            label="Price"
            type="number"
            inputProps={{
              min: 0,
              step: 0.01,
            }}
            min="0"
            fullWidth
            variant="standard"
            onChange={e => setPrice(e.target.value)}
          />
          <TextField
            required
            margin="normal"
            id="number"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
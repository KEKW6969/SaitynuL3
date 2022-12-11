import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FloorsCreateDialog(token, id) {
  const [open, setOpen] = React.useState(false);
  const [number, setNumber] = React.useState(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    handleClose();
    fetch('https://l120221113204654.azurewebsites.net/api/hotels/'+token.id+'/floors/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token.token.accessToken
      },
      body: JSON.stringify({
        'Number': number
      })
    })
    .then(data => data.json())
  }

  return (
    <div>
      <Button variant="outlined" disabled={!token.token} onClick={handleClickOpen} sx={{ marginLeft:5, marginTop:3 }}>
        Create Floor
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a floor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="number"
            label="Floor's number"
            type="number"
            inputProps={{
              min: 0
            }}
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
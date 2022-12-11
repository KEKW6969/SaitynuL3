import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FloorsEditDialog(token) {
  const [open, setOpen] = React.useState(false);
  const [number, setNumber] = React.useState(undefined);

  const handleClickOpen = () => {
    setNumber(token.token[3]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    handleClose();

    fetch('https://l120221113204654.azurewebsites.net/api/hotels/' + token.token[1] + '/floors/' + token.token[2] , {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token.token[0].accessToken
      },
      body: JSON.stringify({
        'Number': number
      })
    })
    .then(data => data.json())
  }

  

  // || (parseJwt(token.token[0].token.accessToken).sub)
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit floor</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            id="number"
            label="Floor's number"
            type="number"
            inputProps={{
              min: 0
            }}
            fullWidth
            variant="standard"
            defaultValue={token.token[3]}
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
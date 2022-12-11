import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';

export default function RoomsDeleteDialog(token) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    handleClose();
    fetch('https://l120221113204654.azurewebsites.net/api/hotels/' + token.token[1] + '/floors/' + token.token[2]+'/rooms/'+ token.token[3] , {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token.token[0].accessToken
      }
    })
  }

  return (
    <div>
      <Button variant="outlined" color='secondary' onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete room</DialogTitle>
        <DialogContent>
          <DialogContentText>Number</DialogContentText>
          <DialogContentText>{token.token[4]}</DialogContentText>
          <DialogContentText>Price</DialogContentText>
          <DialogContentText>{token.token[5]}</DialogContentText>
          <DialogContentText>Description</DialogContentText>
          <DialogContentText>{token.token[6]}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={submit}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
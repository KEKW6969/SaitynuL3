import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function HotelsEditDialog(token) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    handleClose();

    fetch('https://l120221113204654.azurewebsites.net/api/hotels/' + token.token[1] + '/floors/' + token.token[2] , {
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
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle>Delete floor</DialogTitle>
        <DialogContent>
          <DialogContentText>Floor's number</DialogContentText>
          <DialogContentText>{token.token[3]}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={submit}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
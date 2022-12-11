import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';

export default function HotelsDeleteDialog(token) {
  const [open, setOpen] = React.useState(false);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    handleClose();
    fetch('https://l120221113204654.azurewebsites.net/api/hotels/' + token.token[1], {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token.token[0].token.accessToken
      }
    })
  }

  return (
    <div>
      <Button variant="outlined" color='secondary' disabled={!token.token[0].token || (token.token[6] !== token.token[5])} onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} aria-describedby="alert-dialog-slide-description" >
        <DialogTitle>Delete hotel</DialogTitle>
        <DialogContent>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogContentText aria-describedby="alert-dialog-slide-description">Name</DialogContentText>
            <DialogContentText aria-describedby="alert-dialog-slide-description">{token.token[2]}</DialogContentText>
            <DialogContentText aria-describedby="alert-dialog-slide-description">Address</DialogContentText>
            <DialogContentText aria-describedby="alert-dialog-slide-description">{token.token[3]}</DialogContentText>
            <DialogContentText aria-describedby="alert-dialog-slide-description">Phone number</DialogContentText>
            <DialogContentText aria-describedby="alert-dialog-slide-description">{token.token[4]}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={submit}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
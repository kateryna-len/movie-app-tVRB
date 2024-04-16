import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ModalWarningDelete({openWarnDelete, deleteMovie, movieChooseDelete, closeModalWarnDelete}) {
  return (
    <>
 <Dialog
        open={openWarnDelete}
        onClose={closeModalWarnDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the movie <span style={{fontWeight: 500}}>"{movieChooseDelete.name}"</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModalWarnDelete}>Disagree</Button>
          <Button onClick={()=>deleteMovie(movieChooseDelete.id)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      
    </>
  )
}

export default ModalWarningDelete

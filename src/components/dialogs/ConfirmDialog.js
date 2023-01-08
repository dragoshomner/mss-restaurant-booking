import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useGlobalModalContext } from './DialogProvider';

export default function ConfirmDialog() {
    const { hideModal, store } = useGlobalModalContext();
    const { modalProps } = store || {};
    const { title, description, confirmCallback, hideCancelButton } = modalProps || {};
    const handleClose = () => hideModal();

    const handleConfirm = () => {
        confirmCallback();
        handleClose();
    }

    return (
        <Dialog
            open={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                { title }
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    { description }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                { !hideCancelButton && <Button onClick={handleClose}>Cancel</Button> }
                <Button onClick={handleConfirm} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
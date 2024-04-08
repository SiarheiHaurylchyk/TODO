import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ClearIcon from '@mui/icons-material/Clear';
import {Delete} from "@mui/icons-material";
import {DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {RequestStatusType} from "App/AppSlice";



type AlertDialog = {
    removeAlertDialogCallback:()=>void
    entityStatus?:RequestStatusType
}

export default function AlertDialog({removeAlertDialogCallback,entityStatus}:AlertDialog) {
    const [open, setOpen] = React.useState(false);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Delete onClick={handleClickOpen}  color={entityStatus==="loading"?"disabled":"primary"}/>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}><TaskAltIcon onClick={removeAlertDialogCallback} sx={{color:"green"}} style={{width: "40px", height:"40px"}}/></Button>
                    <Button onClick={handleClose} autoFocus>
                        <ClearIcon sx={{color:"red"}} style={{width: "40px", height:" 40px"}}/>
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

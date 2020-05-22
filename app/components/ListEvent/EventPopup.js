import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function EventPopup(props) {
  const classes = useStyles();
  const { open, parentCallback } = props;

  const [eventform, setEventForm] = useState({
    libelle: '',
    description: '',
    date_debut: '',
    date_fin: '',
    visibilite: '',
    status: '',
  });
  // const [open, setOpen] = useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };


  const handleChange = (e) => {
    setEventForm({ ...eventform, [e.target.name]: [e.target.value].toString() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventform);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => parentCallback(!open)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          onClose={() => parentCallback(!open)}
        >
          Nouvel evenement
        </DialogTitle>
        <DialogContent>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Titre"
              type="text"
              name="libelle"
              onChange={handleChange}
            />
            <TextField
              label="Description"
              type="text"
              name="description"
              onChange={handleChange}
            />
            <TextField
              label="Status"
              type="text"
              name="status"
              onChange={handleChange}
            />
            <TextField
              label="Visibilite"
              type="text"
              name="visibilite"
              onChange={handleChange}
            />
            <TextField
              type="date"
              label="Date de debut"
             
              name="date_debut"
              onChange={handleChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
            />
            <TextField
              type="date"
              label="Date de fin"
              name="date_fin"
              onChange={handleChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
            />
            <Button type="submit" color="primary" variant="contained">
              Ajouter
            </Button>
          </form>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

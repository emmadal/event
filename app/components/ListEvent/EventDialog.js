import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

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
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
}));

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


export default function EventDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [eventform, setEventForm] = useState({
    libelle: '',
    description: '',
    date_debut: '',
    date_fin: '',
    visibilite: '',
    status: '',
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setEventForm({
      ...eventform,
      [e.target.name]: [e.target.value].toString(),
    });
  };

  const createEvent = async () => {
    await axios.post('https://factory.buzevent.com/orga/evenements/create', { eventform });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    createEvent();
    console.log('event created');
  };

  return (
    <div>
      <Button size="small" variant="contained" color="primary" onClick={handleClickOpen} style={{ margin: 10 }}>
        Ajouter un evenement
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Nouvel Evenement
        </DialogTitle>
        <DialogContent dividers>
          <form noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.root}>
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
            <DialogActions>
              <Button type="submit" color="primary" variant="contained">
                Creer
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
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
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import { ToastSaveSucces, ToastErrorSave } from '../Error/ToastAlert';
// import EventItem from './EventItem';


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
  }
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
  actions: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
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
  const [eventdata, setEventData] = useState([]);
  const [eventform, setEventForm] = useState({
    libelle: '',
    petite_description: '',
    longue_description: null,
    date_debut: '',
    date_fin: '',
    visibilite: '',
    status: '',
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const getAllEvents = async () => {
    const event = await axios.get('https://dev.buzevent.com/orga/evenements');
    setEventData(event.data);
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
    const {
      libelle, petite_description, date_debut, date_fin, status, visibilite
    } = eventform;
    const event = await axios.post('https://dev.buzevent.com/orga/evenements', {
      libelle, petite_description, date_debut, date_fin, status, visibilite
    });
    if (event) ToastSaveSucces();
    else if (!event) ToastErrorSave();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    createEvent();
    console.log(eventform);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ margin: 5 }}
      >
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
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            className={classes.root}
          >
            <TextField
              label="Libelle"
              value={eventform.libelle}
              type="text"
              name="libelle"
              onChange={handleChange}
            />
            <TextField
              label="Description"
              type="text"
              name="petite_description"
              value={eventform.petite_description}
              onChange={handleChange}
            />
            <TextField
              label="Status"
              type="text"
              value={eventform.status}
              name="status"
              onChange={handleChange}
            />
            <TextField
              label="Visibilite"
              type="text"
              value={eventform.visibilite}
              name="visibilite"
              onChange={handleChange}
            />
            <TextField
              type="date"
              label="Date de debut"
              name="date_debut"
              value={eventform.date_debut}
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
              value={eventform.date_fin}
              onChange={handleChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <DialogActions className={classes.actions}>
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

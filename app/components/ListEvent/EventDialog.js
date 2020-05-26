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
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer } from 'react-toastify';
import {
  ToastSaveSucces,
  ToastErrorSave,
  ToastUpdateSucces,
  ToastErrorUpdate,
  ToastErrorSaveDuplicate,
} from '../Error/ToastAlert';
import EventItem from './EventItem';

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
  actions: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  spinner: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 'auto',
  },
}))(MuiDialogActions);

export default function EventDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [datalength, setDataLength] = useState(0);
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
    setModalUpdate(true);
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

  const getAllEvents = async () => {
    const event = await axios.get('https://dev.buzevent.com/orga/evenements');
    setEventData(event.data);
  };


  const updateEvent = async (id) => {
    const existEvent = await axios.get(
      `https://dev.buzevent.com/orga/evenements/${id}`
    );
    const {
      libelle,
      petite_description,
      date_debut,
      date_fin,
      status,
      visibilite,
    } = existEvent.data;
    try {
      setOpen(true);
      setEventForm({
        libelle,
        petite_description,
        date_debut: new Date(`${date_debut}`).toLocaleDateString('fr-CA'),
        date_fin: new Date(`${date_fin}`).toLocaleDateString('fr-CA'),
        status,
        visibilite,
      });
      const _update = await axios.put(`https://dev.buzevent.com/orga/evenements/${id}`, {
        libelle,
        petite_description,
        date_debut,
        date_fin,
        status,
        visibilite,
      });
      setDataLength(_update.data);
      getAllEvents();
    } catch (err) {
      ToastErrorUpdate();
    }
  };

  const createEvent = async () => {
    const {
      libelle,
      petite_description,
      date_debut,
      date_fin,
      status,
      visibilite,
    } = eventform;
    const existEvent = await axios.get(
      'https://dev.buzevent.com/orga/evenements'
    );
    const val = existEvent.data.filter((m) => m.libelle === libelle);
    if (val.length > 0) {
      ToastErrorSaveDuplicate();
    } else {
      try {
        const event = await axios.post(
          'https://dev.buzevent.com/orga/evenements',
          {
            libelle,
            petite_description,
            date_debut,
            date_fin,
            status,
            visibilite,
          }
        );
        getAllEvents();
        if (event.status === 200) ToastSaveSucces();
      } catch (error) {
        ToastErrorSave();
      }
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    datalength > 0 ? updateEvent() : createEvent();
    setEventForm({
      libelle: '',
      petite_description: '',
      longue_description: null,
      date_debut: '',
      date_fin: '',
      visibilite: '',
      status: '',
    });
  };

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
            <DialogActions>
              <Button type="submit" color="primary" variant="contained">
                Enregistrer
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <div>
        {eventData.length > 0 ? (
          <EventItem
            event={eventData}
            getData={getAllEvents}
            update={updateEvent}
          />
        ) : (
          <section className={classes.spinner}>
            <ClipLoader size={40} color="#03a9f4" loading />
            <Typography variant="body2">Chargement en cours...</Typography>
          </section>
        )}
      </div>
    </div>
  );
}

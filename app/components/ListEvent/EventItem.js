import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Settings, DeleteOutline, EditOutlined } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import { ToastDeleteSucces } from '../Error/ToastAlert';

const useStyles = makeStyles({
  root: {
    minWidth: '48%',
    maxWidth: '50%',
    margin: 5,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  pos: {
    marginBottom: 12,
    textAlign: 'center'
  },
  actions: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
});

export default function EventItem() {
  const classes = useStyles();

  const [eventdata, setEventData] = useState([]);

  const getAllEvents = async () => {
    const event = await axios.get('https://dev.buzevent.com/orga/evenements');
    setEventData(event.data);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const deleteOneEvent = async (id) => {
    const res = await axios.delete(`https://dev.buzevent.com/orga/evenements/${id}`);
    if (res) ToastDeleteSucces();
    getAllEvents();
  };

  return (
    <>
      {eventdata.reverse().map((m) => (
        <Card className={classes.root} key={m.id}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textPrimary"
              variant="h1"
              gutterBottom
            >
              {m.libelle}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {m.petite_description}
            </Typography>
            <Typography variant="body2" component="p">
              Date de debut:
              {' '}
              {new Date(m.date_debut).toLocaleDateString('fr-Fr')}
            </Typography>
            <Typography variant="body2" component="p">
              Date de fin:
              {' '}
              {new Date(m.date_fin).toLocaleDateString('fr-Fr')}
            </Typography>
            <Typography variant="body2" component="p">
              Visibilte:
              {' '}
              {m.visibilite}
            </Typography>
            <Typography variant="body2" component="p">
              Status:
              {' '}
              {m.status}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <ButtonGroup
              size="small"
              aria-label="small outlined button group"
              color="primary"
            >
              <Button size="small" title="Configurer" color="primary">
                <Settings fontSize="small" />
              </Button>
              <Button
                size="small"
                title="Modifier"
                color="primary"
              >
                <EditOutlined fontSize="small" color="action" />
              </Button>
              <Button
                size="small"
                title="Supprimer"
                color="primary"
                onClick={() => deleteOneEvent(m.id)}
              >
                <DeleteOutline fontSize="small" color="error" />
              </Button>
            </ButtonGroup>
          </CardActions>
        </Card>
      ))}
    </>
  );
}

import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EventItem from './EventItem';
import EventPopup from './EventPopup';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
  }
});

export default function ListEvent(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClikClose = childData => {
    setClose(childData);
    console.log(childData)
  };

  return (
    <Fragment>
      <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>
        Ajouter un evenement
      </Button>
      <div className={classes.root}>
        <EventPopup open={open} parentCallback={handleClikClose} />
      </div>
    </Fragment>
  );
}

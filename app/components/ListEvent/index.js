import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EventItem from './EventItem';
import EventDialog from './EventDialog';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
  }
});

export default function ListEvent() {
  const classes = useStyles();

  return (
    <Fragment>
      <EventDialog />
      <section className={classes.root}>
        <EventItem />
      </section>
    </Fragment>
  );
}

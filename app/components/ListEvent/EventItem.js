import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Settings } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: '48%',
    maxWidth: '50%',
    margin: 10
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
  }
});

export default function EventItem() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textPrimary"
          variant="h1"
          gutterBottom
        >
          Festival du placali
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          petite description
        </Typography>
        <Typography variant="body2" component="p">
          Longue description.
        </Typography>
        <Typography variant="body2" component="p">
          Date de debut: .
        </Typography>
        <Typography variant="body2" component="p">
          Date de fin: .
        </Typography>
        <Typography variant="body2" component="p">
          Visibilte: .
        </Typography>
        <Typography variant="body2" component="p">
          Status: .
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          title="Configurer"
          color="primary"
        >
          <Settings fontSize="small" />
        </Button>
      </CardActions>
    </Card>
  );
}

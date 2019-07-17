import React from 'react';
import {
  withRouter
} from 'react-router-dom'

//components
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


//styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    display: 'flex'
  },
  container: {
    flexGrow: '1'
  },
  paperWrapper: {
    height: '100%'
  },
  paper: {
    padding: theme.spacing(5)
  },
  button: {
    marginTop: theme.spacing(3)
  }
}))

function VerifyEmail(props) {
  const classes = useStyles();

  function goToLogin() {
    props.history.push('/login')
  } 

  return(
    <div className={classes.root}>
      <Container className={classes.container} fixed> 
        <Grid
          container
          className={classes.paperWrapper}
          direction="column"
          justify="center"
          alignItems="center">
          <Paper className={classes.paper}>
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center">
              <Typography variant="h5">
                Please verify your email before continuing.
              </Typography>
              <Button 
                className={classes.button} 
                variant="contained" 
                color="primary"
                onClick={goToLogin}>
                Sign In
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </div>
  )

}

export default withRouter(VerifyEmail)
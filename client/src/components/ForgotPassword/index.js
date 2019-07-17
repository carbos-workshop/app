import React from 'react';

//components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

//context/services
import { authService } from '../../services/auth.service'
import { UserContext } from '../../contexts/user.context'

//styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
   height: '100%'
  },
  paperWrapper: {
    height: '100%'
  },
  paper: {
    padding: theme.spacing(5),
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      padding:theme.spacing(1),
    }
  },
  title: {
    marginBottom: theme.spacing(2)
   },
  textField: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing(3)
  }
}))

export default function ForgotPassword(props) {
  const classes = useStyles();

  const sendReset = email => {
    props.toggleSentResetView()
    authService.sendResetPassword(email)
    //display message saying check email
    console.log('need to display message saying email is sent')
  }

  return(
    <UserContext.Consumer>
    {(user) => (
      <div className={classes.root}>
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
              <Typography variant="h5" className={classes.title}>
                Enter your account email
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                className={classes.textField}
                onChange={e => {  user.dispatch({type: 'UPDATE_USER_EMAIL', payload: e.target.value }) }}
                value={user.email}
                label="Email"
              />
              <Button 
                className={classes.button}
                onClick={() => {sendReset(user.email)}}>
                Reset Password
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </div>
    )}
    </UserContext.Consumer>
  )

}

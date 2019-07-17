import React, {useState} from 'react';

//components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';

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
    marginLeft: 'auto',
    marginTop: theme.spacing(2)
   },
   rightIcon: {
    marginLeft: theme.spacing(1),
  },
}))

export default function CreateNewPassword(props) {
  const classes = useStyles();

  const sendNewPassword = (email, code, password, confirmPassword) => {
    //check everything is good with values
    if(password !== confirmPassword) {
      //TODO have this show an error msg
      console.log('passwords do not match')
    }

    props.toggleSentResetView()
    
    authService.confirmPasswordReset(email, code, password)
    //display message saying worked
    //redirtet to login
  }

  const [state, setValue] = useState({
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });

  const changeValue = (name, event) => {
    setValue({
      ...state,
      [name]: event.target.value
    })
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
                  Enter the verification code sent to your email address along with your new password.
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                className={classes.textField}
                value={state.verificationCode}
                onChange={e => changeValue('verificationCode', e)}
                label="Verification Code"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                className={classes.textField}
                value={state.newPassword}
                onChange={e => changeValue('newPassword', e)}
                label="New Password"
                type="password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                className={classes.textField}
                value={state.confirmPassword}
                onChange={e => changeValue('confirmPassword', e)}
                label="Confirm Password"
                type="password"
              />
              <Button 
                color="primary" 
                variant="contained"
                className={classes.button}
                onClick={() => {
                sendNewPassword(user.email, state.verificationCode, state.newPassword, state.confirmPassword)}}>
                Send
                <SendIcon className={classes.rightIcon} />
              </Button>

            </Grid>
          </Paper>
        </Grid>
      </div>
    )}
    </UserContext.Consumer>
  )

}

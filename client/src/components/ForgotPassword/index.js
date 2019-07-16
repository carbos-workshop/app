import React from 'react';

//components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


//context/services
import { authService } from '../../services/auth.service'
import { UserContext } from '../../contexts/user.context'

//styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    
  },
}))

export default function ForgotPassword(props) {
  const classes = useStyles();

  const sendReset = email => {
    props.toggleSentResetView()
    //TODO
    console.log('send reset')
    authService.sendResetPassword(email)
    //display message saying check email
  }

  return(
    <UserContext.Consumer>
    {(user) => (
      <div className={classes.root}>

        <TextField
          variant="outlined"
          margin="normal"
          required
          onChange={e => {  user.dispatch({type: 'UPDATE_USER_EMAIL', payload: e.target.value }) }}
          value={user.email}
          label="Email"
        />
        <Button onClick={() => {sendReset(user.email)}}>
          Reset Password
        </Button>
      </div>
    )}
    </UserContext.Consumer>
  )

}

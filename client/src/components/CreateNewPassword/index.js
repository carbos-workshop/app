import React, {useState} from 'react';

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
        <p>
            Please enter the verification code sent to your email address and a new password.
        </p>
        Email : {user.email}
        <TextField
          variant="outlined"
          margin="normal"
          required
          value={state.verificationCode}
          onChange={e => changeValue('verificationCode', e)}
          label="Verification Code"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          value={state.newPassword}
          onChange={e => changeValue('newPassword', e)}
          label="New Password"
          type="password"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          value={state.confirmPassword}
          onChange={e => changeValue('confirmPassword', e)}
          label="Confirm Password"
          type="password"
        />
        <Button color="primary" onClick={() => {
          sendNewPassword(user.email, state.verificationCode, state.newPassword, state.confirmPassword)}}>
          Send
        </Button>
      </div>
    )}
    </UserContext.Consumer>
  )

}

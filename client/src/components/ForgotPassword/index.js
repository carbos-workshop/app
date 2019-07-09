import React from 'react';

//components
import Button from '@material-ui/core/Button';

//context/services
import { authService } from '../../services/auth.service'
import { UserContext } from '../../contexts/user.context'

//styles
import { useStyles } from './styles'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    
  },
}))

export default function ForgotPassword(props) {
  const classes = useStyles();

  sendReset = () => {
    props.toggleSentResetView()
    //TODO
    console.log('send reset')
    //display message saying check email
  }

  return(
    <UserContext.Consumer>
    {(user) => (
      <div className={classes.root}>

        Email : {user.email}

        <Button onClick={sendReset}>
          Reset Password
        </Button>
      </div>
    )}
    </UserContext.Consumer>
  )

}

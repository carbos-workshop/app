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

export default function CreateNewPassword(props) {
  const classes = useStyles();

  sendNewPassword = () => {
    //check everything is good with values

    props.toggleSentResetView()
    //TODO
    console.log('send new password info')
    //display message saying worked
    //redirtet to login
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
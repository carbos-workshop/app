import React, { useState } from 'react';

//components
import  ForgotPassword  from '../../components/ForgotPassword'
import  CreateNewPassword  from '../../components/CreateNewPassword'

//services/contexts


//styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    
  },
}))

export default function ResetPassword(props) {
  const classes = useStyles();

  const [sentReset, toggleSentReset] = useState(false);

  return(
    <div className={classes.root}>
      {
        sentReset
        ? <CreateNewPassword toggleSentResetView={() => {toggleSentReset(!sentReset)}}/>
        : <ForgotPassword toggleSentResetView={() => {toggleSentReset(!sentReset)}}/>
      }
    </div>
  )
}

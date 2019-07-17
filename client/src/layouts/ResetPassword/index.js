import React, { useState } from 'react';

//components
import Container from '@material-ui/core/Container';

//components
import  ForgotPassword  from '../../components/ForgotPassword'
import  CreateNewPassword  from '../../components/CreateNewPassword'

//services/contexts


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

}))

export default function ResetPassword(props) {
  const classes = useStyles();

  const [sentReset, setSentReset] = useState(false);

  return(
    <div className={classes.root}>
      <Container className={classes.container} fixed> 
          {
            sentReset
            ? <CreateNewPassword toggleSentResetView={() => { setSentReset(!sentReset)}}/>
            : <ForgotPassword toggleSentResetView={() => { setSentReset(!sentReset)}}/>
          }
      </Container>
    </div>
  )
}
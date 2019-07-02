import React, { useReducer } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp'



const useStyles = makeStyles(theme => ({
    root:{
      overflowX: 'hidden'
    },
  } 
))

function reducer(state, action) {
  switch (action.type) {
    case 'viewSignUp':
      return { viewMode: 'signUp' }
    case 'viewSignIn':
      return { viewMode: 'signIn' }
    default:
      throw new Error();
  }
}

export default function Login() {

  const classes = useStyles();

  const [state, dispatch] = useReducer(
    reducer,
    {viewMode: 'signIn'}
  );

  return (
    <Grid container className={classes.root}>
      <Grid item xs={6}>
        viewing mode: {state.viewMode }
        <SignIn changeViewMode={()=>{dispatch({type: 'viewSignUp'})}}/>
      </Grid>
      <Grid item xs={6}>
        <SignUp changeViewMode={()=>{dispatch({type: 'viewSignIn'})}}/>
      </Grid>
    </Grid>
  )
}
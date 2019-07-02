import React from 'react'
import Grid from '@material-ui/core/Grid';

import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp'

export default function Login() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <SignIn />
      </Grid>
      <Grid item xs={6}>
        <SignUp />
      </Grid>
    </Grid>
  )
}
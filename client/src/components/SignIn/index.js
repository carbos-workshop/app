import React, { useState } from 'react';
import {
  withRouter
} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import { Utils } from '../../utils/utils'

//component imports
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
//local components
import { TextButton } from './TextButton'
import { WhiteButton } from './WhiteButton'
import { WhiteTextField } from './WhiteTextField'
import { WhiteCheckbox } from './WhiteCheckbox'
import CircularProgress from '@material-ui/core/CircularProgress';

//services/contextx
import { authService } from '../../services/auth.service'
import { UserContext } from '../../contexts/user.context'

import { useStyles } from './styles'
import classNames from 'classnames'

//main component
function SignIn(props) {
  const classes = useStyles();

  const [state, setValue] = useState({
    shouldRemember: true,
    loading: false
  });

 const toggleShouldRemember = () => {
    setValue({
      ...state,
      shouldRemember: !state.shouldRemember
    })
  }

  function sendWarning(message) {
    props.enqueueSnackbar(message, {
      anchorOrigin: {
       vertical: 'top',
       horizontal: 'center',
       },
       autoHideDuration: 5000,
       variant: 'warning',
     })
  }


  function signIn(e, user) {
    e.preventDefault()

    setValue({
      ...state,
      loading: true
    })

    authService.signIn(user, state.shouldRemember)
    .then( res => {
     if (res.message) {
      sendWarning(res.message)
      }
      else {
        // user.dispatch({type: 'SET_USER_LOGGEDIN', payload: true })
        props.history.push('/')
      }
    })
    .catch(()=>{
      console.log('error thrown during signin')
      sendWarning('An unexpected problem occured')
    })
  }

  return (

    <UserContext.Consumer>
    {(user) => (
        <Container component="main" maxWidth="xs" className={classes.root}>
        <Typography component="h1" variant="h4" className={classNames([
          classes.title,
          (props.hideForm
            ? classes.hide
            : null)])}>
          Sign In
        </Typography>

        <div className={classNames([
          classes.paper, 
          (props.hideForm
            ? classes.hide
            : null)])}>
 
        <form className={classes.form} noValidate>

          <WhiteTextField
            variant="outlined"
            margin="normal"
            error={(Boolean((user.email.length > 5) && !Utils.validateEmail(user.email)))}
            required
            fullWidth
            key={`${props.hideForm}1`} //attaching key for props stops resize bug in material UI resize text fields
            onChange={e => {  user.dispatch({type: 'UPDATE_USER_EMAIL', payload: e.target.value }) }}
            value={user.email}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <WhiteTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            key={`${props.hideForm}2`}  //attaching key for props stops resize bug in material UI resize text fields
            name="password"
            label="Password"
            type="password"
            onChange={e => {  user.dispatch({type: 'UPDATE_USER_PASSWORD', payload: e.target.value }) }}
            value={user.password}
            autoComplete="current-password"
          />

          <FormControlLabel
            className={classes.formFieldWrapper}
            control={<WhiteCheckbox value={state.shouldRemember} onChange={toggleShouldRemember} color="primary" />}
            label={<span className={classes.whiteText}>Remember me</span>}
          />

          <Grid container spacing={2}>

            <Grid item xs={6} md={12}>
              <WhiteButton
                type="submit"
                fullWidth
                variant="contained"
                color="default"
                disabled={state.loading}
                onClick={e => { signIn(e, user) }}
                className={classes.submit}>
                {
                  state.loading
                  ? <CircularProgress 
                      size={24}
                      thickness={4}
                      className={classes.progress} />
                  : "Sign In"
                }
              </WhiteButton>
            </Grid>

            <Grid item xs={6}>
              <TextButton
                fullWidth
                onClick={()=> {props.changeViewMode()}}
                className={classes.changeViewModeButton}>
                Sign Up
              </TextButton>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs className={classes.linkWrapper}>
              <Link href="forgotpassword" variant="body2" className={classes.whiteText}>
                Forgot password?
              </Link>
            </Grid>

          </Grid>
        </form>
      </div>
    </Container>
  )}
  </UserContext.Consumer>
  );
}

export default withSnackbar(withRouter(SignIn))
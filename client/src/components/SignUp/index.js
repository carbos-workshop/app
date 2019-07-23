import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack';
import { Utils } from '../../utils/utils'
//component imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

//services/contextx
import { authService } from '../../services/auth.service'
import { UserContext } from '../../contexts/user.context'

//styles
import classNames from 'classnames'
import { useStyles } from './styles'

function SignUp(props) {
  const classes = useStyles();

  const [accountType, setAccountType] = React.useState('individual');

  function handleChange(event) {
    setAccountType(event.target.value);
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
  
  function sendMessage(message) {
    props.enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
        },
        autoHideDuration: 2000,
      })
  }

  function signUp(e, user) {
    e.preventDefault()
    if (!validateForm(user)) {
      sendWarning('Please fill out all fields')
      return
    }
    user.accountType = accountType
    console.error('NEED TO SET USER ACCOUNT TYPE IN COGNITO OR RDS. INFO NOT SAVED OUTSIDE OF CURRENT SESSION.')
    authService.signUp(user)
    .then( res => {
      console.log('res', res)
      if (res.message) {
        sendWarning(res.message)
      }
      else {
        sendMessage('Verification email sent')
        props.history.push('/verifyemail')
      }
     })
     .catch(()=>{
       console.log('error thrown during signup')
       sendWarning('An unexpected problem occured')
     })
  }

  function validateForm(user){
    return Boolean(
      user.name.firstname 
      && user.name.lastname 
      && Utils.validateEmail(user.email)
      && user.email
      && user.password
      && accountType
    )
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
          Sign Up
        </Typography>
        <Paper className={classNames([
          classes.paper,
          (props.hideForm
            ? classes.hide
            : null)])}>
          <div className={classNames([
            (props.hideForm
              ? classes.hide
              : null)])}>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstname"
                    variant="outlined"
                    required
                    className={classes.textField}
                    key={`${props.hideForm}0`}  //attaching key for props stops resize bug in material UI resize text fields
                    fullWidth
                    label="First Name"
                    onChange={e => { user.dispatch({type: 'UPDATE_USER_FIRSTNAME', payload: e.target.value}) }}
                    value={user.name.firstname}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    className={classes.textField}
                    fullWidth
                    key={`${props.hideForm}1`}  //attaching key for props stops resize bug in material UI resize text fields
                    label="Last Name"
                    name="lastname"
                    onChange={e => { user.dispatch({type: 'UPDATE_USER_LASTNAME', payload: e.target.value}) }}
                    value={user.name.lastname}
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    className={classes.textField}
                    fullWidth
                    error={(Boolean((user.email.length > 5) && !Utils.validateEmail(user.email)))}
                    key={`${props.hideForm}2`}  //attaching key for props stops resize bug in material UI resize text fields
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={e => { user.dispatch({type: 'UPDATE_USER_EMAIL', payload: e.target.value}) }}
                    value={user.email}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    className={classes.textField}
                    fullWidth
                    onChange={e => { user.dispatch({type: 'UPDATE_USER_PASSWORD', payload: e.target.value}) }}
                    value={user.password}
                    key={`${props.hideForm}3`}  //attaching key for props stops resize bug in material UI resize text fields
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset" className={classes.radioWrapper}>
                    <FormLabel component="label" >Account Type</FormLabel>
                    <RadioGroup
                      aria-label="Account Type"
                      name="accountType"
                      value={accountType}
                      onChange={handleChange}>
                        
                      <Grid container>
                        <Grid item xs={12} sm={6}>
                          <FormControlLabel value="individual" control={<Radio color="primary" />} label="Individual" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControlLabel value="business" control={<Radio color="primary" />} label="Business" />
                        </Grid>
                      </Grid>
                  
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2} className={classes.buttonRow}>
                <Grid item xs={6} md={12}>
                  <Button
                    type="submit"
                    fullWidth
                    onClick={e => { signUp(e, user) }}
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    onClick={()=> {props.changeViewMode()}}
                    color="primary"
                    className={classes.changeViewModeButton}>
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Paper>
      </Container>
    )}
    </UserContext.Consumer>
  );
}

export default withSnackbar(withRouter(SignUp))
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { authService } from '../../services/auth.service'
import classNames from 'classnames'
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
  root: {
    padding: '0',

  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px 32px'
  },
  title: {
    fontWeight: '700', 
   },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

  changeViewModeButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  hide: {
    [theme.breakpoints.down('sm')]: {
      opacity: '0',
      width: '0',
      display: 'none',
    }
  }
}));

export default function SignUp(props) {
  const classes = useStyles();

  const [user, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const updateField = e => {
    setValues({
      ...user,
      [e.target.name]: e.target.value
    });
  };


  function signUp(e) {
    e.preventDefault()
    authService.signUp(user)
  }

  return (
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
                    key={`${props.hideForm}0`}  //attaching key for props stops resize bug in material UI resize text fields
                    fullWidth
                    label="First Name"
                    onChange={updateField}
                    value={user.firstname}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    key={`${props.hideForm}1`}  //attaching key for props stops resize bug in material UI resize text fields
                    label="Last Name"
                    name="lastname"
                    onChange={updateField}
                    value={user.lastname}
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    key={`${props.hideForm}2`}  //attaching key for props stops resize bug in material UI resize text fields
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={updateField}
                    value={user.email}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={updateField}
                    value={user.password}
                    key={`${props.hideForm}3`}  //attaching key for props stops resize bug in material UI resize text fields
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6} md={12}>
                  <Button
                    type="submit"
                    fullWidth
                    onClick={signUp}
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
  );
}

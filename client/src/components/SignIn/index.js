import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { grey } from '@material-ui/core/colors';

import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import classNames from 'classnames'

import { authService } from '../../services/auth.service'

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
    color: theme.palette.background.paper,

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  changeViewModeButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  whiteText: {
    color: 'white'
  },
  hide: {
    [theme.breakpoints.down('sm')]: {
      opacity: '0',
      width: '0',
      display: 'none'
    }
  }
}));

//local components
const TextButton = withStyles(theme => ({
  root: {
    color: 'white',
    // backgroundColor: '#fff',
    // '&:hover': {
    //   backgroundColor: grey[50],
    // },
  },
}))(Button);

const WhiteButton = withStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: grey[50],
    },
  },
}))(Button);

const WhiteTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255,255,255,0.55)',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& .MuiFormLabel-root':{
      color: 'rgba(255,255,255,0.55)'
    },
    '& .MuiInputBase-input':{
      color: 'white'
    },
  },
})(TextField);

const WhiteCheckbox = withStyles({
  root: {
    color: 'white',
    '&$checked': {
      color: 'white',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

//main component
export default function SignIn(props) {
  const classes = useStyles();

  const [user, setValues] = useState({
    shouldRemember: false,
    email: '',
    password: ''
  });

  const updateField = e => {
    setValues({
      ...user,
      [e.target.name]: e.target.value
    });
  };

 const toggleShouldRemember = () => {
    setValues({
      ...user,
      shouldRemember: !user.shouldRemember
    })
  }

  function signIn(e) {
    e.preventDefault()
    authService.signIn(user)
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
        <Typography component="h1" variant="h4" className={classNames([
          classes.title,
          (props.hideForm
            ? classes.hide
            : null)])}>
          Sign in
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
            required
            fullWidth
            key={`${props.hideForm}1`} //attaching key for props stops resize bug in material UI resize text fields
            onChange={updateField}
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
            onChange={updateField}
            value={user.password}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<WhiteCheckbox value={user.shouldRemember} onChange={toggleShouldRemember} color="primary" />}
            label={<span className={classes.whiteText}>Remember me</span>}
          />

          <Grid container spacing={2}>
            <Grid item xs={6} md={12}>
              <WhiteButton
                type="submit"
                fullWidth
                variant="contained"
                color="default"
                onClick={signIn}
                className={classes.submit}>
                Sign In
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
            <Grid item xs>
              <Link href="#" variant="body2" className={classes.whiteText}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>

            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}
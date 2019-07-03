import React, { useReducer } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames'
import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp'
import { height } from '@material-ui/system';



const useStyles = makeStyles(theme => ({
    root:{
      width: '100%',
      display: 'flex',
      minHeight: '100vh',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    formWrapper: {
      flexGrow: '1',
      transition: 'flex-grow .5s ease'
    },
    active: {
      [theme.breakpoints.down('sm')]: {
        flexGrow: '3',
        background: 'red'
      }
    },
    inactive: {
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      }
    }
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

  function shouldHideForm(viewMode){
    return state.viewMode === viewMode
  }

  return (
    <div className={classes.root}>

      <div className={classNames([
        classes.formWrapper,
        (state.viewMode === 'signIn'
          ? classes.active
          : classes.inactive)
        ])}>
        <SignIn changeViewMode={()=>{dispatch({type: 'viewSignUp'})}} hideForm={shouldHideForm('signUp')}/>
      </div>

      <div className={classNames([
        classes.formWrapper,
        (state.viewMode === 'signUp'
        ? classes.active
        : classes.inactive)
        ])}>
        <SignUp changeViewMode={()=>{dispatch({type: 'viewSignIn'})}} hideForm={shouldHideForm('signIn')}/>
      </div>

    </div>
  )
}
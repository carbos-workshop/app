import React, { useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames'
import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp'

const useStyles = makeStyles(theme => ({
    root:{
      width: '100%',
      display: 'flex',
      minHeight: '100vh',
      backgroundImage: "url('images/forest.jpg')",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    
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
      }
    },
    inactive: {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      }
    },
    signIn: {
      background: theme.palette.primary.main
    },
    signUp: {

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
    { viewMode: 'signIn' }
  );

  function shouldHideForm(viewMode){
    return state.viewMode === viewMode
  }

  return (
    <div className={classes.root}>
      <div className={classNames([
        classes.formWrapper,
        classes.signUp,
        (state.viewMode === 'signUp'
          ? classes.active
          : classes.inactive)
        ])}>
        <SignUp changeViewMode={()=>{dispatch({type: 'viewSignIn'})}} hideForm={shouldHideForm('signIn')}/>
      </div>

      <div className={classNames([
        classes.formWrapper,
        classes.signIn,
        (state.viewMode === 'signIn'
        ? classes.active
        : classes.inactive)
        ])}>
        <SignIn changeViewMode={()=>{dispatch({type: 'viewSignUp'})}} hideForm={shouldHideForm('signUp')}/>
      </div>
    </div>
  )
}
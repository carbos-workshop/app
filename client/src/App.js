import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';

import lightTheme from './themes/light.theme.js';
import { getAssist } from './services/blocknative.service'
import './App.css';


import Login from './layouts/Login'
import ResetPassword from './layouts/ResetPassword'
import VerifyEmail from './layouts/VerifyEmail'

// /contexts/reducers
import { UserContext, User } from './contexts/user.context'
import { UserReducer } from './contexts/user.reducer'
import { authService } from './services/auth.service.js';

//temp
function Index() {
  return <h2>Logged In Home</h2>;
}

export default class App extends React.Component {

  constructor(props) {
    super(props);

    //copy new user attributes returned by the reducer and re-copy dispatch to the new state
    this.userReducer = (action) => {
      this.setState(
        {
          ...this.state,
          user: UserReducer(this.state.user, action),
          dispatch: this.userReducer
        }
      )
    }

    //need to attach reducer and user attributes to state
    this.state = {
      user: {
        ...User,
        dispatch: this.userReducer
      }
    };
  }

  componentWillMount() {
    //check local storage for logged in user
    let userSession = JSON.parse(localStorage.getItem('user'))
    if (userSession) { 
      if ( authService.authenticate(userSession) ) {
        //not expired
        this.setState({
          ...this.state,
          user: {
            ...this.state.user,
            ...userSession,
          }
        })
      }
      else { 
        console.log('user token expired') 
      }
    }
  }

  async componentDidMount () {
    const assist = getAssist()
    try {
      await assist.onboard()
    } 
    catch (e) {
      console.log('user has not filled requirements yet')
    }
  }

  render(){
    return (
      <Router>
        <React.Fragment>
          <CssBaseline />
          <MuiThemeProvider theme={lightTheme}>
            <UserContext.Provider value={this.state.user}>
              <SnackbarProvider maxSnack={3}>
                
                {/* AUTHENTICATED */}
                <PrivateRoute path="/" exact component={Index} />

                {/* UNAUTHENTICATED */}
                <Route path="/login" component={Login} />
                <Route path="/verifyemail" component={VerifyEmail} />
                <Route path="/forgotpassword" component={ResetPassword} />
                {/* <Route component={NoMatch}/> */}

              </SnackbarProvider>
            </UserContext.Provider>
          </MuiThemeProvider>
        </React.Fragment>
      </Router>
    ) 
  }
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        // try to authenticate based on local storage user
        authService.authenticate() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
}

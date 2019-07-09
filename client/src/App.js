import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import lightTheme from './themes/light.theme.js';
import { getAssist } from './services/blocknative.service'
import './App.css';

import Login from './layouts/Login'


// /contexts/reducers
import { UserContext, User } from './contexts/user.context'
import { UserReducer } from './contexts/user.reducer'

//temp
function Index() {
  return <h2>Home</h2>;
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
    //check cookie for logged in user
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
              <Route path="/" exact component={Index} />
              <Route path="/login" component={Login} />
            </UserContext.Provider>
          </MuiThemeProvider>
        </React.Fragment>
      </Router>
    ) 
  }
}

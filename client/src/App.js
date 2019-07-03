import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import lightTheme from './themes/light.theme.js';
import { getAssist } from './services/blocknative.service'
import './App.css';

import Login from './layouts/Login'

//temp
function Index() {
  return <h2>Home</h2>;
}

export default class App extends React.Component {

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
            {/* <div className="App">
              <Login />
            </div> */}

            <Route path="/" exact component={Index} />
            <Route path="/login" component={Login} />
            {/* <Route path="/forgot-password" component={Users} /> */}
            
          </MuiThemeProvider>
        </React.Fragment>
      </Router>
    ) 
  }
}

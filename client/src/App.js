import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import lightTheme from './themes/light.theme.js';
import { getAssist } from './services/blocknative.service'

import Login from './layouts/Login'

import './App.css';

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
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={lightTheme}>
          <div className="App">
            <Login />
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    ) 
  }
}

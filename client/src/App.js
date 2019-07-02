import React from 'react';
import { getAssist } from './services/blocknative_config'

import Login from './layouts/Login'

import './App.css';

export default class App extends React.Component {

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
      <div className="App">
        <Login />
      </div>
    ) 
  }
}

import React from 'react'

export const User = {
  email: '',
  password: '',
  name: {
    firstname: '',
    lastname: ''
  },
  loggedIn: false,
}

export const UserContext = React.createContext({
  ...User,
  dispatch: () => {}
});
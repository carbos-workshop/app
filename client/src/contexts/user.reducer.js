
//action should be { payload: <ANY>, type: <STRING> }
//returns new uesr object
export const UserReducer = (user, action) => {
  // console.log(action)
  switch (action.type) {
    case 'UPDATE_USER_EMAIL':
      return { 
        ...user, 
        email: action.payload
      }
    case 'UPDATE_USER_PASSWORD':
      return { 
        ...user, 
        password: action.payload
      }
    case 'UPDATE_USER_FIRSTNAME':
      return { 
        ...user, 
        name: {
          ...user.name,
          firstname: action.payload
        }
      }
    case 'UPDATE_USER_LASTNAME':
      return { 
        ...user, 
        name: {
          ...user.name,
          lastname: action.payload
        }
      }
    case 'SET_USER_LOGGEDIN':
      return {
        ...user,
        loggedIn: action.payload
      }
    default:
      throw new Error('Unexpected action');
  }
}
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth'
import Decode from 'jwt-decode'

Amplify.configure({
   Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:53bb52e3-94a8-4c9f-88bc-62f8cca2866f',
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_Jfx0wWkv4',
    // OPTIONAL - Amazon Cognito Web Client ID
    userPoolWebClientId: '3qge8ij5t7k0kcncm6fnnbo1rt',
   }
});

const setUserSession = (user, cognitoResponse) => {
  console.log(cognitoResponse)
  user.loggedIn = true
  user.jwt = cognitoResponse.signInUserSession.accessToken.jwtToken
  localStorage.setItem('user', JSON.stringify(user))
  user.dispatch({type: 'SET_USER_LOGGEDIN', payload: true })
}

export const authService = {

  authenticate: (user) => {
    //if no user passed, check storage for user
    if (!user) {
      user = JSON.parse(localStorage.getItem('user'))
      if (user === null) { return false } //trying to authenticate non logged in user
    }
    console.log('authenticating', user)
    //check not expired jwt
    if (Decode(user.jwt).exp > (Date.now() / 1000)){
      //TODO add other checks on user
      return true
    } else {
      localStorage.clear() //nuke expired user
      return false
    }
  },

  signIn: async(user, remember) => {
    //send AWS auth
    try {
      const signInResponse = await Auth.signIn({
        username: user.email,
        password: user.password,
      })

      if (remember) {
        setUserSession(user, signInResponse)
      }
      else {
        // not setting cookie, just logging in and redirecting
        user.dispatch({type: 'SET_USER_LOGGEDIN', payload: true })
      }
      console.log(signInResponse)
      return signInResponse
    }
    catch (e) {
      console.log('signin error', e)
      return e
    }
  },

  signUp: async(user) => {
    console.log('signing up', user)
    localStorage.clear()//demo any old sessions

    try {
      const signUpResponse = await Auth.signUp({
        username: user.email,
        password: user.password,
        attributes: {
            family_name: user.name.lastname, 
            name: user.name.firstname   
        }
        })
        console.log(signUpResponse)
      // setUserSession(user, signUpResponse) //can't set session beccause no JWT returned until email verfied
      return signUpResponse
    }
    catch (e) {
      console.log('signup error', e)
      return e
    }
    
  },

  logout: async(user) => {
    user.dispatch({type: 'SET_USER_LOGGEDIN', payload: false })
    localStorage.clear()
    return
  }, 

  socialSignIn: async(event) => {
    //TODO
  },

  sendResetPassword: async(email) => {
    try {
      const resetResponse = await Auth.forgotPassword(email);
      return resetResponse

    } catch(e) {
      console.log('send Reset Error', e)
      return { message: e.message }
    }
  },

  confirmPasswordReset: async(email, verificationcode, newpassword) => {
    try{
      let resetResponse = await Auth.forgotPasswordSubmit(
        email,
        verificationcode,
        newpassword
      )
      return resetResponse
      } catch(e) {
        console.log('confim new password error', e)
        return { message: e.message }
      }
  }

}
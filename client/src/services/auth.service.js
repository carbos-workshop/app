import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth'

let firstname = 'Alek'
let lastname = 'Tutchton'
let email = 'atutchton@gmail.com'
let password = '@Nellie31'

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

export const authService = {
  signIn: async(user, remember) => {
    console.log('authservice event', user)
    //send AWS auth
    try {
      const signInResponse = await Auth.signIn({
        username: user.email,
        password: user.password,
      })
      //TODO REMEMBER USER
      console.log('should rememnber this user->', remember)
      console.log(signInResponse)
    }
    catch (e) {
      console.log('signup error', e)
    }
    //TODO
    //set time to live?
    //check if session or local sotrage ie remember me
    // put user info into storage/cookie
    //naigvate the router to '/' or '/' something so that the app can check the cookie again on ComponentWillMount
  },

  signUp: async(user) => {

    try {
      const signUpResponse = await Auth.signUp({
        username: user.email,
        password: user.password,
        attributes: {
            family_name: user.lastname, 
            name: user.firstname   
        }
        })
      console.log(signUpResponse)
    }
    catch (e) {
      console.log('signup error', e)
    }
    
  },

  socialSignIn: event => {
    //TODO
    //time to live?
  }
}
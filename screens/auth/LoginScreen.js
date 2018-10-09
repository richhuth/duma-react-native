import React from 'react';
import {StyleSheet, View, Text, Button, TextInput, ActivityIndicator} from 'react-native';

import fireBaseKeys from './../../constants/ApiKeys';

import * as firebase from 'firebase';



export default class LoginScreen extends React.Component {

  state = {
    email: '',
    password: '',
    authenticating: false,
    user: null,
    error: '',
  }

  static navigationOptions = {
    title: 'SETTINGS',
    headerRight: (
      <Button
        onPress={{}}
        title="Map"
        color="#fff"
      />
    ),
  };


  componentWillMount() {

    const firebaseConfig = {
      apiKey: "AIzaSyA4d8PxEjvUgIxQILw8J1OeyeSwcEU6azo",
      authDomain: "events-83607.firebaseapp.com",
    }

    firebase.initializeApp(firebaseConfig);


  }

  onGoogleSignIn() {


    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }




  onPressSignIn() {
    this.setState({
      authenticating: true,
    });

    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => this.setState({
        authenticating: false,
        user,
        error: '',
      }))
      .catch(() => {
        // Login was not successful
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => this.setState({
            authenticating: false,
            user,
            error: '',
          }))
          .catch((error) => this.setState({
            authenticating: false,
            user: null,
            error: error.message,
          }))
      })
  }

  onPressLogOut() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          email: '',
          password: '',
          authenticating: false,
          user: null,
        })
      }, error => {
        console.error('Sign Out Error', error);
      });
  }

  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    if (this.state.user !== null) {
      return (
        <View style={styles.form}>
          <Text>Logged In</Text>
          <Button title='Log Out' onPress={() => this.onPressLogOut()} />
        </View>
      )
    }

    return (
      <View style={styles.form}>
        <TextInput
          placeholder='Enter your email...'
          label='Email'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder='Enter your password...'
          label='Password'
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title='Login' onPress={() => this.onPressSignIn()} />

        <Button title='Sign in with google' onPress={() => this.onGoogleSignIn()} />
        <Text>{this.state.error}</Text>
      </View>
    )

  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCurrentState()}
      </View>
    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  form: {
    flex: 1
  }
});

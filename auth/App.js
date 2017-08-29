import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import LoginForm from './components/LoginForm';
import { Header, Button, Spinner } from './components/common';

export default class App extends React.Component {
  state = { loggedIn: null }

  componentWillMount() {
      firebase.initializeApp({
      
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false});
      }
    });
  
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out 
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large' />;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Header headerText="  Authentication  " />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

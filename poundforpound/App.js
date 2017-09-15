import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import LandingScreen from './screens/LandingScreen';
import CreateRoutine from './screens/CreateRoutine';
import HomeScreen from './screens/HomeScreen';
import Auth from './screens/Auth';
import WelcomeScreen from './screens/WelcomeScreen';
import store from './store';

export default class App extends React.Component {
  componentWillMount(){
      const config = {
      apiKey: "AIzaSyARE_ctk6fbmjGxjmo2XGExqImpz-UnHUM",
      authDomain: "poundforpound-4347f.firebaseapp.com",
      databaseURL: "https://poundforpound-4347f.firebaseio.com",
      projectId: "poundforpound-4347f",
      storageBucket: "poundforpound-4347f.appspot.com",
      messagingSenderId: "1029955437461"
    };
    firebase.initializeApp(config);
  }
  render() {
    const MainNavigator = StackNavigator({
      homescreen: {screen: HomeScreen},
      welcome: { screen: WelcomeScreen },
      auth: { screen: Auth },
      home: { screen: LandingScreen },
      create: { screen: CreateRoutine },
    });
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    justifyContent: 'center',
    
  },
});
{/*<Provider store={store}>
          <MainNavigator />
      </Provider>*/}
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import LoginForm from './components/LoginForm';
import reducers from './reducers';


const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default class App extends React.Component {

  componentWillMount() {
      const config = {
      apiKey: "AIzaSyAKMp7fJoCzqKp60MbXZdslJHMJi6IveDo",
      authDomain: "workout-2b867.firebaseapp.com",
      databaseURL: "https://workout-2b867.firebaseio.com",
      projectId: "workout-2b867",
      storageBucket: "workout-2b867.appspot.com",
      messagingSenderId: "1042327629218"
    };
    firebase.initializeApp(config);
  }
  render() {
    return (
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

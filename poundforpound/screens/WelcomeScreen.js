import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import _ from 'lodash';
import { AppLoading } from 'expo';

const SLIDE_DATA = [
    { text: 'Welome to Job App', color: "#03A9F4"},
    { text: 'Use this to get a job', color: "#009688" },
    { text: 'Set your location and swipe away', color: "#03A9F4" }
];


class WelcomeScreen extends Component {
    state = { token: null }

    async componentWillMount() {
        let token = await AsyncStorage.getItem('fb_token');

        if (token){
            this.setState({ token });
            this.props.navigation.navigate('auth');
            
        }else{
            this.setState({ token: false });
        }
    }

    render() {
        if((_.isNull(this.state.token))){
            this.props.navigation.navigate('auth');
        }
        return (
            <AppLoading />
        );
    };
}

export default WelcomeScreen;
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';
import _ from 'lodash';
import { AppLoading } from 'expo';

const SLIDE_DATA = [
    { text: 'Welome to Job App', color: "#03A9F4"},
    { text: 'Use this to get a job', color: "#009688" },
    { text: 'Set your location and swipe away', color: "#03A9F4" }
];

class WelcomeScreen extends Component {
    state = { token: null }
    onSlidesComplete= () => {
        this.props.navigation.navigate('auth');
    }

    async componentWillMount() {
        let token = await AsyncStorage.getItem('fb_token');

        if (token){
            this.props.navigation.navigate('map');
            this.setState({ token });
        }else{
            this.setState({ token: false });
        }
    }

    render() {
        if(_.isNull(this.state.token)){
            return <AppLoading/>
        }
        return (
            <Slides data={ SLIDE_DATA} onComplete={this.onSlidesComplete}/>
        );
    }
}

export default WelcomeScreen;
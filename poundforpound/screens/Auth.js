import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Auth extends Component {
   async componentDidMount(){
        await this.props.facebookLogin();
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('home');
        }
    }

    render() {
        return (
            <View/>
        );
    }
}

function mapStateToProps({auth}){
    return { token: auth.token};
}

export default connect(mapStateToProps, actions)(Auth);
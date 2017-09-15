import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Profile extends Component{
    render(){
        console.log('Profile')
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle} >In Profile</Text>
            </View>
        );
    }
}

const styles = {
    container : {
        flex: 1,
        zIndex: 10,
        justifyContent: 'center'
    },
    textStyle : {
        color: 'white',
        fontSize: 20,
        fontWeight: '300'
    }
}
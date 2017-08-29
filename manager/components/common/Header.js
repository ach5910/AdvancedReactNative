import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Header extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>  {this.props.headerText}  </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20
    },
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        paddingTop: 15,
        elevation: 10,
        position: 'relative'
    }
});

export { Header };
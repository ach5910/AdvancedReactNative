import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

class ReviewScreen extends Component {
    //static prop add to class and not instance
    //color = red
    // rev = new ReviewScreen 
    // rev.color = undefined 
    // ReviewScreen.color = red
    static navigationOptions = {
        title: 'Review Jobs',
        header: ({ navigate }) => {
            return {
                right: <Button title="Settings" onPress={() => navigate('settings')}/> 
            };
        }
    }
    render() {
        return (
            <View>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
            </View>
        );
    }
}

export default ReviewScreen;
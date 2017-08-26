import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-101c7.cloudfunctions.net';

class SignUpForm extends Component {
    // The following are equal in ES7
    // constructor(props){
    //     super(props);

    //     this.state = { phone: '' };
    // }
    // AND
    // state = { phone: '' }
    state = { phone: '' };

    //The following two are equal in new ES2017 syntax
    //onPress={this.handleSubmit.bind(this)}
    // handleSubmit(){
    //}
    // AND
    //onPress={this.handleSubmit} 
    // handleSubmit = () => {
    //}

    handleSubmit= async () => {
        // async await
        // await - does not change how javascript behaves
        // it says after line is executed it will return a promise and will not run the next
        // line until the promise has been resolved
        try {
            await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone })    
            await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
        } catch (err){
            console.log(err);
        }
    }

    // handleSubmit= () => {
    //     // async await
    //     axios.post(`${ROOT_URL}/createUser`, {
    //         phone: this.state.phone
    //     })
    //         .then(() => {
    //             axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
    //         })
    // }

    render() {
        return (
            <View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Phone Number</FormLabel>
                    <FormInput
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                    />
                </View>
                <Button onPress={this.handleSubmit} title='Submit' />
            </View>
        );
    }
}

export default SignUpForm;
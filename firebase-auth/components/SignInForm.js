import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-one-time-password-101c7.cloudfunctions.net';

class SignInForm extends Component {
    state = { phone: ' ', code: '' };

    componentDidMount() {
        const config = {
            apiKey: "AIzaSyApvFm31zK1yHiPj0VcOY4P8lMtwHDyig8",
            authDomain: "one-time-password-101c7.firebaseapp.com",
            databaseURL: "https://one-time-password-101c7.firebaseio.com",
            projectId: "one-time-password-101c7",
            storageBucket: "one-time-password-101c7.appspot.com",
            messagingSenderId: "937203736707"
        };
        firebase.initializeApp(config)
    }

    handleSubmit = async () => {
        try {
            
            let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
                phone: this.state.phone, code: this.state.code
            });
            
            firebase.auth().signInWithCustomToken(data.token);
        } catch(err) {
            console.log(err);
        }
    }

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
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Code</FormLabel>
                    <FormInput
                        value={this.state.code}
                        onChangeText={code => this.setState({ code })}
                    />
                </View>
                <Button onPress={this.handleSubmit} title='Submit' />
            </View>
        );
    }
}

export default SignInForm;
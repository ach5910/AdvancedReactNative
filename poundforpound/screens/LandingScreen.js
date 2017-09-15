import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button, CardSection, Card } from '../components/common';
import { SearchBar } from 'react-native-elements';
import { updateRoutine, createRoutine } from '../actions'
import RoutineList from '../components/RoutineList';
import axios from 'axios';
class LandingScreen extends Component {
    static navigationOptions = {
        title: 'Create Workout',
        headerTintColor: 'lightblue',
        headerStyle: { marginTop: Platform.OS === 'android' ? 24 : 0 }
    }
    onButtonPress(){
        const { routineName } = this.props;
        this.props.createRoutine(routineName);
        this.props.navigation.navigate('create');
    }
    
    render(){
        return (
            <Card style={styles.containerStlye}>
                
                    <SearchBar
                        lightTheme
                        round
                        onChangeText={(text) => this.props.updateRoutine({routineName: text})}
                        placeholder='Type Here...'
                    />
                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            'Create New Routine'
                        </Button>
                    </CardSection>
                    
            </Card>
        )
    }
}

const styles = {
    containerStlye: {
        justifyContent: 'center',  
    }
}

const mapStateToProps = (state) => {
    const { routineName } = state.routineForm || '';

    return { routineName }
}
export default connect(mapStateToProps, {updateRoutine, createRoutine})(LandingScreen);
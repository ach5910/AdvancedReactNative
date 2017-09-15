import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Card, CardSection, Input, Button } from '../components/common';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import ExerciseList from '../components/ExerciseList';
import RoutineExerciseList  from '../components/RoutineExerciseList';
import { updateExercise, createExercise, exercisesFetch } from '../actions';
class CreateRoutine extends Component{
    static navigationOptions = {
        title: "  Create Routine  ",
        headerTintColor: 'lightblue',
        headerStyle: { marginTop: Platform.OS === 'android' ? 24 : 0 }
    }
    

    fillRoutine(){
        const { r_uid } = this.props;
        if (r_uid){
            return (
                <RoutineExerciseList />
            )
        }else{
            return(
                <Text>No Exercises</Text>
            )
        }
    }

    render(){
        return (
            <View>
                <Card style={styles.containerStlye}>
                    
                        <SearchBar
                            lightTheme
                            round
                            onChangeText={(exerciseName) => this.props.updateExercise({exerciseName})}
                            placeholder='Type Here...'
                        />
                    
                    <ExerciseList />
                </Card>
                
                {this.fillRoutine()}
                
                

            </View>
        )
    }
}

const styles = {
    containerStlye: {
        justifyContent: 'center',  
    }
}

const mapStateToProps = (state) => {
    const { exerciseName, exercises, r_uid } = state.routineForm || '';
    return { exerciseName, exercises, r_uid}
}
export default connect(mapStateToProps, {updateExercise, createExercise, exercisesFetch })(CreateRoutine);
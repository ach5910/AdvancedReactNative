import React, { Component} from 'react';
import _ from 'lodash';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import { exercisesFetch, createExercise, addExerciseToRoutine } from '../actions'

class ExerciseList extends Component{
    state ={ isListEmpty: false }
    componentWillMount(){
        this.props.exercisesFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.createDataSource(nextProps)
    }

    createDataSource({ exercises, exerciseName }){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        const filter = exerciseName ? exerciseName.exerciseName : '';
        const matchesFilter = new RegExp(filter, "i");
        exercises = exercises.filter(exercise => !filter || matchesFilter.test(exercise.exerciseName))
        if (exercises.length === 0){
            this.setState({
                isListEmpty: true
            });
        }else{
            this.setState({
                isListEmpty: false
            })
        }
        this.dataSource = ds.cloneWithRows(exercises);
    }

    renderRow(exercise){
        return (
            <CardSection>
                <Text>{exercise.exerciseName.exerciseName}</Text>
            </CardSection>
        )
    }

    onButtonPress(){
        const { exerciseName, r_uid } = this.props;
        console.log('RUID');
        console.log(r_uid);
        this.props.createExercise(exerciseName, r_uid);
        // this.props.addExerciseToRoutine( exerciseName, r_uid);
    }
    displayItems(){
        const { exercises } = this.props;
        if (this.state.isListEmpty){
            console.log('return button');
            return (
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        'Create New Exercise'
                    </Button>
                </CardSection>
            )
        }else{
            console.log('return listview')
            console.log(this.dataSource)
            return (
                <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
                />
            )
        }
    }
    render(){
        return (
            <Card style={styles.containerStlye}>
                {this.displayItems()}
            </Card>
            
        )
    }
}
const styles = {
    containerStlye: {
        justifyContent: 'center',  
    }
}
const mapStateToProps = state => {
    const exercises = _.map(state.exercises, (val, uid) => {
        return { ...val, uid}
    });
    const { exerciseName, r_uid } = state.routineForm || '';
    return { exercises, exerciseName, r_uid };
}
export default connect(mapStateToProps, {exercisesFetch, createExercise, addExerciseToRoutine})(ExerciseList);
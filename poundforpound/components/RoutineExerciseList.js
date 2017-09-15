import React, { Component} from 'react';
import _ from 'lodash';
import { View, Text, ListView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import ExerciseItem from './ExerciseItem';
import ExerciseSets from './ExerciseSets';
import { fetchRoutineExercises, createExercise, addExerciseToRoutine } from '../actions'

class RoutineExerciseList extends Component{
    state ={ isListEmpty: false, expanded: false }

    componentWillMount(){
        const { r_uid } =  this.props;
        this.props.fetchRoutineExercises(r_uid);
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.createDataSource(nextProps)
    }

    createDataSource({ exercises, exerciseName }){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(exercises);
    }

    updateSets({prop, value, ex_name}){
        const { exercises } = this.props;
        const exercise = _.find(exercises, (exer) => { return exer.exerciseName.exerciseName === ex_name})
        console.log('UpdateSets: uid'  + exercise.uid);
    }
    _onPress(){
        console.log('_onPress')
    }
    renderRow(exercise){
        console.log('Render Row - exercise: ' + exercise.uid)
        const { r_uid } = this.props;
        console.log('renderRow r_uid : ' + r_uid);
        return (
            <ExerciseSets exercise={exercise} r_uid={r_uid}/>
        )
        // if (exercise && r_uid){
        //     return <ExerciseItem exercise={exercise} />;
        // }else{
        //     return <Text>Nope</Text>;
        // }
        
    }


    render(){
        return (
            
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow.bind(this)}
            />
        
            
        )
    }
}
const styles = {
    containerStlye: {
        flex: 1,
        justifyContent: 'center', 
    },
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }, center: {
        justifyContent: 'center'
    }, setsContainerStyle: {
        justifyContent: 'space-around'
    }, setsTextStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
}
const mapStateToProps = state => {
    const exercises = _.map(state.routineExercises, (val, uid) => {
        return { ...val, uid}
    });
    const { exerciseName, r_uid } = state.routineForm || '';
    return { exercises, exerciseName, r_uid };
}
export default connect(mapStateToProps, {fetchRoutineExercises, createExercise, addExerciseToRoutine})(RoutineExerciseList);


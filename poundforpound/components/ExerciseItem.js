import React, { Component} from 'react';
import _ from 'lodash';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import { fetchExerciseSets, addSetToExercise, updateReps, updateWeight } from '../actions'

class ExerciseItem extends Component{
    state ={ isListEmpty: false }
    componentWillMount(){
        const { r_uid, exercise } =  this.props;
        console.log('ExerciseItem ComponentWillMount ' + exercise);
        console.log('ExerciseItem CompWM r_uid :' + r_uid);
        this.props.fetchExerciseSets(r_uid, exercise.uid);
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.createDataSource(nextProps)
    }

    createDataSource({ exercise }){
        const { sets } = exercise;
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(sets);
    }

    renderRow(set){
        const { r_uid } = this.props;
        const { uid } = this.props.exercise;
        return (
            <CardSection>
                <Input 
                    label='Weight'
                    value={set.weight}
                    onChangeText={text => this.props.updateWeight({r_uid, uid, s_uid: set.uid, weight: text})}
                />
                <Input
                    lable='Reps'
                    value={set.reps}
                    onChangeText={text => this.props.updateReps({r_uid, uid, s_uid: set.uid ,reps: text})}
                />
            </CardSection>
        )
    }
    onButtonPress(){
        const { r_uid } = this.props;
        const { uid } = this.props.exercise;

        this.props.addSetToExercise(r_uid, uid);
     }


    render(){
        return (
            <View>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
                <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            'Add Set'
                        </Button>
                </CardSection>
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
    const { r_uid } = state.routineForm || '';
    return { r_uid }
}
export default connect(mapStateToProps, { fetchExerciseSets, addSetToExercise, updateReps, updateWeight })(ExerciseItem);
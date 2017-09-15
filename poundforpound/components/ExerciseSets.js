import React, { Component} from 'react';
import _ from 'lodash';
import { View, Text, ListView, TouchableHighlight, TouchableOpacity, Modal} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Card, CardSection, Button, Input } from './common';
import { fetchExerciseSets, addSetToExercise, updateReps, updateWeight, updateSet } from '../actions'

const seen = [];

class ExerciseSets extends Component{
    constructor(props){
        super(props);
        this.state = {expanded: false, showModal: false, weight: '', reps: '', set_num: ''};
        this.expandSet = this.expandSet.bind(this);
        this.onAccept = this.onAccept.bind(this);
        this.onDecline = this.onDecline.bind(this);
    }
    replacer = (key, value) => {
        if(value != null && typeof value == 'object'){
            if(seen.indexOf(value) >= 0){
                return;
            }
            seen.push(value);
        }
        return value;
    };
    handleOnPress(set_num, weight, reps){
        console.log('hanglepress : ' + set_num + ' ' + weight + '  ' + reps);
        this.setState({
            weight: weight,
            reps: reps,
            set_num: set_num,
            showModal: true
        });
        // console.log('handleonpress :' + JSON.stringify(obj, this.replacer));

    }

    onAccept(){
        const { uid } = this.props.exercise;
        const { r_uid } = this.props;
        const _weight = 'weight_' + (this.state.set_num - 1);
        const _reps = 'reps_' + (this.state.set_num - 1);
        console.log('Accept   ' + _weight + '  ' + _reps + '  ' + uid + "  " + r_uid);
        const new_set = {w_prop: _weight, w_value: this.state.weight, r_prop: _reps, r_value: this.state.reps}
        this.props.updateSet(new_set, uid, r_uid);
        this.setState({
            weight: '',
            reps: '',
            set_num: '',
            showModal: false
        });
    }

    onDecline(){
        this.setState({
            weight: '',
            reps: '',
            set_num: '',
            showModal: false
        });
    }
    renderSets(){
        const { exercise } = this.props;
        if (this.state.expanded){
            return(
                
                <View>
                    <TouchableOpacity onPress={() => this.handleOnPress(1, exercise.weight_0, exercise.reps_0)}>
                        <CardSection style={styles.setsContainerStyle}>
                            <Text style={styles.setsTextStyle}>Weight: {exercise.weight_0}  </Text>
                            <Text style={styles.setsTextStyle}>Reps: {exercise.reps_0}  </Text>
                        </CardSection>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleOnPress(2, exercise.weight_1, exercise.reps_1)}>
                        <CardSection style={styles.setsContainerStyle}>
                            <Text style={styles.setsTextStyle}>Weight: {exercise.weight_1}  </Text>
                            <Text style={styles.setsTextStyle}>Reps: {exercise.reps_1}  </Text>
                        </CardSection>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleOnPress(3, exercise.weight_2, exercise.reps_2)}>
                        <CardSection style={styles.setsContainerStyle}>
                            <Text style={styles.setsTextStyle}>Weight: {exercise.weight_2}  </Text>
                            <Text style={styles.setsTextStyle}>Reps: {exercise.reps_2}  </Text>
                        </CardSection>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleOnPress(4, exercise.weight_3, exercise.reps_3)}>
                        <CardSection style={styles.setsContainerStyle}>
                            <Text style={styles.setsTextStyle}>Weight: {exercise.weight_3}  </Text>
                            <Text style={styles.setsTextStyle}>Reps: {exercise.reps_3}  </Text>
                        </CardSection>
                    </TouchableOpacity>
                    
                </View>
            )         
        }
    }
    expandSet(){
        console.log('Item Pressed')
        if (this.state.expanded){
            console.log('True')

        } else {
            console.log('False')
        }

        this.setState({
            expanded: !this.state.expanded
        });
    }
    render(){
        const { exercise } = this.props;
        console.log('ExerciseSEts uid: ' + exercise.uid);
        const iconName = this.state.expanded ? 'chevron-up' : 'chevron-down';
        return (
                
                    <Card style={styles.containerStlye}>
                        <CardSection style={styles.center}>
                            <TouchableOpacity onPress={this.expandSet.bind(this)}>
                                <Icon name={iconName} type='font-awesome' />
                            </TouchableOpacity>
                            <Text style={styles.textStyle}>Exercise: {exercise.exerciseName.exerciseName}</Text>
                        </CardSection>
                        {this.renderSets()}
                        <Modal 
                            animationType='slide'
                            transparent={false}
                            visible={this.state.showModal}
                            onRequestClose={() => {}}
                        >
                            <Card style={styles.modalContainerStyle}>
                                <CardSection style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={styles.textStyle}>Set {this.state.set_num}</Text>
                                </CardSection>
                                <CardSection style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Input 
                                        label='Weight'
                                        value={this.state.weight}
                                        onChangeText={text => this.setState({ weight: text })}
                                    />
                                </CardSection>
                                <CardSection style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Input 
                                        label='Reps'
                                        value={this.state.reps}
                                        onChangeText={text => this.setState({ reps: text})}
                                    />
                                </CardSection>
                                <CardSection>
                                    <Button onPress={this.onAccept}>Yes</Button>
                                    <Button onPress={this.onDecline}>No</Button>
                                </CardSection>
                            </Card>
                        </Modal>
                    </Card>
            
        )
    }
}
const styles = {
    containerStlye: {
        flex: 1,
        justifyContent: 'center', 
    },
    textStyle: {
        flex: 1,
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 40
    }, center: {
        height: 60,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }, setsContainerStyle: {
        justifyContent: 'space-around'
    }, setsTextStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }, iconStyle: {
        flex: 1,
        alignSelf: 'center',
        color: '#007aff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10
    },modalContainerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
}

// const mapStateToProps = (state) => {
//     const { r_uid } = state.routineForm || '';
//     return { r_uid }
// }
export default connect(null, {updateSet})(ExerciseSets);
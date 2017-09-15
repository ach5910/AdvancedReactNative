import React, { Component} from 'react';
import _ from 'lodash';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import { routinesFetch } from '../actions'

class RoutineList extends Component{
    state ={ isListEmpty: false }
    componentWillMount(){
        this.props.routinesFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.createDataSource(nextProps)
    }

    createDataSource({ routines, routineName }){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        const filter = routineName ? routineName.routineName : '';
        const matchesFilter = new RegExp(filter, "i");
        routines = routines.filter(routine => !filter || matchesFilter.test(routine.routineName))
        if (routines.length === 0){
            this.setState({
                isListEmpty: true
            });
        }else{
            this.setState({
                isListEmpty: false
            })
        }
        this.dataSource = ds.cloneWithRows(routines);
    }

    renderRow(routine){
        return (
            <CardSection>
                <Text>{routine.routineName}</Text>
            </CardSection>
        )
    }

    _onButtonPress(){
        this.props.onButtonPress();
    }

    displayItems(){
        const { routines } = this.props;
        if (this.state.isListEmpty){
            console.log('return button');
            return (
                <CardSection>
                    <Button onPress={this._onButtonPress.bind(this)}>
                        'Create New Routine'
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
                renderRow={this.renderRow.bind(this)}
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
    const routines = _.map(state.routines, (val, uid) => {
        return { ...val, uid}
    });
    const { routineName } = state.routineForm || '';
    return { routines, routineName};
}
export default connect(mapStateToProps, {routinesFetch })(RoutineList);
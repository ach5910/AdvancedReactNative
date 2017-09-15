import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';

import ListItem from './ListItem';
import { employeesFetch } from '../actions';

class EmployeeList extends Component{
    componentWillMount(){
        this.props.employeesFetch();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        // nextProps are the next set of props that this componen
        // will be rendered with. this.props is still the ild set of props 
        this.createDataSource(nextProps);
    }

    createDataSource({ employees }){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(employees);
    }

    renderRow(employee) {
        return <ListItem employee={employee} />
    }
    render(){
        return (
            <ListView 
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        )
    }
}
const mapStateToProps = state => {
    // state.employees is an object with many key value pairs
    // for each kv pair run arrow function, called with each val and key
    //  create a new obj, push in all the values and throw the id ontop 
    // { shift: 'Monday', name: 'Mike', phone: '555-5555', id: '234234333' }
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid}
    });
    console.log('Before mp')
    console.log(employees)
    console.log('After map')
    return { employees };
}
export default connect(mapStateToProps, {employeesFetch})(EmployeeList);
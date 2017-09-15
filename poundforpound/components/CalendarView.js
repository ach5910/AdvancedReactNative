
// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet
// } from 'react-native';
// import {Agenda} from 'react-native-calendars';

// export default class AgendaScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: {}
//     };
//   }

//   render() {
//     return (
//       <Agenda
//         items={this.state.items}
//         loadItemsForMonth={this.loadItems.bind(this)}
//         selected={'2017-05-16'}
//         renderItem={this.renderItem.bind(this)}
//         renderEmptyDate={this.renderEmptyDate.bind(this)}
//         rowHasChanged={this.rowHasChanged.bind(this)}
//         //markingType={'interactive'}
//         //markedDates={{
//         //  '2017-05-08': [{textColor: '#666'}],
//         //  '2017-05-09': [{textColor: '#666'}],
//         //  '2017-05-14': [{startingDay: true, color: 'blue'}, {endingDay: true, color: 'blue'}],
//         //  '2017-05-21': [{startingDay: true, color: 'blue'}],
//         //  '2017-05-22': [{endingDay: true, color: 'gray'}],
//         //  '2017-05-24': [{startingDay: true, color: 'gray'}],
//         //  '2017-05-25': [{color: 'gray'}],
//         //  '2017-05-26': [{endingDay: true, color: 'gray'}]}}
//         // monthFormat={'yyyy'}
//         // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
//         //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
//       />
//     );
//   }

//   loadItems(day) {
//     setTimeout(() => {
//       for (let i = -7; i < 21; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = this.timeToString(time);
//         if (!this.state.items[strTime]) {
//           this.state.items[strTime] = [];
//           const numItems = Math.floor(Math.random() * 5);
//           for (let j = 0; j < numItems; j++) {
//             this.state.items[strTime].push({
//               name: 'Item for ' + strTime,
//               height: Math.max(50, Math.floor(Math.random() * 150))
//             });
//           }
//         }
//       }
//       //console.log(this.state.items);
//       const newItems = {};
//       Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
//       this.setState({
//         items: newItems
//       });
//     }, 1000);
//     // console.log(`Load Items for ${day.year}-${day.month}`);
//   }

//   renderItem(item) {
//     return (
//       <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
//     );
//   }

//   renderEmptyDate() {
//     return (
//       <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
//     );
//   }

//   rowHasChanged(r1, r2) {
//     return r1.name !== r2.name;
//   }

//   timeToString(time) {
//     const date = new Date(time);
//     return date.toISOString().split('T')[0];
//   }
// }

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: 'transparent',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17
//   },
//   emptyDate: {
//     height: 15,
//     flex:1,
//     paddingTop: 30
//   }
// });
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import {Calendar} from 'react-native-calendars';

export default class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        
        <Calendar
          hideExtraDays
          style={styles.calendar}
          current={'2012-05-16'}
          minDate={'2012-05-10'}
          markingType={'interactive'}
          theme={{
            calendarBackground: 'transparent',
            textSectionTitleColor: 'white',
            dayTextColor: 'white',
            todayTextColor: 'white',
            selectedDayTextColor: 'white',
            monthTextColor: 'white',
            selectedDayBackgroundColor: 'transparent',
            arrowColor: 'white'
          }}
          markedDates={{
            '2012-05-08': [{textColor: 'white'}],
            '2012-05-09': [{textColor: 'white'}],
            '2012-05-14': [{startingDay: true, color: 'blue'}, {endingDay: true, color: 'blue'}],
            '2012-05-21': [{startingDay: true, color: 'blue'}],
            '2012-05-22': [{endingDay: true, color: 'gray'}],
            '2012-05-24': [{startingDay: true, color: 'gray'}],
            '2012-05-25': [{color: 'gray'}],
            '2012-05-26': [{endingDay: true, color: 'gray'}]}}
          hideArrows={false}
        />
      </ScrollView>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: 'transparent',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: 'transparent'
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});
{/*<Text style={styles.text}>Calendar with selectable date and arrows</Text>
        <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={{[this.state.selected]: {selected: true}}}
        />
        <Text style={styles.text}>Calendar with marked dates and hidden arrows</Text>
        <Calendar
          style={styles.calendar}
          current={'2012-05-16'}
          minDate={'2012-05-10'}
          maxDate={'2012-05-29'}
          firstDay={1}
          markedDates={{
            '2012-05-24': {selected: true, marked: true},
            '2012-05-25': {marked: true},
            '2012-05-26': {disabled: true}
          }}
          hideArrows={true}
        />
        <Text style={styles.text}>Calendar with marked dates and spinner</Text>*/}
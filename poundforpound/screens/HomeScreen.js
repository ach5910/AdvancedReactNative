import React, { Component } from 'react';
import { View, Platform, Image, Dimensions, Text, TouchableHighlight} from 'react-native';
import { Avatar, Tabs, Tab, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo';
import AnalyticsView from '../components/AnalyticsView';
import CalendarView from '../components/CalendarView';
import LeaderBoard from '../components/LeaderBoard';
const { height, width } = Dimensions.get('window');

export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'LeaderBoard'
    }
  }

  changeTab(selectedTab) {
    this.setState({
      selectedTab
    });
  }
  static navigationOptions = {
        title: 'PoundForPound',
        headerLeft: <Icon color={'white'} type='simple-line-icon' name='menu' size={32} />,
        headerRight: <Icon color={'white'} type='simple-line-icon' name='settings' size={32} />,
        headerTintColor: '#fff',
        headerTitleStyle: { alignSelf: 'stretch' },
        headerStyle: {flex: 1, justifyContent: 'center',position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: Platform.OS === 'android' ? 24 : 0, left: 0, right: 0, height: 60 }
    }
  renderTabs(){
    const { selectedTab } = this.state;
    const tabNames = ['LeaderBoard', 'Calendar', 'Analytics'];
    const iconNames = ['trophy','calendar', 'chart'];
    let tabs = [];
    for(let i = 0; i < 3; i++){
      tabs.push(
      
        <TouchableHighlight style={{flex: 1}}key={tabNames[i]} onPress={() => this.changeTab(tabNames[i])}>
          <View style={styles.tabStyle}>
              <Icon containerStyle={{justifyContent:'center', alignItems: 'center'}} color={"white"} name={iconNames[i]} type='simple-line-icon' size={30} />
              {selectedTab === tabNames[i] ? <Text style={styles.iconTabTitle}>{tabNames[i]}</Text> : null}
          </View>
        </TouchableHighlight>)
    }
    return tabs;

  }

  renderScene(){
    const { selectedTab } = this.state;

    if (selectedTab === 'LeaderBoard'){
      return <LeaderBoard />;
    }else if(selectedTab === 'Calendar'){
      return <CalendarView />;
    }
    return <AnalyticsView />;
  }
  render() {
    const { selectedTab } = this.state;
    return (
      <View style={{flex: 1, justifyContent:'flex-start'}}>
        <View style={styles.row}>
          <TouchableHighlight onPress={() => {}} stlye={{height: 90, width: 90, borderRadius: 45, justifyContent: 'center', alignItems: 'center', marginLeft: 20}}>
            <Image 
              source={require('../assets/medium_ahunt.jpg')}
              style={{ borderWidth:1, borderColor: 'white', height: 90, width: 90, borderRadius: 45}}
            />
          </TouchableHighlight>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileNameText}>Aaron Hunt</Text>
            <Text style={styles.profileScoreText}>Score: 2,050</Text>
          </View>
        </View>
    
          <View style={styles.tabContainer}>
            <View style={styles.tabBarStyle}>
              {this.renderTabs()}
            </View>
            {this.renderScene()}
          </View>
       
        
          
        
            <LinearGradient
              colors={[  '#C33764', '#1D2671']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: -1
              }}
            />
      </View>
    );
  }
}

const styles = {
  row : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 100,
    backgroundColor: 'transparent',
    marginBottom: 10,
    width: width
  },
  profileInfoContainer: {
    paddingTop: 10,
    marginLeft: 30
  },
  tabBarStyle: {
    height: 50,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 2
  },
  profileNameText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '200'
  },
  profileScoreText: {
    color: 'white',
    fontSize: 15
  },
  tabStyle : {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  }, tabContainer: {
    flex: 4,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  }, iconTabTitle: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'stretch'
  }
}

{/*<Tabs
          tabBarStyle={[styles.tabStyle, {marginLeft: 20, marginRight: 20, marginTop: 12, paddingTop: 0, paddingBottom: 0, borderColor: 'transparent'}]} 
          style={ [styles.tabStyle, {marginLeft: 10, marginRight: 10, marginTop: 12, paddingTop: 0, paddingBottom: 0, borderColor: 'transparent'}]}
          sceneStyle={{flex: 1,position: 'relative', paddingBottom: 0, marginTop: 25}}
          >
            <Tab
              tabStyle={styles.tabStyle}
              titleStyle={{color: 'white', fontWeight: 'bold', fontSize: 10}}
              selectedTitleStyle={{color: 'white', fontWeight: 'bold',marginTop: -1, marginBottom: 6}}
              selected={selectedTab === 'LeaderBoard'}
              title={selectedTab === 'LeaderBoard' ? 'LEADERBOARD' : null}
              renderIcon={() => <Icon containerStyle={{justifyContent:'center', alignItems: 'center', marginTop: 17}} color={"#E2E2E2"} name='trophy-outline' type='material-community' size={33} />}
              renderSelectedIcon={() => <Icon color={'white'} name='trophy-outline' type='material-community' size={30} />}
              onPress={() => this.changeTab('LeaderBoard')}
            >
            {'LeaderBoard' === selectedTab ? <LeaderBoard /> : null}
            </Tab>
            <Tab
              tabStyle={styles.tabStyle}
              titleStyle={{color: 'white', fontWeight: 'bold', fontSize: 10}}
              selectedTitleStyle={{color: 'white', fontWeight: 'bold', marginTop: -1, marginBottom: 3}}
              selected={selectedTab === 'Calendar'}
              title={selectedTab === 'Calendar' ? 'CALENDAR' : null}
              renderIcon={() => <Icon containerStyle={{justifyContent:'center', alignItems: 'center', marginTop: 17}} color={"#E2E2E2"} name='calendar' type='material-community' size={33} />}
              renderSelectedIcon={() => <Icon color={'white'} name='calendar' type='material-community' size={30} />}
              onPress={() => this.changeTab('Calendar')}
              >
              {'Calendar' === selectedTab ? <CalendarView /> : null}
            </Tab>
            <Tab
              tabStyle={styles.tabStyle}
              titleStyle={{color: 'white', fontWeight: 'bold', fontSize: 10}}
              selectedTitleStyle={{color: 'white', fontWeight: 'bold', marginTop: -1, marginBottom: 6}}
              selected={selectedTab === 'Analytics'}
              title={selectedTab === 'Analytics' ? 'ANALYTICS' : null}
              renderIcon={() => <Icon containerStyle={{justifyContent:'center', alignItems: 'center', marginTop: 17}} color={"#E2E2E2"} name='chart-line'  type='material-community' size={33} />}
              renderSelectedIcon={() => <Icon color={'white'} name='chart-line'  type='material-community' size={30} />}
              onPress={() => this.changeTab('Analytics')}
              >
              {'Analytics' === selectedTab ? <AnalyticsView /> : null}
            </Tab>
          
          </Tabs>*/}

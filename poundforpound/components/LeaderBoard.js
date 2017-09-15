import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Divider } from 'react-native-elements';

const groupData = [{name:'Aaron', image: require('../assets/medium_ahunt.jpg'), cards: '4', points: '2050'},
                    {name: 'Greg', image: require('../assets/greg_schmidt.jpg'), cards: '5', points: '1190'},
                    {name: 'Louis', image: require('../assets/louis_amezquita.jpg') , cards: '1', points: '1180'}]
export default class LeaderBoard extends Component{
    
    renderLeaderBoard(){
        return (
            groupData.map((person, index) => {
                return(            
                    <View key={index} style={[styles.row, {borderTopWidth: 2, borderTopColor:'white'}]}>
                        <Image
                            source={person.image}
                            style={{height: 40, width: 40, borderWidth: 1, borderColor: 'white', borderRadius: 20}}
                        />
                        <View style={{alignSelf: 'stretch'}}>
                            <Text numberOfLines={1} style={styles.textStyle}>{person.name}</Text>
                        </View>
                        <View style={{alignSelf: 'stretch'}}>
                        <Text numberOfLines={1} style={styles.textStyle}>Cards: {person.cards}</Text>
                        </View>
                        <View style={{alignSelf: 'stretch'}}>
                        <Text numberOfLines={1} style={styles.textStyle}>Points: {person.points}</Text>
                        </View>
                    </View>
                    )
            })
        )
    }
    render(){
        console.log('Ledader Board')
        return (
            <View style={styles.container}>
                <Text style={{color: 'white', textAlign: 'center', alignSelf: 'stretch', fontSize: 30, fontWeight: '500'}}>WEEKLY TOP</Text>
                {this.renderLeaderBoard()}  
            </View>
        );
    }
}

const styles = {
    container : {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flex:1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    textStyle : {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        alignSelf: 'stretch'
    }
}
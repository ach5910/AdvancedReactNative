import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableWithoutFeedback,  
    ListView, 
    LayoutAnimation,
    Platform,
    UIManager
} from 'react-native';
import { connect } from 'react-redux';

import { Card, CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component{

    componentWillUpdate(){
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        console.log('in Component')
        LayoutAnimation.spring();
    }

    renderDescription() {

        const { library, expanded } = this.props;

        if (expanded){
            return (
                <CardSection>
                    <Text style={{ flex: 1 }}>  {library.description}  </Text>
                </CardSection>
            )
        }
    }

    render(){
        const { id, title } = this.props.library;
        return (
            <TouchableWithoutFeedback
                onPress={() => this.props.selectLibrary(id)}
            >
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>  {title}  </Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

// Passes in Application State, and props passed in from parent component
const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.id;
    return { expanded }
}

export default connect(mapStateToProps, actions)(ListItem);
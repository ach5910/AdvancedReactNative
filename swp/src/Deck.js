import React, { Component } from 'react';
import { 
    View,
    Animated,
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
    //If props are passed  in and user does not include these param then they get assigned here
    //which means no error thrown and no type checking
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    }

    constructor(props) {
        super(props);


        const position = new Animated.ValueXY();

        //onStartShouldSetPanResponder: 
        //everytime a user touches screen this panresponder is called
        //its a func because we can declare conditionals to decribe state

        //onPanResponderMove:
        //is called everytime theres a drag event

        //onPanResponderRelease
        //is called everytime theres a release 
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                //allows us to see the console.logs for individual gestures
                //debugger
                //console.log(gesture);

                position.setValue({x: gesture.dx,y: gesture.dy });
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
                
            }
        });
        //this.position and this.panResponder   would work the same but doc conv follows this.state methods
        this.state = { panResponder, position, index: 0 };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data){
            this.setState({ index: 0 });
        }
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0}
        }).start();
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        //timing has the same effect as spring except more linear
        Animated.timing(this.state.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const { onSwipeRight, onSwipeLeft, data } = this.props;
        const item = data[this.state.index];
        //if we type check like if(onSwipeRight exist) become repetative and called too much
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this.state.position.setValue({ x: 0, y:0 });
        this.setState({ index: this.state.index + 1});
    }

    getCardStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5 , 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        //transform: [{ rotate: rotate}] = [rotate] ...ES6 syntax
        return { 
            ...position.getLayout(),
            transform: [{ rotate }]
        };
    }

    renderCards() {
        if (this.state.index >= this.props.data.length){
            return this.props.renderNoMoreCards();
        }
        return this.props.data.map((item, i) => {
            if (i < this.state.index){ return null; }
            if(i === this.state.index){
                return (
                    <Animated.View
                        key={item.id}
                        style={[this.getCardStyle(), styles.cardStyle, {zIndex: 99}]}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            return (
                <Animated.View key={item.id}
                style={[styles.cardStyle, { top: 10 * (i - this.state.index), zIndex: 5 }]}>
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        }).reverse();
    }

    render() {
        return (
            //... passes off the panHandlers functions onto the View
            <View>
                {this.renderCards()}
            </View>
        );
    }
}


//position absolute will cause the cards to stack
//element applied to shrinks to the minimuim size to render
//We can assing SCREEN_WIDTH
//or left 0 and right 0 saying that we want elements on their sides to have 0 dist between them
const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
};

export default Deck;
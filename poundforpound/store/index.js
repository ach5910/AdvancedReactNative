import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import { AsyncStorage } from 'react-native';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
export default store;
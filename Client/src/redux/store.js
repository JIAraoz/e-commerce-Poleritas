import { createStore, applyMiddleware , compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducer';
const composeEnhancers = compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

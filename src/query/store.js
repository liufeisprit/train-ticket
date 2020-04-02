import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import reducers from './reducer'
import thunk from 'redux-thunk'
export default createStore(
    combineReducers(reducers),
    {

    },
    applyMiddleware(thunk)
)
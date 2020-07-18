import { createStore, applyMiddleware, compose } from 'redux'
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer'
import { createLogger } from 'redux-logger'


const logger = createLogger()

// const middleware = applyMiddleware(thunk, logger)

// create a makeStore function
const makeStore = context => createStore(rootReducer, compose(applyMiddleware(thunk, logger)));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
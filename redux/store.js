import { createStore } from 'redux'
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers/rootReducer'

// create a makeStore function
const makeStore = context => createStore(rootReducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
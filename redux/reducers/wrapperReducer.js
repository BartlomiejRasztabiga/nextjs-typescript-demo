import { HYDRATE } from 'next-redux-wrapper';


const wrapperReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default wrapperReducer
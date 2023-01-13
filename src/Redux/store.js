import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    name: '',
    bio: '',
    email: '',
    occupation: '',
    data: null,
    searchTerm: ''

};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_NAME':
            return { ...state, name: action.payload };
        case 'UPDATE_BIO':
            return { ...state, bio: action.payload };
        case 'UPDATE_EMAIL':
            return { ...state, email: action.payload };
        case 'UPDATE_OCCUPATION':
            return { ...state, occupation: action.payload };
        case 'FETCH_DATA_SUCCESS':
            return { ...state, data: action.payload };
        case 'FETCH_SINGLE_DATA_SUCCESS':
            return { ...state, data: action.payload };
        case 'SEARCH_DATA':
            return { ...state, searchTerm: action.payload };
        default:
            return state;
    }
}

export const store = createStore(reducer, applyMiddleware(thunk));

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(Thunk),
));

import App from './App';

declare const ENV: string;

ReactDOM.render(
    <Provider store={store}>
        <App env={ ENV }/>
    </Provider>,
    document.getElementById('yanolja-category-root')
);



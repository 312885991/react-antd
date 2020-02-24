import React from 'react';
import Router from './router'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import store from './redux/store'

ReactDOM.render(<Provider store={store}>
                    <Router /> 
                </Provider>,
document.getElementById('root'));
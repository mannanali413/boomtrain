import 'babel-polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, IndexRoute, IndexRedirect, Route, browserHistory} from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxPromise from 'redux-promise'

import injectTapEventPlugin from "react-tap-event-plugin"

import App from 'common/App'
import Repos from 'repos'
import reducers from './reducers'

require('../sass/app.scss')

injectTapEventPlugin();

const store = createStore(
    reducers,
    applyMiddleware(reduxPromise)
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to="/repos" />
                <Route path='repos' component={Repos} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);

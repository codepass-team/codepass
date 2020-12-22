import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import BaseLayout from './components/layouts/BaseLayout'
import store from './redux/store'


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={createBrowserHistory()}>
                    <Route path={'/'} component={BaseLayout} />
                </Router>
            </Provider>
        );
    }
}

export default App
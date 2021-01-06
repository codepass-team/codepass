import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import BaseLayout from './components/layouts/BaseLayout'
import store from './redux/store'


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Route path={'/'} component={BaseLayout} />
                </Router>
            </Provider>
        );
    }
}

export default App
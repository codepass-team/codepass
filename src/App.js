import React, { Component } from "react"
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { Provider, connect } from 'react-redux';
import { createBrowserHistory } from 'history'
import store from './redux/store';
import BaseLayout from './components/layouts/BaseLayout'

const mapStateToProps = (state) => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin,
    signInVisible: state.modalReducer.signInVisible,
    signUpVisible: state.modalReducer.signUpVisible,
    keyword: state.keywordReducer.keyword,
})

let baseLayout = connect(mapStateToProps)(withRouter(BaseLayout))

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={createBrowserHistory()}>
                    <Route path={'/'} component={baseLayout} />
                </Router>
            </Provider>
        );
    }
}

export default App
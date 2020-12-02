import React from "react";
import { Redirect, Route, Router, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Layout } from 'antd';

import { loginAsUser, logout } from '../../redux/actions/action';
import mainRoutes from "../../routes/routes";
import PrivateRoute from "../PrivateRoute";
import BaseComponent from "../BaseComponent";


const { Header, Content } = Layout;

const mapStateToProps = state => ({
  user: state.identityReducer.user
})

class BaseLayout extends BaseComponent {

  componentWillMount() {
    this.refreshUser()
  }

  getDefaultRoute() {
    // return (
    //   <Route exact path="/user">
    //     <Redirect to="/user/home" />
    //   </Route>
    // )
    if (this.props.history.location.pathname.indexOf("/user") == -1)
      return (<Redirect to={"/user/home"} />)
    return null
  }

  createRoutes(routes) {
    return routes.map((prop, key) => (
      prop.auth === true
        ? <PrivateRoute role={-1} path={prop.path} component={prop.component} key={key} user={this.props.user} />
        : <Route path={prop.path} component={prop.component} key={key} />
    ));
  }

  refreshUser() {
    const user = this.loadStorage("user")
    if (user) {
      this.props.dispatch(loginAsUser(user))
    } else {
      this.props.dispatch(logout())
      localStorage.clear()
    }
  }

  render() {
    return (
      <Layout>
        <Content style={{ backgroundColor: "white" }}>
          <Router history={this.props.history}>
            {this.createRoutes(mainRoutes)}
            {this.getDefaultRoute()}
          </Router>
        </Content>
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(withRouter(BaseLayout))
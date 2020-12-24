import React from "react";
import { Redirect, Route, Router, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Layout } from 'antd';

import { loginAsUser, loginAsAdmin, logout } from '../../redux/actions/action';
import mainRoutes from "../../routes/routes";
import PrivateRoute from "../PrivateRoute";
import BaseComponent from "../BaseComponent";

import store from '../../redux/store'

const { Content } = Layout;

const mapStateToProps = state => ({
  user: state.identityReducer.user,
  admin: state.identityReducer.admin
})

class BaseLayout extends BaseComponent {

  componentWillMount() {
    this.refreshUser()
  }

  getDefaultRoute() {
    if (this.props.history.location.pathname.indexOf("/user") === -1
      && this.props.history.location.pathname.indexOf("/admin") === -1)
      return (<Redirect to={"/user/home"} />)//这一行是找到首页面
    return null
  }

  createRoutes(routes) {
    return routes.map((route, key) => {
      return (
        // prop.auth === true ?
        <PrivateRoute role={-1} auth={route.auth} path={route.path} component={route.component} key={key} user={this.props.user} />
        // : <Route path={route.path} component={route.component} key={key} />
      )
    });
  }

  refreshUser() {
    console.log(store.getState())
    const user = this.loadStorage("user")
    const isAdmin = this.loadStorage("isAdmin")
    if (user) {
      if (isAdmin == 'true') {
        this.props.dispatch(loginAsAdmin(user))
      }
      else {
        this.props.dispatch(loginAsUser(user))
      }
    } else {
      this.props.dispatch(logout())
      localStorage.clear()
    }
    console.log(store.getState())
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
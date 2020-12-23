import React from "react"
import { Route, Router, withRouter } from "react-router-dom"
import { BackTop, Layout } from 'antd'
import { cancelModal, loginAsUser, logout, setOnCancel, showSignIn, showSignUp } from '../../../redux/actions/action'
import mainRoutes from "../../../routes/routes"
import PrivateRoute from "../../PrivateRoute"
import BaseComponent from "../../BaseComponent"
import AuthModal from "../../auth/authModal"
import BaseDrawer from "../../BaseDrawer"

import { connect } from 'react-redux';
import BaseHeader from "../user/BaseHeader"

const { Content } = Layout;
const mapStateToProps = state => ({
    user: state.identityReducer.user,
    signInVisible: state.modalReducer.signInVisible,
    signUpVisible: state.modalReducer.signUpVisible,
})

class AdminLayout extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                { key: "/admin/home", name: "首页", icon: "home" },
                { key: "/admin/question", name: "问题", icon: "question" },
                { key: "/admin/answer", name: "回答", icon: "answer" },
                { key: "/admin/user", name: "用户", icon: "user" },
            ],
        }
    }

    componentWillMount() {
        if (localStorage.getItem("user") !== null) {
            const user = localStorage.getItem("user")
            this.props.dispatch(loginAsUser(user))
        } else {
            this.props.dispatch(logout())
            localStorage.clear()
        }
        this.props.dispatch(setOnCancel(this.onCancel))
    }

    createRoutes = (routes) => {
        return routes.map((route, key) => (
            <PrivateRoute
                role={1}
                auth={route.auth}
                path={route.path}
                component={route.component}
                key={key}
                user={this.props.user} />
        ))
    };

    switch = () => {
        if (this.props.signInVisible) {
            this.props.dispatch(showSignUp())
        } else
            this.props.dispatch(showSignIn())
    }

    onCancel = () => {
        this.props.dispatch(cancelModal())
    }

    render() {
        return (
            <Layout>
                <BackTop visibilityHeight={200} style={{ zIndex: 10 }} />
                <BaseHeader items={this.state.items} />
                <Content style={{ backgroundColor: "white" }}>
                    {this.createRoutes(mainRoutes[1].children)}
                </Content>
                <AuthModal switch={this.switch} />
                <BaseDrawer />
            </Layout>
        );
    }
}


export default connect(mapStateToProps)(withRouter(AdminLayout))
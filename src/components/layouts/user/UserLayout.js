import React from "react"
import { Router, withRouter } from "react-router-dom"
import { BackTop, Layout } from 'antd'
import { cancelModal, setOnCancel, showSignIn, showSignUp } from '../../../redux/actions/action'
import mainRoutes from "../../../routes/routes"
import PrivateRoute from "../../PrivateRoute"
import BaseHeader from "./BaseHeader"
import BaseComponent from "../../BaseComponent"
import AuthModal from "../../auth/authModal"
import BaseDrawer from "../../BaseDrawer"

import { connect } from 'react-redux';

const { Content } = Layout;
const mapStateToProps = state => ({
    user: state.identityReducer.user,
    signInVisible: state.modalReducer.signInVisible,
    signUpVisible: state.modalReducer.signUpVisible,
})

class UserLayout extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                { key: "/user/home", name: "首页", icon: "home" },
                { key: "/user/list", name: "发现", icon: "unordered-list" },
                { key: "/user/my", name: "我的问答", icon: "user" }
            ],
        }
    }

    componentWillMount() {
        this.props.dispatch(setOnCancel(this.onCancel))
    }

    createRoutes = (routes, parent) => {
        return (
            routes.map((prop, key) => {
                return <PrivateRoute
                    role={0}
                    auth={prop.auth}
                    path={parent + prop.path}
                    component={prop.component}
                    key={key} />;
            })
        )
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
                    <Router history={this.props.history}>
                        {this.createRoutes(mainRoutes[0].children, mainRoutes[0].path)}
                    </Router>
                </Content>
                <AuthModal switch={this.switch} />
                <BaseDrawer />
            </Layout>
        );
    }
}


export default connect(mapStateToProps)(withRouter(UserLayout))
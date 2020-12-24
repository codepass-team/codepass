import React from "react"
import { Route, Router, withRouter } from "react-router-dom"
import { BackTop, Icon, Layout, Menu } from 'antd'
import { cancelModal, loginAsUser, loginAsAdmin, logout, setOnCancel, showSignIn, showSignUp } from '../../../redux/actions/action'
import mainRoutes from "../../../routes/routes"
import PrivateRoute from "../../PrivateRoute"
import BaseComponent from "../../BaseComponent"
import AuthModal from "../../auth/authModal"
import BaseDrawer from "../../BaseDrawer"

import { connect } from 'react-redux';
import AdminHeader from "./AdminHeader"
const { Header, Content, Sider } = Layout;

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
                { key: "home", path: "/admin/home", name: "首页", icon: "unordered-list" },
                { key: "question", path: "/admin/question", name: "问题", icon: "unordered-list" },
                { key: "answer", path: "/admin/answer", name: "回答", icon: "unordered-list" },
                { key: "user", path: "/admin/user", name: "用户", icon: "unordered-list" },
                { key: "docker", path: "/admin/docker", name: "容器", icon: "unordered-list" },
            ],
            collapsed: false,
        }
    }

    componentWillMount() {
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
        }
        this.props.dispatch(setOnCancel(this.onCancel))
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    createRoutes = (routes, parent) => {
        return routes.map((route, key) => (
            <PrivateRoute
                role={1}
                auth={route.auth}
                path={parent + route.path}
                component={route.component}
                key={key} />
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

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });

        this.props.history.push({ pathname: this.state.items[Number.parseInt(e.key)].path })
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <BackTop visibilityHeight={200} style={{ zIndex: 10 }} />
                <AdminHeader />
                <Layout>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={['0']}
                            mode='vertical'
                            theme='dark'
                        >
                            {this.state.items.map((item, index) =>
                                <Menu.Item key={index}>
                                    <Icon type={item.icon} />
                                    {item.name}
                                </Menu.Item>)}
                        </Menu>
                    </Sider>
                    <Content style={{ margin: '0 16px' }}>
                        {this.createRoutes(mainRoutes[1].children, mainRoutes[1].path)}
                        <AuthModal switch={this.switch} />
                        <BaseDrawer />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const styles = {
    logo: {
        height: '32px',
        background: 'rgba(255, 255, 255, 0.2)',
        margin: '16px',
    },
    container: {
        marginTop: "50px",
        paddingBottom: "50px"
    }
}

export default connect(mapStateToProps)(withRouter(AdminLayout))
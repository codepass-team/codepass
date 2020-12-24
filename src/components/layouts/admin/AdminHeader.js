import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BaseComponent from '../../BaseComponent';
import { BackTop, Icon, Layout, Menu, Col, Row, Button, Popover } from 'antd'
import UserPopover from '../../user/UserPopover';
import UserMenu from '../../user/UserMenu';
import { showSignIn, showSignUp } from "../../../redux/actions/action"

const { Header, Content, Sider } = Layout

class AdminHeader extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            isEnter: false,
            index: 0,
            bannerData: {},
            banner: null
        }
    };

    renderUser = () => {
        if (!this.props.user) {
            return (
                <Col span={12}>
                    <Row type="flex" justify="end" align='middle' style={{ marginRight: "40px" }}>
                        <Button style={{ color: "white" }} type="link" icon="user" size="large"
                            onClick={this.signIn}>
                            登录
                        </Button>
                        <Button type="primary" icon="user-add" size="large"
                            onClick={this.signUp}>
                            注册
                        </Button>
                    </Row>
                </Col>
            );
        } else {
            return (
                <Col span={12}>
                    <Row type="flex" justify="end" style={{ marginRight: "40px" }}>
                        <Popover content={<UserPopover />}>
                            <Button style={{ height: 64, backgroundColor: "rgba(0,0,0,0)" }} type="link">
                                <UserMenu />
                            </Button>
                        </Popover>
                    </Row>
                </Col>
            )
        }
    }

    signIn = () => {
        this.props.dispatch(showSignIn())
    }

    signUp = () => {
        this.props.dispatch(showSignUp())
    }


    render() {
        return (
            <Header style={{
                // backgroundColor: "rgba(0,0,0,0.7)",
            }}>
                <Row type="flex" align="middle">
                    <Col xs={0} sm={0} lg={10}>
                        <Col sm={0} lg={10}>
                            {/* 当屏幕分辨率小于sm值时隐藏logo */}
                            <Row type="flex" justify='center'>
                                <img alt="" style={styles.logo} src={require("@/assets/logo2.png")} />
                            </Row>
                        </Col>
                        <Col sm={12} lg={10}>
                        </Col>
                    </Col>
                    <Col xs={24} sm={24} lg={14}>
                        <Row type="flex" justify='end' align="middle">
                            <Col span={12}>
                                <Row type="flex" justify="end" style={{ marginRight: "40px" }}>
                                    <Menu
                                        theme="dark"
                                        mode="horizontal"
                                        defaultSelectedKeys={['2']}
                                        style={{ lineHeight: '64px' }}
                                    >
                                    </Menu>
                                </Row>
                            </Col>
                            {this.renderUser()}
                        </Row>
                    </Col>
                </Row>
            </Header>
        )
    }
}

const styles = {

    logo: {
        height: '64px',
        width: '192px'
    },
}


export default connect()(AdminHeader)
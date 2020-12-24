import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BaseComponent from '../../BaseComponent';
import { BackTop, Icon, Layout, Menu } from 'antd'
const { Header, Content, Sider } = Layout;

class AdminHeader extends BaseComponent {
    render() {
        return (
            <Header></Header>
        )
    }
}

export default connect()(AdminHeader)
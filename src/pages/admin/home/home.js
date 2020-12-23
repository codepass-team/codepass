import React from 'react'
import { connect } from 'react-redux';
import BaseComponent from '@/components/BaseComponent';
import { Menu, Icon, Col } from 'antd'

export class Home extends BaseComponent {
    constructor(props) {
        console.log("Home")
        console.log(props)
        super(props)
        this.state = {
            current: null
        }
    }

    handleClick = (e) => {
        console.log('click', e)
        this.setState({
            current: e.key
        })
    }

    render() {
        return (
            <Col span='5'>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode='vertical'
                    theme='dark'
                >
                    <Menu.Item key='User'>
                        <Icon type="star" theme="twoTone" />
                        用户信息
                    </Menu.Item>
                    <Menu.Item key='Question'>
                        <Icon type="question-circle" theme="twoTone" />
                        问题信息
                    </Menu.Item>
                    <Menu.Item key='Answer'>
                        <Icon type="file-word" theme="twoTone" />
                        回答信息
                    </Menu.Item>
                </Menu>
            </Col>
        )
    }
}

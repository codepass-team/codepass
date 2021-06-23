import { UserOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Avatar, Skeleton } from 'antd';
import React from 'react'
import BaseComponent from '../../../components/BaseComponent';
import Data from './Data';

export class Person extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            name: {
                name: '昵称',
                content: null
            },
            gender: {
                name: '性别',
                content: null
            },
            job: {
                name: '职业',
                content: null
            },
            tech: {
                name: '所在行业',
                content: null,
            },
            age: {
                name: '年龄',
                content: null
            },
            email: {
                name: '邮箱',
                content: null
            },
            data: null,
            change: "",
        }
    }

    componentWillMount() {
        this.setState({
            loading: true
        })
        this.get('/api/user', (result) => {
            if (result.status === "ok") {
                this.setState({
                    name: { name: '昵称', content: result.data.username },
                    gender: { name: '性别', content: result.data.gender },
                    job: { name: '职业', content: result.data.job },
                    tech: { name: '所在行业', content: result.data.tech },
                    age: { name: '年龄', content: result.data.age },
                    email: { name: '邮箱', content: result.data.email },
                    loading: false
                })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        });
    }

    onChangeState = (state) => {
        let val = Object.keys(state)[0]
        this.setState({
            ...state,
            change: val
        }, this.modifyState)
    }

    modifyState = () => {
        var successAction = (result) => {
            if (result.status === 'ok') {
                this.pushNotification("success", "修改信息成功");
            }
            else {
                this.pushNotification("warning", "更新失败");
            }
        }
        if (this.state.change !== '') {
            this.post('/api/user?' + this.state.change + '=' + this.state[this.state.change].content, null, successAction)
        }
    }

    render() {
        return (
            <Row style={{ marginTop: '15px' }}>
                <Col span={18} offset={3}>
                    <Divider orientation='left'><h2 style={{ fontWeight: 600 }}>个人资料</h2></Divider>
                </Col>
                <Col span={16} offset={5}>
                    <Col span={6}>
                        <div>
                            <Avatar shape="square" size={128}><UserOutlined style={{ fontSize: '128px', color: '#08c' }} /></Avatar>
                        </div>
                    </Col>
                    <Col span={18} style={{ position: 'relative', top: '25px' }}>
                        {this.state.loading ? <Skeleton /> : <Data {...this.state.name} enable_change={true} onChangeState={this.onChangeState}></Data>
                        }
                        <Divider></Divider>
                        {this.state.loading ? <Skeleton /> : <Data {...this.state.gender} enable_change={true} onChangeState={this.onChangeState}></Data>
                        }
                        <Divider></Divider>
                        {this.state.loading ? <Skeleton /> : <Data {...this.state.job} enable_change={true} onChangeState={this.onChangeState}></Data>
                        }
                        <Divider></Divider>
                        {this.state.loading ? <Skeleton /> : <Data {...this.state.tech} enable_change={true} onChangeState={this.onChangeState}></Data>
                        }
                        <Divider></Divider>
                        {this.state.loading ? <Skeleton /> : <Data {...this.state.age} enable_change={true} onChangeState={this.onChangeState}></Data>
                        }
                        <Divider></Divider>
                        {this.state.loading ? <Skeleton /> : <Data {...this.state.email} enable_change={false} onChangeState={this.onChangeState}></Data>
                        }
                        <Divider></Divider>
                    </Col>
                </Col>
            </Row>
        )
    }
}


import { UserOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Avatar } from 'antd';
import React from 'react'
import BaseComponent from '../../../components/BaseComponent';
import Data from './Data';

class Person extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
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
            data:null,
            change:-1
        }
    }

    componentWillMount() {
        var successAction = (result) => {
            console.log(result)
            if (result.status === "ok") {
                this.setState({
                    name:{name:'昵称',content:result.data.nickname},
                    gender: {name: '性别',content: result.data.gender},
                    job: {name: '职业',content: result.data.job},
                    tech: {name: '所在行业',content: result.data.tech},
                    age: {name: '年龄',content: result.data.age}
                })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.get('/api/user', successAction);
    }

    onChangeState = (state) => {
        this.setState(state)

        var successAction = (result)=>{
            console.log(result)
            if(result.status=='ok'){
                console.log(1)
            }
            else{
                this.pushNotification("warning", "Update Failed");
            }
        }
        if(this.state.change!=-1){
            var keys = Object.keys(this.state)
            var values = Object.values(this.state)
            var val = values[values.length-1]
            console.log(keys[val]+'='+values[val].content)
            this.post('/api/user?'+keys[val]+'='+values[val].content,null,successAction)
        }
    }

    render() {
        return (
            <Row style={{ marginTop: '15px' }}>
                <Col span='18' offset={3}>
                    <Divider orientation='left'><h2 style={{ fontWeight: 600 }}>个人资料</h2></Divider>
                </Col>
                <Col span='14' offset='5'>
                    <Col span='6'>
                        <div>
                            <Avatar shape="square" size={128}><UserOutlined style={{ fontSize: '128px', color: '#08c' }} /></Avatar>
                        </div>
                    </Col>
                    <Col span='18' style={{ position: 'relative', top: '25px' }}>
                        <Data {...this.state.name} onChangeState={this.onChangeState}></Data>
                        <Divider></Divider>
                        <Data {...this.state.gender} onChangeState={this.onChangeState}></Data>
                        <Divider></Divider>
                        <Data {...this.state.job} onChangeState={this.onChangeState}></Data>
                        <Divider></Divider>
                        <Data {...this.state.tech} onChangeState={this.onChangeState}></Data>
                        <Divider></Divider>
                        <Data {...this.state.age} onChangeState={this.onChangeState}></Data>
                        <Divider></Divider>
                    </Col>
                </Col>
            </Row>
        )
    }
}

export default Person
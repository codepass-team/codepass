import { UserOutlined } from '@ant-design/icons';
import { Col, Divider, Row,Avatar } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import BaseComponent from '../../../components/BaseComponent';
import Data from './Data';

class Person extends BaseComponent{
    constructor(props){
        super(props)
        this.state={
            name:{
                name:'昵称',
                content:null
            },
            gender:{
                name:'性别',
                content:null
            },
            job:{
                name:'职业',
                content:null
            },
            tech:{
                name:'所在行业',
                content:null,
            },
            age:{
                name:'年龄',
                content:null
            }
        }
    }

    onChangeState = (state) => {
        this.setState(state)
    }

    render(){
        return (
            <Row style={{marginTop:'15px'}}>
                <Col span='18' offset={3}>
                    <Divider orientation='left'><h2 style={{fontWeight:600}}>个人资料</h2></Divider>
                </Col>
                <Col span='14' offset='5'>
                    <Col span='6'>
                        <div>
                            <Avatar shape="square" size={128}><UserOutlined style={{fontSize:'128px',color:'#08c'}} /></Avatar>
                        </div>
                    </Col>
                    <Col span='18' style={{position:'relative',top:'25px'}}>
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
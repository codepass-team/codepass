import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import BaseComponent from '../../../components/BaseComponent';
import { Menu, Icon, Col, Row, Table } from 'antd'

export class Home extends BaseComponent {

    columns = {
        user: [
            { title: 'Id', dataIndex: 'id' },
            { title: '用户名', dataIndex: 'username' },
            { title: '性别', dataIndex: 'gender' },
            { title: '工作', dataIndex: 'job' },
            { title: '所在行业', dataIndex: 'job' },
            { title: '年龄', dataIndex: 'age' },
            { title: '粉丝数', dataIndex: 'followerCount' }
        ],
        question: [
            { title: 'Id', dataIndex: 'id' },
            { title: '标题', dataIndex: 'title' },
            { title: '内容', dataIndex: 'content' },
            { title: '提问者', dataIndex: 'questioner.username' },
            { title: '时间', dataIndex: 'raiseTime', render: text => this.handleDate(text) + this.handleTime(text) },
            { title: '容器Id', dataIndex: 'dockerId' },
            { title: '点赞数', dataIndex: 'likeCount' },
            { title: '评论数', dataIndex: 'commentCount' },
            { title: '收藏数', dataIndex: 'collectCount' },
            { title: '状态', dataIndex: 'status' }
        ],
        answer: [
            { title: 'Id', dataIndex: 'id' },
            { title: '内容', dataIndex: 'content' },
            { title: '回答者', dataIndex: 'answerer.username' },
            { title: '时间', dataIndex: 'answerTime', render: text => this.handleDate(text) + this.handleTime(text) },
            { title: '容器Id', dataIndex: 'dockerId' },
            { title: '点赞数', dataIndex: 'likeCount' },
            { title: '评论数', dataIndex: 'commentCount' },
            { title: '收藏数', dataIndex: 'collectCount' },
            { title: '状态', dataIndex: 'status' }

        ]
    }

    constructor(props) {
        console.log("Home")
        console.log(props)
        super(props)
        this.state = {
            current: null,
            users: null,
            questions: null,
            answers: null
        }
    }

    componentWillMount() {
        var userSuccess = (result) => {
            if (result.status == 'ok') {
                this.setState({
                    users: result.data
                })
            }
            else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.get('/api/user/listAll', userSuccess)

        var questionSuccess = (result) => {
            if (result.status == 'ok') {
                this.setState({
                    questions: result.data.content
                })
            }
            else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.get('/api/question/listAll', questionSuccess)

        var answerSuccess = (result) => {
            if (result.status == 'ok') {
                this.setState({
                    answers: result.data
                })
            }
            else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.get('/api/answer/listAll', answerSuccess)
    }

    handleClick = (e) => {
        console.log('click', e)
        let key = e.key
        if (key != this.state.current) {
            this.setState({
                current: key
            })
        }
    }

    renderTable = () => {
        console.log(this.state.questions);
        switch (this.state.current) {
            case 'User':
                return (
                    <Table rowKey='id' columns={this.columns.user} dataSource={this.state.users}></Table>
                )
            case 'Question':
                return (
                    <Table rowKey='id' columns={this.columns.question} dataSource={this.state.questions}></Table>
                )
            case 'Answer':
                return (
                    <Table rowKey='id' columns={this.columns.answer} dataSource={this.state.answers}></Table>
                )
            default:
                return <p>渲染表格失败</p>
        }
    }

    render() {
        return (
            <Row style={{ marginTop: 20 }} type='flex' align='middle' justify='center'>
                <Col span={5}>
                </Col>
                <Col span={18} offset={1}>
                    {this.renderTable()}
                </Col>
            </Row>
        )
    }
}


export default withRouter(Home)

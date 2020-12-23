import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import BaseComponent from '../../../components/BaseComponent';
import { Menu,Icon,Col, Row,Table } from 'antd'

export class Home extends BaseComponent {
    constructor(props) {
        console.log("Home")
        console.log(props)
        super(props)
        this.state = {
            current:null,
            users:null,
            questions:null,
            answers:null
        }
    }

    componentWillMount(){
        var userSuccess = (result) =>{
            if(result.status=='ok'){
                this.setState({
                    users:result.data
                })
            }
            else{
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.get('api/user/listAll',userSuccess)

        var questionSuccess = (result) =>{
            if(result.status=='ok'){
                this.setState({
                    questions:result.data
                })
            }
            else{
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.get('api/question/listAll',questionSuccess)

        var answerSuccess = (result) =>{
            if(result.status=='ok'){
                this.setState({
                    answers:result.data
                })
            }
            else{
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.get('api/answer/listAll',answerSuccess)
    }

    handleClick = (e) => {
        console.log('click',e)
        let key = e.key
        if(key!=this.state.current){
            this.setState({
                current:key
            })
        }
    }

    renderTable = () => {
        switch(this.state.current){
            case 'User':
                return (
                    <Table columns={columns.user} dataSource={this.state.users}></Table>
                )
            case 'Question':
                return (
                    <Table columns={columns.question} dataSource={this.state.questions}></Table>
                )
            case 'Answer':
                return (
                    <Table columns={columns.answer} dataSource={this.state.answers}></Table>
                )
            default:
                return <p>渲染表格失败</p>
        }
    }

    render() {
        return (
            <Row style={{marginTop:20}} type='flex' align='middle' justify='center'>
                <Col span='5'>
                    <Menu
                    onClick = {this.handleClick}
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
                <Col span={18} offset={1}>
                    {this.renderTable()}
                </Col>
            </Row>
        )
    }
}

const columns = {
    user:[
        {title:'Id',dataIndex:'id',key:'id'},
        {title:'用户名',dataIndex:'用户名',key:'用户名'},
        {title:'性别',dataIndex:'性别',key:'性别'},
        {title:'工作',dataIndex:'工作',key:'工作'},
        {title:'所在行业',dataIndex:'所在行业',key:'所在行业'},
        {title:'年龄',dataIndex:'年龄',key:'年龄'},
        {title:'粉丝数',dataIndex:'粉丝数',key:'粉丝数'}
    ],
    question:[
        {title:'Id',dataIndex:'id',key:'id'},
        {title:'标题',dataIndex:'标题',key:'标题'},
        {title:'内容',dataIndex:'内容',key:'内容'},
        {title:'提问者',dataIndex:'提问者',key:'提问者'},
        {title:'时间',dataIndex:'时间',key:'时间'},
        {title:'DockerId',dataIndex:'DockerId',key:'DockerId'},
        {title:'点赞数',dataIndex:'点赞数',key:'点赞数'},
        {title:'评论数',dataIndex:'评论数',key:'评论数'},
        {title:'收藏数',dataIndex:'收藏数',key:'收藏数'},
        {title:'状态',dataIndex:'状态',key:'状态'}
    ],
    answer:[
        {title:'Id',dataIndex:'id',key:'id'},
        {title:'内容',dataIndex:'内容',key:'内容'},
        {title:'回答者',dataIndex:'回答者',key:'回答者'},
        {title:'时间',dataIndex:'时间',key:'时间'},
        {title:'DockerId',dataIndex:'DockerId',key:'DockerId'},
        {title:'点赞数',dataIndex:'点赞数',key:'点赞数'},
        {title:'评论数',dataIndex:'评论数',key:'评论数'},
        {title:'收藏数',dataIndex:'收藏数',key:'收藏数'},
        {title:'状态',dataIndex:'状态',key:'状态'}

    ]
}

export default withRouter(Home)

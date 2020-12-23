import React from 'react'
import BaseComponent from '../../../components/BaseComponent';
import { withRouter } from "react-router-dom"
import User from '../../../components/auth/user'
import {Button, Col, Icon, List, Row,Tabs,Avatar, Card} from 'antd';
import Description from '../../../components/markd/Description'

const { TabPane } = Tabs;

export class Collect extends BaseComponent{
    constructor(props){
        super(props)
        this.state={
            qCollection:[],
            aCollection:[]
        }
    }

    componentWillMount(){
        let errorAction = (result) => {
            this.pushNotification("warning", "Connection Failed");
        }

        this.getWithErrorAction('/api/question/listFollow', (result) => {
            if (result.status === "ok") {
                this.setState({ qCollection: result.data })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }, errorAction);

        this.getWithErrorAction('/api/answer/listCollect', (result) => {
            if (result.status === "ok") {
                this.setState({ aCollection: result.data })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }, errorAction);
    }

    deleteQuestion = (index)=>{
        console.log(index)
        var successAction = (result)=>{
            if(result.status=='ok'){
                let qCollection = this.state.qCollection
                qCollection.splice(index,1)
                this.setState({
                    qCollection:qCollection
                })
            }
            else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.post('/api/question/unfollow/' + this.state.qCollection[index].id,null,successAction,
            ()=>{console.log('unsuccess')},()=>{console.log('error')})
    }

    deleteAnswer = (index)=>{
        console.log(index)
        var successAction = (result)=>{
            if(result.status=='ok'){
                let aCollection = this.state.aCollection
                aCollection.splice(index,1)
                this.setState({
                    aCollection:aCollection
                })
            }
            else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.post('/api/answer/uncollect/' + this.state.aCollection[index].id,null,successAction,
            ()=>{console.log('unsuccess')},()=>{console.log('error')})
    }

    render(){
        const { qCollection,aCollection } = this.state;
        console.log(qCollection,aCollection)
        return (
            <Row style={styles.container}>
                    <Col lg={6} xs={1} />
                    <Col lg={12} xs={22}>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="Questions" key="1">
                                {this.state.qCollection.length === 0 ?
                                    <Row style={styles.container} type="flex" justify="center">
                                        <Row style={{ fontSize: 22, marginTop: 300 }}>
                                            您还没有关注问题哦...
                                        </Row>
                                    </Row> : 
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={qCollection}
                                        renderItem={(item,index)=>{
                                            console.log(index)
                                            let id = item.id
                                            let user = item.questioner.username
                                            console.log(id,user)
                                            return (<List.Item>
                                                <Col span={20}>
                                                <List.Item.Meta
                                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                    title={<a onClick={() => {
                                                        this.props.history.push({
                                                        pathname: "/user/detail",
                                                        state: { id, user, completed: true }
                                                        })
                                                    }}>
                                                        {item.title}
                                                    </a>
                                                    }
                                                    description={item.content}
                                                >
                                                </List.Item.Meta>
                                                </Col>
                                                <Col span={2}>
                                                    <Icon type="delete" style={{paddingTop:10}} onClick={()=>this.deleteQuestion(index)} />
                                                </Col>
                                            </List.Item>
                                            )}}
                                    ></List>
                                    }
                            </TabPane>
                            <TabPane tab="Answers" key="2">
                                {this.state.aCollection.length === 0
                                    ? <Row style={styles.container} type="flex" justify="center">
                                        <Row style={{ fontSize: 22, marginTop: 300 }}>
                                            您还没有收藏回答哦...
                                        </Row>
                                    </Row>
                                    : 
                                    <List
                                    itemLayout="horizontal"
                                    dataSource={aCollection}
                                    renderItem={(item,index)=>{
                                        console.log(index)
                                        let id = item.id
                                        let user = item.questioner.username
                                        return (<List.Item>
                                            <Col span={20}>
                                                <List.Item.Meta
                                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                    title={<a onClick={() => {
                                                        this.props.history.push({
                                                        pathname: "/user/detail",
                                                        state: { id, user, completed: true }
                                                        })
                                                    }}>
                                                        {item.questionTitle}
                                                    </a>
                                                    }
                                                    description={item.content}
                                                >
                                                </List.Item.Meta>
                                                </Col>
                                                <Col span={2}>
                                                    <Icon type="delete" style={{paddingTop:10}} onClick={()=>this.deleteAnswer(index)} />
                                                </Col>
                                        </List.Item>
                                        )}}
                                        ></List>
                                    }
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col lg={6} xs={1} />
                </Row>
        )
    }
}

const styles = {
    container: {
        marginTop: "50px",
        paddingBottom: "100px"
    }
}

export default withRouter(Collect)
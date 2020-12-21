import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import copy from 'copy-to-clipboard';
import {withRouter} from "react-router-dom";
import Description from '../../../components/markd/Description'
import {Button, Card, Col, Descriptions, Icon, Input, Row} from 'antd';
import like from '@ant-design/icons'
import User from '../../../components/auth/user'

const {TextArea} = Input;
const test = {
    "answer": [{
        "desp": "222",
        "dockerId": "A Docker",
        "user": "nyako",
        "diff": ""
    }, {
        "desp": "333",
        "dockerId": "as",
        "user": "asd",
        "diff": ""
    }],
    "desp": "A Large Prob",
    "dockerId": "Q Docker",
    "qid": "sadasdasfd",
    "title": "Question 1",
    "user": "Questioner"
}

var columns = [];

class ACard extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            LikeIconColor:'#1890ff'
        }
    };

    getAnswer = (data) => {
        for (var i = 0; i < data.length; i++) {
            const item = data[i]
            if (item.user === this.loadStorage("user")) {
                return item
            }
        }
    }

    onChangeDesp = ({target: {value}}) => {
        this.setState({
            desp: value
        })
    };

    update = () => {
        this.pushNotification("", this.state.desp)
    }

    handleCopy = (dockerId) => {
        if (copy(dockerId + ""))
            this.pushNotification("success", "Docker-" + dockerId + " has been copied. Please open it in VS Code")
        else
            this.pushNotification("warning", "Copy Failed")
    }

    componentWillMount() {

    }

    getDetail = (qid, user) => {
        this.props.history.push({pathname: '/user/detail', state: {qid, user}})
    }

    changeLikeColor = ()=>{
        if(this.state.LikeIconColor=='#33ff33'){
            Icon.setTwoToneColor('#1890ff')
            this.setState({LikeIconColor:'#1890ff'})
        }
        else{
            Icon.setTwoToneColor('#33ff33')
            this.setState({LikeIconColor:'#33ff33'})
        }
    }

    render() {
        const {answerTime, content, likeCount, dockerId,status} = this.props.data
        // const my = this.getAnswer(test.answer)
        // if (!my || !my.dockerId) {
        //     return null
        // }
        // if (this.state.desp === 1)
        //     this.state.desp = my.desp
        return (
            <Card style={{ marginTop: 8 }} bodyStyle={{ paddingTop: 12, paddingBottom: 6, margin: 0 }}>
                <Row style={{ fontSize: 14, marginBottom: 5 }} type="flex" justify="start" align="start">
                    <h2 style={{fontWeight:600}}>
                        {content}
                    </h2>
                </Row>
                <Row type="flex" justify="start" align="middle" style={{ fontSize: 16, width: "100%", marginBottom: 3,marginTop:2,minHeight:25,textOverflow:'hidden' }}>
                    <a onClick={() => {
                        // this.props.history.push({
                        //     pathname: "/user/detail",
                        //     state: { qid, user, completed: true }
                        // })
                    }}>
                        {content}
                    </a>
                </Row>
                <Row style={{ width: "100%",marginTop:15 }} type="flex" justify="start" align='middle'>
                    <Col span={2}>
                    <Icon type="fire" style={{marginRight:5,fontSize:13}} onClick={this.changeLikeColor}/>
                        {likeCount}
                    </Col>
                    <Col span={12}><p style={{fontStyle:'Italic',marginBottom:0}}>{this.handleDate(answerTime)+' '+this.handleTime(answerTime)}</p></Col>
                </Row>
            </Card>
            // <Card title={"Title: " + content}
            //       extra={
            //           <Button type="link" onClick={
            //               () => this.getDetail(qid, user)
            //           }>Question Detail</Button>}
            //       style={styles.container}>
            //     <Descriptions bordered>
            //         <Item span={3} label="Description">
            //             <Description desp={content}/>
            //         </Item>
            //         <Item span={1} label="Questioner">
            //             <Row style={{height: 30}} type="flex" align='middle'>
            //                 {user}
            //             </Row>
            //         </Item>
            //         <Item span={2} label="Answer Docker">
            //             <Row style={{height: 30}} type="flex" align='middle'>
            //                 {dockerId}
            //                 <Button
            //                     style={styles.btn2}
            //                     type="link"
            //                     onClick={() => {
            //                         this.handleCopy(my.dockerId)
            //                     }}
            //                 ><Icon type="copy"/></Button>
            //             </Row>
            //         </Item>
            //         <Item span={3} label="Solution Brief" style={{padding: 5}}>
            //             <TextArea
            //                 onChange={this.onChangeDesp}
            //                 defaultValue={content}
            //                 placeholder="(Optional) Add more detail to your Question to attract more helper"
            //                 autosize={{minRows: 2, maxRows: 5}}
            //             />
            //         </Item>
            //     </Descriptions>
            //     <Row type="flex" justify="end">
            //         <Button
            //             style={{marginTop: 10}}
            //             size="large"
            //             type="primary"
            //             onClick={this.update}
            //         >Update</Button>
            //         <Button
            //             style={{marginTop: 10, marginLeft: 10}}
            //             size="large"
            //             type="warning"
            //             onClick={this.end}
            //         >Submit Solution</Button>
            //     </Row>
            // </Card>
        );
    }
}

const styles = {
    container: {
        marginBottom: "20px",
        fontSize: 22
    },
    btn: {
        padding: 5,
        marginRight: 10
    },
    btn2: {
        padding: 0,
        marginLeft: 5
    }
}

export default withRouter(ACard);

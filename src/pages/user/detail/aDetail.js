import React from "react"
import { connect } from 'react-redux'
import { Avatar, Button, Col, Divider, Input, Row, Typography } from 'antd'
import Answer from './answer'
import BaseComponent from '../../../components/BaseComponent'
import Description from '../../../components/markd/Description'
import { showSignIn } from "../../../redux/actions/action"

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const mapStateToProps = state => ({
    keyword: state.keywordReducer.keyword,
})

class ADetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            found: false,
            data: 0,
            edit: false, // 我是否有回答
            content: "", // 我的回答内容
            dockerId: "",
            aid: "",
            time: "",

            loading: false
        }
    }

    onChangeDesp = ({ target: { value } }) => {
        this.setState({
            content: value
        })
    };

    componentWillMount() {
        //get my answer
        if (this.state.data === 0) {
            console.log(this.state.data)
            this.setState({
                data: this.props.data
            })
        }
    }

    /**
     * 渲染问题标题
     * @param {*} title 
     * @param {*} desp 
     * @param {*} name 
     * @param {*} raiseTime 
     */
    renderTitle = (title, desp, name, raiseTime) => {
        return (
            <Row type="flex" justify="start" align="middle">
                <Col span={24}>
                    <Title level={1} style={{fontWeight:600,marginTop:12,marginBottom:12}}>{title}</Title>
                </Col>
                <Col span={24}>
                    <Row type="flex" justify="start" align="middle">
                        {this.renderUser(name, raiseTime)}
                    </Row>
                </Col>
                <Row type="flex" justify="start" align="middle" style={{ width: '100%' }}>
                    <Paragraph style={{ fontSize: 18, marginBottom: 5 }}>
                        <Description desp={desp} />
                    </Paragraph>
                </Row>
            </Row>
        )
    }

    renderAnswer = (answer) => {
        if (answer.answerer.username === this.loadStorage("user") && answer.status === 0) {
            // 是我提出的回答, 而且还在编辑中
            if (!this.state.edit) {
                this.setState({ edit: true, content: answer.content, aid: answer.id, time: answer.answerTime, dockerId: answer.dockerId })
            }
            return null
        }
        return (
            <Answer data={answer} />
        )
    }

    renderAnswers = (answer) => {
        if (answer.length === 0) {
            return (
                <Row style={{ marginTop: 100 }} type="flex" justify="center">
                    <Paragraph style={{ fontSize: 24 }}>Be the first hero.</Paragraph>
                </Row>)
        } else {
            return (
                <Row>
                    {answer.map(this.renderAnswer)}
                </Row>
            )
        }
    }
    
    renderNew() {
        if (!this.state.edit)
            return (
                <Row type="flex" justify="start" align="middle"
                    style={{ marginTop: 10, width: "100%" }}>
                    <Divider style={{ marginBottom: 10 }} />
                    <Row style={{ width: "100%", marginLeft: 5, fontSize: 18 }}>
                        你还没有提出想法呢！
                    </Row>
                    <Button
                        loading={this.state.loading}
                        size="large"
                        type="primary"
                        onClick={() => this.offer(this.state.data.id)}
                    >试着去解决问题吧！ &gt;</Button>
                </Row>
            )
        else {
            // 找到了我的处于编辑中的回答
            return (
                <Row type="flex" justify="start" align="middle"
                    style={{ marginTop: 10, width: "100%" }}>
                    <Divider style={{ margin: 0 }} direction="left">
                        <Title level={4}>我的回答</Title>
                    </Divider>
                    <Row style={{ width: "100%", marginLeft: 5, fontSize: 18 }}>
                        解决方案简明说明：
                    </Row>
                    <TextArea
                        onChange={this.onChangeDesp}
                        defaultValue={this.state.desp}
                        placeholder="(Must) Describe your solution"
                        autosize={{ minRows: 2, maxRows: 5 }}
                    />
                    <Row style={{ marginLeft: 5, width: "100%", marginBottom: 10 }} type="flex">
                        <Row style={{ width: "50%", fontSize: 16 }}>
                            Last copy of answer recovered.
                        </Row>
                        <Row style={{ width: "50%", fontSize: 16 }} type="flex" justify="end">
                            {this.state.time}
                        </Row>
                    </Row>
                    <Button
                        size="large"
                        type="primary"
                        onClick={() => this.redirectDocker(this.state.dockerId)}
                    >Enter Docker</Button>
                    <Button
                        style={{ marginLeft: 10 }}
                        size="large"
                        type="default"
                        onClick={this.save}
                    >Update Description</Button>
                    <Button
                        style={{ marginLeft: 10 }}
                        size="large"
                        type="warning"
                        onClick={this.submit}
                    >Submit</Button>
                    <Button
                    style={{ marginLeft: 10 }}
                    size="large"
                    type="warning"
                    onClick={this.cancel}
                    >Cancel</Button>
                </Row>
            )
        }
    }

    renderUser(user, time) {
        return (
            <Row type="flex" style={{ width: "100%" }}>
                <Row type="flex" align='middle' justify="start">
                    <Avatar shape="square" style={{ marginRight: 8, fontSize: 30 }} size={50}>
                        {user}
                    </Avatar>
                </Row>
                <Col span={18} style={{ padding: 2 }}>
                    <Row type="flex" align='middle' justify="start" style={{ width: "80%", fontSize: 20 }}>
                        {user}
                    </Row>
                    <Row type="flex" align='middle' justify="start" style={{ width: "80%", fontSize: 16 }}>
                        {this.handleDate(time)+' '+this.handleDate(time)}
                    </Row>
                </Col>
            </Row>
        )
    }

    render() {
        const { content, title, answer, raiseTime, questioner } = this.state.data
        return (
            <Row style={styles.container}>
                <Col lg={4} xs={1} />
                <Col lg={15} xs={22}>
                    {this.renderTitle(title, content, questioner.username, raiseTime)}
                    <Row type="flex" justify="start" style={{ marginTop: 20 }}>
                        <Divider><Title level={3}>{answer.length + " Answers"}</Title></Divider>
                    </Row>
                    {this.renderAnswers(answer)}
                    {this.renderNew()}
                </Col>
                <Col lg={5} xs={1} />
            </Row>
        )
    }

    offer = (qid) => {
        if (!this.loadStorage("user") || this.loadStorage("user") === "") {
            this.pushNotification("warning", "请先登录")
            this.props.dispatch(showSignIn())
            return null;
        }
        this.setState({ loading: true })
        var s1 = (result) => {
            if (result.status === "ok") {
                result = result.data
                this.setState({ edit: true, loading: false, dockerId: result.dockerId, aid: result.id })
                this.pushNotification("success", "Docker容器已经被创建")
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        var e1 = () => {
            this.pushNotification("warning", "请求错误");
        }

        this.post("/api/answer/create?questionId=" + qid, null, s1, e1)
    }

    save = () => {
        if (this.state.desp === null || this.state.desp === "") {
            this.pushNotification("warning", "Describe your solution, less or more")
            return null;
        }
        const { aid, desp } = this.state
        var successAction = (result) => {
            if (result.status === "ok") {
                this.pushNotification("success", "更新成功")
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        var errorAction = () => {
            this.pushNotification("warning", "更新失败");
        }

        let form = new FormData();
        form.append('content', desp);

        this.post("/api/answer/save/" + aid, form, successAction, errorAction)
    }

    submit = () => {
        if (this.state.desp === null || this.state.desp === "") {
            this.pushNotification("warning", "Describe your solution, less or more")
            return null;
        }
        const { aid } = this.state
        var successAction = (result) => {
            if (result.status === "ok") {
                this.pushNotification("success", "提交成功!")
                this.setState({ edit: false })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        var errorAction = () => {
            this.pushNotification("warning", "提交失败");
        }

        // TODO: 先保存
        this.post("/api/answer/submit/" + aid, new FormData(), successAction, errorAction)
    }

    cancel = ()=>{
        var successAction = (result) => {
            if(result.status=='ok'){
                this.setState({
                    edit:false,
                    content:'',
                    dockerId: '', 
                    aid: ''
                })
            }
            else{
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.delete('/api/answer/' + this.state.aid,successAction)
    }

    redirectDocker = (dockerId) => {
        window.open(this.ip + "/api/docker/" + dockerId, '_blank').focus();
    }
}

const styles = {
    container: {
        marginTop: "50px",
        paddingBottom: "50px"
    }
}


export default connect(mapStateToProps)(ADetail);
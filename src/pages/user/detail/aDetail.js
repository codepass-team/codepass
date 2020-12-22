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
            edit: false,
            content: "",
            dockerId: "",
            aid: "",
            answerTime: "",
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
        console.log(this.props.data)
        if (this.state.data === 0) {
            this.setState({
                data: this.props.data
            })
        }
        this.props.data.answer.map(item=>{
            if(item.username==this.loadStorage('user')){
                this.setState({found:true})
            }
        })
    }

    renderTitle = (title, content) => {
        const { raiseTime } = this.state.data
        return (
            <Row type="flex" justify="start" align="middle">
                <Col span={18}>
                    <Col span={24}>
                        <Title level={1} style={{fontWeight:600,marginTop:12,marginBottom:12}}>{title}</Title>
                    </Col>
                    <Col span={24}>
                        <Row type="flex" justify="start" align="middle">
                            {this.renderUser(this.state.data.questioner.username, raiseTime)}
                        </Row>
                    </Col>
                    <Row type="flex" justify="start" align="middle" style={{ width: '100%' }}>
                        <Paragraph style={{ fontSize: 18, marginBottom: 5 }}>
                            <Description desp={content} />
                        </Paragraph>
                    </Row>
                </Col>
                
            </Row>
        )
    }

    renderAnswer = (data) => {
        if (data.status !== 0)
            return (
                <Answer data={data} />
            )
        else {
            if (!this.state.edit) {
                this.setState({ edit: true, content: data.content, aid: data.id, answerTime: data.answerTime })
            }
        }
        return null
    }

    renderAnswers = () => {
        const { answer } = this.state.data
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
        //get prev answer of user
        if (!this.state.edit)
            return (
                <Row type="flex" justify="start" align="middle"
                    style={{ marginTop: 10, width: "100%" }}>
                    <Divider style={{ marginBottom: 10 }} />
                    <Row style={{ width: "100%", marginLeft: 5, fontSize: 18 }}>
                        You have no new idea yet.
                    </Row>
                    <Button
                        loading={this.state.loading}
                        size="large"
                        type="primary"
                        onClick={this.offer}
                    >Try out the problem! &gt;</Button>
                </Row>
            )
        else {
            return (
                <Row type="flex" justify="start" align="middle"
                    style={{ marginTop: 10, width: "100%" }}>
                    <Divider style={{ margin: 0 }} direction="left">
                        <Title level={4}>My Answer</Title>
                    </Divider>
                    <Row style={{ width: "100%", marginLeft: 5, fontSize: 18 }}>
                        Solution Brief:
                    </Row>
                    <TextArea
                        onChange={this.onChangeDesp}
                        defaultValue={this.state.content}
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
                        onClick={this.redirectDocker}
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
                </Row>
            )
        }
    }

    renderUser(user, time) {
        return (
            <Row type="flex" style={{ width: "100%" }}>
                <Row type="flex" align='middle' justify="start">
                    <Avatar shape='square' size={64} icon="user" />
                </Row>
                <Col span={18} style={{ padding: 2 }}>
                    <Row type="flex" align='middle' justify="start" style={{ width: "80%", fontSize: 20 }}>
                        {user}
                    </Row>
                    <Row type="flex" align='middle' justify="start" style={{ width: "80%", fontSize: 16 }}>
                        {this.handleDate(time)+''+this.handleTime(time)}
                    </Row>
                </Col>
            </Row>
        )
    }

    render() {
        this.state.data = this.props.data
        const { content, title, answer } = this.state.data
        return (
            <Row style={styles.container}>
                <Col lg={4} xs={1} />
                <Col lg={15} xs={22}>
                    {this.renderTitle(title, content)}
                    <Row type="flex" justify="start" style={{ marginTop: 20 }}>
                        <Divider><Title level={3}>{answer.length + " Answers"}</Title></Divider>
                    </Row>
                    {this.renderAnswers()}
                    {this.renderNew()}
                </Col>
                <Col lg={5} xs={1} />
            </Row>
        )
    }

    offer = () => {
        console.log(this.loadStorage('user'))
        if (!this.loadStorage("user") || this.loadStorage("user") === "") {
            this.pushNotification("warning", "Please Login First")
            this.props.dispatch(showSignIn())
            return null;
        }
        this.setState({ loading: true })
        console.log(this.state.data)
        const { id,content } = this.state.data
        const user = this.loadStorage("user")
        var s1 = (result) => {
            console.log(result)
            if (result.status === "ok") {
                this.setState({ edit: true, loading: false, dockerId: result.dockerId, aid: result.id })
                this.pushNotification("success", "Docker has been setup!")
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        var e1 = () => {
            this.pushNotification("warning", "Request Failed");
        }

        this.getWithErrorAction("/api/answer/create?questionId=" + id + "&content="+content
            , s1, e1)
    }

    save = () => {
        if (this.state.content === null || this.state.desp === "") {
            this.pushNotification("warning", "Describe your solution, less or more")
            return null;
        }
        const { aid, content } = this.state
        var successAction = (result) => {
            if (result.status === "ok") {
                this.pushNotification("success", "Update Succeeded")
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        var errorAction = () => {
            this.pushNotification("warning", "Update Failed");
        }

        this.getWithErrorAction("/api/answer/save?answerId=" + aid + "&content=" + escape(content), successAction, errorAction)
    }

    submit = () => {
        if (this.state.content === null || this.state.content === "") {
            this.pushNotification("warning", "Describe your solution, less or more")
            return null;
        }
        const { aid, content } = this.state
        var successAction = (result) => {
            if (result.status === "ok") {
                this.pushNotification("success", "Submit Succeeded")
                this.setState({ edit: false })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        var errorAction = () => {
            this.pushNotification("warning", "Submit Failed");
        }

        this.getWithErrorAction("/api/answer/submit?answerId=" + aid + "&content=" + escape(content), successAction, errorAction)
    }

    redirectDocker = () => {
        window.open(this.ip + "/api/docker/" + this.state.dockerId, '_blank').focus();
    }
}

const styles = {
    container: {
        marginTop: "50px",
        paddingBottom: "50px"
    }
}


export default connect(mapStateToProps)(ADetail);
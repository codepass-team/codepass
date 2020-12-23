import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Avatar, Button, Col, Divider, Icon, Input, Row, Skeleton, Typography } from 'antd';
import Answer from './answer'
import Description from '../../../components/markd/Description'
import QComment from "./qComment";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default class QDetail extends BaseComponent {
    constructor(props) {
        console.log("QDetail")
        console.log(props)
        super(props);
        this.state = {
            found: false,
            question: 0,
            answers: 0,
            submit: false,
            edit: true,

            showComment: false,
            loading2: false,
            comments: 0
        }
    }

    componentWillMount() {
        // this.props.data是detail传来的questionEntity对象
        this.state.question = this.props.question
        this.state.answers = this.props.question.answer
        this.state.submit = this.props.question.status
        this.state.edit = !this.props.question.status
    }

    onChangeDesp = ({ target: { value } }) => {
        var q = this.state.question
        q.content = value
        this.setState({
            question: q
        })
    };

    like = () => {
        this.post('/api/question/like/' + this.state.question.id, null, (res) => {
            if (res.status === 'ok') {
                this.setState({
                    ulike: true
                })
            }
        })
    }

    unlike = () => {
        this.post('/api/question/unlike/' + this.state.question.id, null, (res) => {
            if (res.status === 'ok') {
                this.setState({
                    ulike: false
                })
            }
        })
    }

    showComment = () => {
        this.setState({
            showComment: true,
        })
        if (this.state.comments === 0) {
            this.setState({
                loading2: true,
            })
            this.get('/api/comment/question/' + this.state.question.id, (res) => {
                if (res.status === 'ok') {
                    this.setState({
                        comments: res.data,
                        loading2: false
                    })
                }
            })
        }
    }

    hideComment = () => {
        this.setState({
            showComment: false
        })
    }

    renderTitle = (title, content) => {
        const { edit } = this.state
        const { raiseTime } = this.state.question
        return (
            <Row type="flex" justify="start" align="middle">
                <Col span={18}>
                    <Col span={24}>
                        <Title level={1} style={{ fontWeight: 600, marginTop: 12, marginBottom: 12 }}>{title}
                        </Title>
                    </Col>
                    <Row type="flex" justify="start" align="middle" style={{ width: '100%' }}>
                        {!edit ? (<Paragraph style={{ fontSize: 15, lineHeight: '25px', marginVertical: 5 }}>
                            <Description desp={content} />
                        </Paragraph>) :
                            <TextArea
                                style={{ fontSize: 18 }}
                                onChange={this.onChangeDesp}
                                // defaultValue={this.state.question.desp}
                                placeholder="(可选) 添加问题描述"
                                autosize={{ minRows: 2, maxRows: 5 }}
                            />}
                    </Row>
                </Col>
                <Col span={6}>
                    <Row type="flex" justify="start" align="middle">
                        {this.renderUser(this.state.question.questioner.username, raiseTime)}
                    </Row>
                </Col>
                <Col span={24}>
                    {!this.state.ulike ?
                        <Button onClick={this.like}>点赞</Button> :
                        <Button onClick={this.unlike}>取消点赞</Button>
                    }
                    {!this.state.showComment ?
                        <Button onClick={this.showComment}>评论</Button> :
                        <Button onClick={this.hideComment}>收起评论</Button>
                    }
                </Col>
                {this.state.showComment ?
                    this.state.loading2 ?
                        <Skeleton />
                        :
                        <Col span={24}>
                            <QComment comments={this.state.comments} questionId={this.state.question.id} />
                        </Col> : null
                }
            </Row>
        )
    }

    redirectDocker = (dockerId) => {
        window.open(this.ip + "/api/docker/" + dockerId, '_blank').focus();
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
                        {this.handleDate(time) + '' + this.handleTime(time)}
                    </Row>
                </Col>
            </Row>
        )
    }

    renderConfirm = () => {
        if (this.state.submit)
            return null;
        else {
            return (
                <Row type="flex" justify="start" align="middle">
                    <Divider style={{ width: "100%", marginBottom: 3 }} />
                    {!this.state.submit ?
                        <Row type="flex" justify="start" align="middle" style={{ width: "100%" }}>
                            <Typography style={{ fontSize: 18 }}>Docker-{this.state.question.dockerId} is
                                running</Typography>
                            <Icon type="loading" style={{ marginLeft: 10 }} />
                        </Row> : null}
                    <Button
                        style={{ marginTop: 10 }}
                        size="large"
                        type="primary"
                        onClick={() => this.redirectDocker(this.state.question.dockerId)}
                    >进入Docker容器</Button>
                    {this.state.edit ? (
                        <Button
                            style={{ marginTop: 10, marginLeft: 10 }}
                            size="large"
                            type="default"
                            onClick={this.save}
                        >保存问题描述</Button>
                    ) : (
                            <Button
                                style={{ marginTop: 10, marginLeft: 10 }}
                                size="large"
                                type="default"
                                onClick={() => {
                                    this.setState({ edit: true })
                                }}
                            >编辑问题描述</Button>
                        )}
                    <Button
                        style={{ marginTop: 10, marginLeft: 10 }}
                        size="large"
                        type="warning"
                        onClick={this.submit}
                    >提交问题</Button>
                </Row>
            )
        }
    }

    renderAnswer = (data) => {
        return (
            <Answer data={data} />
        )
    }

    renderAnswers = () => {
        if (this.state.submit) {
            const answers = this.state.answers
            if (answers.length === 0) {
                return (
                    <Row style={{ marginTop: 100 }} type="flex" justify="center">
                        <Paragraph style={{ fontSize: 24 }}>Kept you waiting, huh?</Paragraph>
                    </Row>)
            } else {
                return (
                    <Row>
                        {answers.map(this.renderAnswer)}
                    </Row>
                )
            }
        } else {
            return (
                <Row style={{ marginTop: 100 }} type="flex" justify="center">
                    <Paragraph style={{ fontSize: 24 }}>Submit the question to make it visible online</Paragraph>
                </Row>
            )
        }
    }

    render() {
        const { content, title, answer } = this.state.question
        return (
            <Row style={styles.container}>
                <Col lg={4} xs={1} />
                <Col lg={15} xs={22}>
                    {this.renderTitle(title, content)}
                    {this.renderConfirm()}
                    <Row type="flex" justify="start" style={{ marginTop: 20 }}>
                        <Divider><Title level={3}>{answer.length + " Answers"}</Title></Divider>
                    </Row>
                    {this.renderAnswers()}
                </Col>
                <Col lg={5} xs={1} />
            </Row>
        )
    }

    save = () => {
        const { id, title, content } = this.state.question
        var successAction = (result) => {
            if (result.status === "ok") {
                this.pushNotification("success", "问题已保存")
                this.setState({ edit: false })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        var errorAction = () => {
            this.pushNotification("warning", "Update Failed");
        }

        let form = new FormData();
        form.append('title', title);
        form.append('content', content);

        this.post("/api/question/save/" + id, form, successAction, errorAction)
    }


    submit = () => {
        const { id, title, content } = this.state.question
        var successAction = (result) => {
            if (result.status === "ok") {
                this.pushNotification("success", "问题已提交")
                this.setState({ submit: true, edit: false })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        var errorAction = () => {
            this.pushNotification("warning", "提交失败");
        }

        // TODO: 如果正在编辑状态, 先save一下
        // if (this.state.edit) {
        //     this.save()
        // }
        this.post("/api/question/submit/" + id, new FormData(), successAction, errorAction)
    }
}

const styles = {
    container: {
        marginTop: "50px"
    }
}


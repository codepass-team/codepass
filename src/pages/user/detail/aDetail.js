import React from "react"
import { connect } from 'react-redux'
import { Avatar, Button, Col, Divider, Input, Row, Skeleton, Typography, Icon } from 'antd'
import Answer from './answer'
import BaseComponent from '../../../components/BaseComponent'
import Description from '../../../components/markd/Description'
import { showSignIn } from "../../../redux/actions/action"
import QComment from './qComment'
import { HeartTwoTone } from '@ant-design/icons'
import MyAvatar from "../../handleAvatar"

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const mapStateToProps = state => ({
    keyword: state.keywordReducer.keyword,
})

class ADetail extends BaseComponent {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            found: false,
            question: 0,
            edit: false, // 我是否有回答
            answers: 0,
            content: "", // 我的回答内容
            dockerId: "",
            aid: "",
            time: "",
            id: props.question.questioner.id,
            name: props.question.questioner.username,
            loading: false,

            showComment: false,
            loading2: false,
            comments: 0,
            likeCount: 0,
            ufol: 0,
            ufollow: 0,
            ulike: 0,
        }
    }

    onChangeDesp = ({ target: { value } }) => {
        this.setState({
            content: value
        })
    };

    componentWillMount() {
        //get my answer
        if (this.state.question === 0) {
            this.setState({
                question: this.props.question,
                answers: this.props.question.answer,
                ulike: this.props.question.ulike,
                likeCount: this.props.question.likeCount,
            })
        }
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
                <Col span={17}>
                    <Title level={1} style={{ fontWeight: 600, marginBottom: 4 }}>{title}</Title>
                </Col>
                <Col span={7}>
                    <Row type="flex" justify="start" align="middle">
                        {this.renderUser(name, raiseTime)}
                    </Row>
                </Col>
                <Row type="flex" justify="start" align="middle" style={{ width: '100%' }}>
                    <Paragraph style={{ fontSize: 18, marginBottom: 5 }}>
                        <Description desp={desp} />
                    </Paragraph>
                </Row>
                <Row type='flex' justify="space-between" style={{marginTop:10}}>
                    <Col span={20} style={{paddingTop:3}}>
                        {this.renderCheck()}
                    </Col>
                    <Col span={4}>
                        {!this.state.showComment ?
                            <Button onClick={this.showComment} type='primary'>评论</Button> :
                            <Button onClick={this.hideComment} type='dashed'>收起评论</Button>
                        }
                    </Col>
                </Row>
                {this.state.showComment ?
                    this.state.loading2 ?
                        <Skeleton />
                        :
                        <Col span={24}>
                            <QComment user={this.state.question.questioner}
                                comments={this.state.comments}
                                questionId={this.state.question.id} />
                        </Col> : null
                }
            </Row >
        )
    }

    renderAnswer = (answer,index) => {
        console.log(answer);
        if (answer.answerer.username === this.loadStorage("user") && answer.status === 0) {
            // 是我提出的回答, 而且还在编辑中
            if (!this.state.edit) {
                this.setState({ edit: true, content: answer.content, aid: answer.id, time: answer.answerTime, dockerId: answer.dockerId })
            }
            return null
        }
        return (
            <Answer data={answer} key={index}/>
        )
    }

    renderAnswers = (answers) => {
        if (answers.length === 0) {
            return (
                <Row style={{ marginTop: 100 }} type="flex" justify="center">
                    <Paragraph style={{ fontSize: 24 }}>去做第一个英雄吧！</Paragraph>
                </Row>)
        } else {
            return (
                <Row>
                    {answers.map(this.renderAnswer)}
                </Row>
            )
        }
    }
    renderCheck = () => {
        const { likeCount, ulike } = this.state
        if (!likeCount) {
            return (
                <Col style={{ width: "100%", marginLeft: 5, fontSize: 18 }} span={24}>
                    该问题还没有人点赞哦！
                    <HeartTwoTone twoToneColor="#1890ff"
                        onClick={() => this.check(1)}
                    />
                </Col>
            )
        } else {
            if (!ulike) {
                return (
                    <Col style={{ width: "100%", marginLeft: 5, fontSize: 18 }}  span={24}>

                        <HeartTwoTone twoToneColor="#1890ff"
                            onClick={() => this.check(1)}
                        />
                        X
                        {likeCount}
                    </Col>
                )
            } else {
                return (
                    <Col style={{ width: "100%", marginLeft: 5, fontSize: 18 }} span={24}>

                        <HeartTwoTone twoToneColor="#cf1322"
                            onClick={() => this.check(0)}
                        />
                        X
                        {likeCount}
                    </Col>
                )
            }

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
                        onClick={() => this.offer(this.state.question.id)}
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
                        placeholder="必须描述你的问题"
                        autosize={{ minRows: 2, maxRows: 5 }}
                    />
                    <Row style={{ marginLeft: 5, width: "100%", marginBottom: 10 }} type="flex">
                        <Row style={{ width: "50%", fontSize: 16 }}>
                            最后对问题的复制被覆盖。
                        </Row>
                        <Row style={{ width: "50%", fontSize: 16 }} type="flex" justify="end">
                            {this.state.time}
                        </Row>
                    </Row>
                    <Button
                        size="large"
                        type="primary"
                        onClick={() => this.redirectDocker(this.state.dockerId)}
                    >进入Docker容器</Button>
                    <Button
                        style={{ marginLeft: 10 }}
                        size="large"
                        type="default"
                        onClick={this.save}
                    >更新描述</Button>
                    <Button
                        style={{ marginLeft: 10 }}
                        size="large"
                        type="warning"
                        onClick={this.submit}
                    >提交</Button>
                    <Button
                        style={{ marginLeft: 10 }}
                        size="large"
                        type="warning"
                        onClick={this.cancel}
                    >取消</Button>
                </Row >
            )
        }
    }

    follow = () => {
        console.log(this.state.question.questioner.id);
        this.post('/api/user/follow/' + this.state.question.questioner.id, null, (res) => {
            if (res.status === 'ok') {
                this.setState({
                    ufol: false
                })
            }
        })
    }

    check = (bool1) => {
        if (bool1 === 1) {
            this.post('/api/question/like/' + this.state.question.id, null, (res) => {
                if (res.status === 'ok') {
                    this.setState({
                        ulike: true,
                        likeCount: this.state.likeCount + 1
                    })
                    this.pushNotification("success", "点赞成功")
                } else {
                    this.pushNotification("danger", "点赞失败")
                }
            })

        } else {
            this.post('/api/question/unlike/' + this.state.question.id, null, (res) => {
                if (res.status === 'ok') {
                    this.setState({
                        ulike: false,
                        likeCount: this.state.likeCount - 1
                    })
                    this.pushNotification("success", "取消点赞成功")
                } else {
                    this.pushNotification("danger", "取消点赞失败")
                }
            })

        }
    }
    unfollow = () => {
        this.post('/api/user/unfollow/' + this.state.question.questioner.id, null, (res) => {
            if (res.status === 'ok') {
                this.setState({
                    ufol: false
                })
            }
        })
    }

    renderUser(user, time) {
        return (
            <Row type="flex" style={{ width: "100%" }}>
                <Col type="flex" align='middle' justify="start">
                    <MyAvatar id={this.state.id} name={this.state.name}></MyAvatar>
                </Col>
                <Col span={18} style={{ padding: 2 }}>
                    <Row type="flex" align='middle' justify="start" style={{ width: "80%", fontSize: 20 }}>
                        <Col style={{ marginRight: 10, marginBottom: 5 }}>{user}</Col>
                        {/* {!this.state.ufol ?
                            <Button onClick={this.follow} size="small" type="primary"><Icon type="plus" />关注</Button>
                            : <Button onClick={this.unfollow} size="small" type="dashed"><Icon type="close" />取消关注</Button>
                        } */}
                    </Row>
                    <Row type="flex" align='middle' justify="start" style={{ width: "80%", fontSize: 16 }}>
                        {this.handleDate(time) + ' ' + this.handleTime(time)}
                    </Row>
                </Col>
            </Row>
        )
    }

    render() {
        const { content, title, raiseTime, questioner } = this.state.question
        return (
            <Row style={styles.container}>
                <Col lg={4} xs={1} />
                <Col lg={15} xs={22}>
                    {this.renderTitle(title, content, questioner.username, raiseTime)}
                    <Row type="flex" justify="start" style={{ marginTop: 20 }}>
                        <Divider><Title level={3}>{this.state.answers.length + " 回答"}</Title></Divider>
                    </Row>
                    {this.renderAnswers(this.state.answers)}
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
        if (this.state.content === null || this.state.content === "") {
            this.pushNotification("warning", "Describe your solution, less or more")
            return Promise.reject();
        }
        const { aid, content } = this.state
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
        form.append('content', content);

        return this.post("/api/answer/save/" + aid, form, successAction, errorAction)
    }

    submit = () => {
        if (this.state.desp === null || this.state.desp === "") {
            this.pushNotification("warning", "请或多或少地描述你的问题")
            return null;
        }
        const { aid } = this.state
        var successAction = (result) => {
            if (result.status === "ok") {
                this.pushNotification("success", "提交成功!")
                this.setState({
                    edit: false,
                    answers: [...this.state.answers, result.data]
                })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        var errorAction = () => {
            this.pushNotification("warning", "提交失败");
        }

        // TODO: 先保存
        this.save()
            .then(() => this.post("/api/answer/submit/" + aid, null, successAction, errorAction))
    }

    cancel = () => {
        var successAction = (result) => {
            if (result.status == 'ok') {
                this.setState({
                    edit: false,
                    content: '',
                    dockerId: '',
                    aid: ''
                })
            }
            else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.delete('/api/answer/' + this.state.aid, successAction)
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
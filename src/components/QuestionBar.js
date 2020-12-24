import React from "react";
import { AutoComplete, Button, Card, Input, List, Row, Skeleton } from 'antd';
import BaseComponent from './BaseComponent'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { showSignIn } from "../redux/actions/action";

const { TextArea } = Input;
const mapStateToProps = state => ({
    keyword: state.keywordReducer.keyword,
})

class QuestionBar extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isEnter: false,
            title: "",
            desp: "",
            loading: false,
            loading2: true,
            caption: "Submit",
            dockerId: "",
            qid: 0,
            optData: [
                { title: "CodePass 使用指南", content: "CodePass 使用指南" },
                { title: "Hello world", content: "测试提问" },
            ],
            optVis: false,
        }
    };

    timeout(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms, 'done');
        });
    }

    request = () => {
        this.setState({ optVis: false })
        if (!this.loadStorage("user") || this.loadStorage("user") === "") {
            this.pushNotification("warning", "请先登录")
            this.props.dispatch(showSignIn())
            return null;
        }
        const title = this.state.title
        if (title === "") {
            this.pushNotification("warning", "标题不能为空")
            return null;
        }
        this.setState({ loading: true })

        let form = new FormData();
        form.append('title', title);

        //request
        var successAction = (result) => {
            if (result.status === "ok") {
                result = result.data
                this.setState({ loading: false, dockerId: result.dockerId, qid: result.id })
                this.pushNotification("success", "Docker容器现在创建好了!")
                this.timeout(600).then(() =>
                    this.setState({ loading2: false })
                )
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        var errorAction = (result) => {
            this.pushNotification("warning", "请求失败");
        }
        this.post("/api/question/create", form, successAction, errorAction)
    }

    redirectDocker = () => {
        window.open(this.ip + "/api/docker/" + this.state.dockerId, '_blank').focus();
    }

    submit = () => {
        const { qid, title, desp } = this.state
        const user = this.loadStorage("user")

        let form = new FormData();
        form.append('title', title);
        form.append('content', desp);

        var successAction = (result) => {
            if (result.status === "ok") {
                this.setState({ loading: false, dockerId: result.dockerId, qid: result.qid })
                this.pushNotification("success", "问题已经保存")
                this.timeout(600).then(() =>
                    this.props.history.push({ pathname: "/user/detail", state: { id: qid, user, completed: false } })
                )
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        var errorAction = (result) => {
            this.pushNotification("warning", "提交失败");
        }

        this.post("/api/question/save/" + qid, form, successAction, errorAction)
            .then(() => {
                this.post("/api/question/submit/" + qid)
            })
    }

    renderDocker = () => {
        const dockerId = this.state.dockerId
        var style = { width: '100%', opacity: 0.9, fontFamily: "Georgia", fontSize: 18 }
        if (dockerId !== "") {
            if (this.state.loading2) {
                return (
                    <Card style={style}>
                        <Skeleton active />
                    </Card>
                )
            } else {
                return (
                    <Card style={style}>
                        <Input
                            style={{ marginBottom: 3, fontWeight: "bold" }}
                            defaultValue={this.state.title}
                            onChange={(e) => this.onChangeTitle(e, false)}
                        />
                        <TextArea
                            addonBefore="描述您的问题"
                            onChange={this.onChangeDesp}
                            placeholder="请在这里附上更多问题描述以帮助您的问题收获更合适回答"
                            autosize={{ minRows: 2, maxRows: 5 }}
                        />
                        <Row style={{ width: "100%", fontSize: 14, marginTop: 7 }} type="flex" justify="end">
                            Docker容器-{dockerId}已经被建立好了！
                        </Row>
                        <Row style={{ width: "100%" }} type="flex" justify="end">
                            <Button
                                style={{ marginTop: 5 }}
                                size="large"
                                type="primary"
                                onClick={this.redirectDocker}
                            >现在打开您的Docker容器来给我们展示你的代码吧！</Button>
                        </Row>
                        <Row style={{ width: "100%" }} type="flex" justify="end">
                            <Button
                                style={{ marginTop: 5 }}
                                size="large"
                                type="link"
                                onClick={this.submit}
                            >进入问题详情页</Button>
                        </Row>
                    </Card>
                )
            }
        } else {
            return null;
        }
    }

    onChangeTitle = (value, search) => {
        this.setState({
            title: value
        })
        if (search) {
            if (value === "") {
                this.setState({ optVis: false })
            } else {
                this.setState({ optVis: true })
                this.get("/api/question/search?keywords=" + value, result => {
                    if (result.status === "ok") {
                        this.setState({
                            optData: result.data
                        })
                    }
                })
            }
        }
    }

    onChangeDesp = ({ target: { value } }) => {
        this.setState({
            desp: value
        })
    };


    renderOpt() {
        if (this.state.optVis) {
            console.log(this.state.optData)
            return <div><span style={{ fontSize: 22 }}>您可能想问:</span>
                <List
                    bordered={true}
                    itemLayout="horizontal"
                    dataSource={this.state.optData}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a title={"请浏览问题的细节"}
                                    style={{ color: "white", fontSize: 22 }} onClick={() => {
                                        let tx = this.loadStorage("user")
                                        let qid = item.id
                                        // 页面跳转时传参数
                                        this.props.history.push({
                                            pathname: "/user/detail",
                                            state: { id: qid, tx, completed: true }
                                        })
                                    }}>{item.title}</a>}
                                description={<span style={{ color: "white" }}>{item.description}</span>}
                            />
                        </List.Item>
                    )}
                /></div>
        } else {

        }
    }

    renderInput = () => {
        let style = {}
        if (this.state.isEnter)
            style = { width: '100%', opacity: 0.8, fontFamily: "Georgia", fontSize: 18 }
        else
            style = { width: '100%', opacity: 0.4, fontFamily: "Georgia", fontSize: 18 }
        return (
            <AutoComplete
                size="large"
                style={style}
                onChange={(e) => this.onChangeTitle(e, true)}
                disabled={this.state.dockerId !== ""}
                placeholder="描述您遇到的问题">
                <Input
                    suffix={
                        <Button
                            className="search-btn"
                            style={{ marginRight: -12 }}
                            size="large"
                            type="link"
                            loading={this.state.loading}
                            onClick={this.request}
                            disabled={this.state.dockerId !== ""}
                        >
                            提问
                        </Button>}
                />
            </AutoComplete>
        )
    }

    render() {
        return (
            <div
                onClick={() => this.setState({ isEnter: true })}>
                {this.renderInput()}
                {this.renderOpt()}
                {this.renderDocker()}
            </div>
        );
    }
}

export default connect(mapStateToProps)(withRouter(QuestionBar));
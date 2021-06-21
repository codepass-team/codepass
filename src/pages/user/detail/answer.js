import React from "react"
import BaseComponent from '../../../components/BaseComponent'
import copy from 'copy-to-clipboard'
import { withRouter } from "react-router-dom"
import Description from '../../../components/markd/Description'
import { Avatar, Card, Col, Collapse, Row, Typography } from 'antd'
import { Diff2Html } from "diff2html"
import "./resource/diff.css"
import MyAvatar from "../../handleAvatar"

const { Paragraph } = Typography
const { Panel } = Collapse

class Answer extends BaseComponent {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            desp: 1,
        }
    };

    handleCopy = (dockerId) => {
        if (copy(dockerId + ""))
            this.pushNotification("success", "Docker-" + dockerId + " has been copied. Please open it in VS Code")
        else
            this.pushNotification("warning", "Copy Failed")
    }

    renderUser(user, time) {
        return (
            <Row type="flex" style={{ width: "100%" }}>
                <Row type="flex" align='middle' justify="start">
                    <MyAvatar id={this.props.data.answerer.id} name={this.props.data.answerer.username}></MyAvatar>
                </Row>
                <Col span={18} style={{ padding: 2 }}>
                    <Row type="flex" align='middle' justify="start" style={{ width: "80%", fontSize: 24 }}>
                        {user}
                    </Row>
                    <Row type="flex" align='middle' justify="start" style={{ width: "80%", fontSize: 14 }}>
                        {this.handleDate(this.props.data.answerTime)+ ' '+this.handleTime(this.props.data.answerTime)}
                    </Row>
                </Col>
            </Row>
        )
    }

    render() {
        const { content, diff, time, answerer } = this.props.data
        return (
            <Card style={{ marginBottom: 15 }}>
                <Row style={{ width: "100%" }}>
                    {this.renderUser(answerer.username, time)}
                </Row>
                <Paragraph style={{ fontSize: 22 }}>
                    <Description desp={content} />
                </Paragraph>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="展示代码" key="1">
                        {this.renderDiff(diff)}
                    </Panel>
                </Collapse>
            </Card>
        )
    }

    renderDiff = (diff) => {
        var html = Diff2Html.getPrettyHtml(diff, {
            inputFormat: "diff",
            showFiles: true,
            matching: "lines",
            outputFormat: "side-by-side"
        });
        html = html.replace(/href/g, "file")
        return (
            <div dangerouslySetInnerHTML={{ __html: html }} />
        )
    }
}


export default withRouter(Answer);

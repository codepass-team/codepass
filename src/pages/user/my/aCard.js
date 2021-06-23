import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import copy from 'copy-to-clipboard';
import { withRouter } from "react-router-dom";
import { Card, Col, Icon, Row } from 'antd';


class ACard extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
    };

    // getAnswer = (data) => {
    //     for (var i = 0; i < data.length; i++) {
    //         const item = data[i]
    //         if (item.user === this.loadStorage("user")) {
    //             return item
    //         }
    //     }
    // }

    // onChangeDesp = ({target: {value}}) => {
    //     this.setState({
    //         desp: value
    //     })
    // };

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
        this.props.history.push({ pathname: '/user/detail', state: { id: qid, user } })
    }

    renderStatus = () => {
        if (this.props.data.status == '1')
            return <p style={{ fontStyle: 'Italic', marginBottom: 0 }}>
                {this.handleDate(this.props.data.answerTime) + ' ' + this.handleTime(this.props.data.answerTime)}
            </p>
        else return <p style={{ fontStyle: 'Italic', marginBottom: 0 }}>已保存</p>
    }

    render() {
        const { questioner, questionId, content, likeCount, questionTitle } = this.props.data
        let user = questioner.username
        // const my = this.getAnswer(test.answer)
        // if (!my || !my.dockerId) {
        //     return null
        // }
        // if (this.state.desp === 1)
        //     this.state.desp = my.desp
        return (
            <Card style={{ marginTop: 8 }} bodyStyle={{ paddingTop: 12, paddingBottom: 6, margin: 0 }}>
                <Row style={{ fontSize: 14, marginBottom: 5 }} type="flex" justify="start" align="middle">
                    <h2 style={{ fontWeight: 600, marginBottom: 0 }}>
                        {questionTitle}
                    </h2>
                    <Icon type="delete" style={{ marginLeft: 5, marginTop: 3 }} onClick={() => this.props.deleteACard(this.props.index)} />
                </Row>
                <Row type="flex" justify="start" align="middle" style={{ fontSize: 16, width: "100%", marginTop: 2, minHeight: 25, textOverflow: 'hidden' }}>
                    <a onClick={() => {
                        this.props.history.push({
                            pathname: "/user/detail",
                            state: { id: questionId, user, completed: true }
                        })
                    }}>
                        {content}
                    </a>
                </Row>
                <Row style={{ width: "100%", marginTop: 6, marginBottom: 6 }} type="flex" justify="start" align='middle'>
                    <Col span={2}>
                        <Icon type="fire" style={{ marginRight: 5, fontSize: 13 }} />
                        {likeCount}
                    </Col>
                    <Col span={12}>
                        {this.renderStatus()}
                    </Col>
                </Row>
            </Card>
        );
    }
}


export default withRouter(ACard);

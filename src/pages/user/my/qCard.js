import React from "react"
import BaseComponent from '../../../components/BaseComponent'
import { withRouter } from "react-router-dom"
import User from '../../../components/auth/user'
import { Card, Col, Icon, Row, Typography } from 'antd'
import Description from '../../../components/markd/Description'



class QCard extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    renderTitle = (title, likeCount, user, qid) => {
        return (
            <Card style={{ marginTop: 8 }} bodyStyle={{ paddingTop: 12, paddingBottom: 12, margin: 0 }}>
                <Col span={12} style={{ fontSize: 18, paddingLeft: 5, paddingTop: 3 }}>
                    <a onClick={() => {
                        this.props.history.push({
                            pathname: "/user/detail",
                            state: { id: qid, user, completed: true }
                        })
                    }}>
                        {title}
                    </a>
                    <Icon type="fire" style={{ marginRight: 5, marginLeft: 5, fontSize: 13 }} />
                    <p style={{ fontSize: 13, display: 'inline' }}>{likeCount == null ? 0 : likeCount}</p>
                </Col>
                <Col span={12}>
                    <Col span={2} style={{ marginLeft: 140 }}>
                        <Icon type="delete" style={{ paddingTop: 10 }} onClick={() => this.props.deleteQCard(this.props.index)} />
                    </Col>
                    <Col span={6}>{this.renderStatus()}</Col>
                </Col>
            </Card>
        );
    }

    renderStatus = () => {
        if (this.props.data.status == '1')
            return <p style={{ fontStyle: 'Italic', marginBottom: 0, paddingTop: 7 }}>
                {this.handleDate(this.props.data.raiseTime) + ' ' + this.handleTime(this.props.data.raiseTime)}
            </p>
        else return <p style={{ fontStyle: 'Italic', marginBottom: 0, paddingTop: 7 }}>已保存</p>
    }

    render() {
        const { id, title, likeCount, questioner } = this.props.data
        console.log(this.props.data)
        return (
            this.renderTitle(title, likeCount, questioner.username, id)
        );
    }
}


export default withRouter(QCard);

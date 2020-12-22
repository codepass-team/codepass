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
            LikeIconColor: '#1890ff'
        }
    }

    changeLikeColor = () => {
        if (this.state.LikeIconColor == '#33ff33') {
            Icon.setTwoToneColor('#1890ff')
            this.setState({ LikeIconColor: '#1890ff' })
        }
        else {
            Icon.setTwoToneColor('#33ff33')
            this.setState({ LikeIconColor: '#33ff33' })
        }
    }

    renderTitle = (title, likeCount, user, qid) => {
        return (
            <Card style={{ marginTop: 8 }} bodyStyle={{ paddingTop: 12, paddingBottom: 12, margin: 0 }}>
                <Col span={12} style={{ fontSize: 18, paddingLeft: 5, paddingTop: 3 }}>
                    <a onClick={() => {
                        this.props.history.push({
                            pathname: "/user/detail",
                            state: { qid, user, completed: true }
                        })
                    }}>
                        {title}
                    </a>
                    <Icon type="fire" style={{ marginRight: 5, marginLeft: 5, fontSize: 13 }} onClick={this.changeLikeColor} />
                    <p style={{ fontSize: 13, display: 'inline' }}>{likeCount}</p>
                </Col>
                <Col span={12}>
                    <Col span={2} offset={13}><Icon type="edit" style={{marginRight: 8,padding:10 }} /></Col>
                    <Col span={2}><Icon type="delete" style={{paddingTop:10 }} /></Col>
                    <Col span={7}>{this.renderStatus()}</Col>
                </Col>
            </Card>
        );
    }

    renderStatus = () => {
        if (this.props.data.status == '1')
            return <p style={{ fontStyle: 'Italic', marginBottom: 0, float: 'right', paddingTop: 7 }}>
                {this.handleDate(this.props.data.raiseTime) + ' ' + this.handleTime(this.props.data.raiseTime)}
            </p>
        else return <p style={{ fontStyle: 'Italic', marginBottom: 0, float: 'right', paddingTop: 5 }}>已保存</p>
    }

    render() {
        const { id, title, likeCount, questioner } = this.props.data
        return (
            this.renderTitle(title, likeCount, questioner.username, id)
        );
    }
}


export default withRouter(QCard);

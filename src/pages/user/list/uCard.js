import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Avatar, Card, Col, Row, Typography } from 'antd';
import User from '../../../components/auth/user'
import Description from '../../../components/markd/Description'
import { withRouter } from "react-router-dom";
import MyAvatar from '../../handleAvatar'

const { Title, Paragraph } = Typography;


class UCard extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            desp: 1,
        }
    };

    renderTitle = (title, desp, user, time, id, likeCount, collectCount, commentCount, userid) => {
        return (
            <Card
                style={{ width: "100%", marginBottom: 10 }}
                title={<Title level={3}>
                    {<a onClick={() => {
                        this.props.history.push({
                            pathname: "/user/detail",
                            state: { id, user, completed: true }
                        })
                    }}>{title}</a>}</Title>}>

                <Col span={2}>
                    <MyAvatar id={userid} name={user} shape="square"></MyAvatar>
                </Col>
                <Col span={5}>
                    <User user={user} />
                </Col>
                <Col span={9}></Col>
                <Col span={8}>
                    <Paragraph style={{ fontSize: 18, paddingTop: 3, float: 'right' }}>{this.handleDate(time) + ' ' + this.handleTime(time)}</Paragraph>
                </Col>
                <Row type="flex" justify="start" align="middle" style={{ width: '100%' }}>
                    <Paragraph style={{ fontSize: 14, fontWeight: 400, marginBottom: 5 }}>
                        <Description desp={'问题描述: ' + desp || '提问者没有填写问题描述'} />
                    </Paragraph>
                </Row>
                <Row type="flex" justify="start" align="middle" style={{ width: '100%' }}>
                    <Col span={4}>{likeCount || 0} 点赞</Col>
                    <Col span={4}>{collectCount || 0} 关注</Col>
                    <Col span={4}>{commentCount || 0} 评论</Col>
                    <Col span={12}></Col>
                </Row>
            </Card>
        );
    }

    render() {
        const { id, title, content, questioner, raiseTime, likeCount, collectCount, commentCount } = this.props.data
        return (
            this.renderTitle(title, content, questioner.username, raiseTime, id, likeCount, collectCount, commentCount, questioner.id)
        );
    }
}


export default withRouter(UCard);


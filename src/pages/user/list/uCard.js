import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Card, Col, Row, Typography } from 'antd';
import User from '../../../components/auth/user'
import Description from '../../../components/markd/Description'
import { withRouter } from "react-router-dom";

const { Title, Paragraph } = Typography;



class UCard extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            desp: 1,
        }
    };

    renderTitle = (title, desp, user, time, qid) => {
        console.log(title, desp, user, time, qid)
        return (
            <Card
                style={{ width: "100%", marginBottom: 10 }}
                title={<Title level={3}>
                    {<a onClick={() => {
                        this.props.history.push({
                            pathname: "/user/detail",
                            state: { qid, user, completed: true }
                        })
                    }}>{title}</a>}</Title>}>

                <Col span={12}>
                    <User user={user} />
                </Col>
                <Col span={12}>
                    <Paragraph style={{ fontSize: 18, paddingTop: 3, float: 'right' }}>{this.handleDate(time) + ' ' + this.handleTime(time)}</Paragraph>
                </Col>
                <Row type="flex" justify="start" align="middle" style={{ width: '100%' }}>
                    <Paragraph style={{ fontSize: 14, fontWeight: 400, marginBottom: 5 }}>
                        <Description desp={desp} />
                    </Paragraph>
                </Row>
            </Card>
        );
    }

    render() {
        console.log(this.props.data)
        const { id, title, content, questioner, raiseTime } = this.props.data
        return (
            this.renderTitle(title, content, questioner.username, raiseTime, id)
        );
    }
}


export default withRouter(UCard);


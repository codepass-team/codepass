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

    componentWillMount() {
    }

    renderTitle = (title, desp, user, time, qid) => {
        return (
            <Card
                style={{ width: "100%", marginBottom: 20 }}
                title={<Title level={3}>
                    {<a onClick={() => {
                        this.props.history.push({
                            pathname: "/user/detail",
                            state: { qid, user, completed: true }
                        })
                    }}>{title}</a>}</Title>}>

                <Col span={24}>
                    <Row type="flex" justify="start" align="middle">
                        <User user={user} />
                    </Row>
                </Col>
                <Col span={24}>
                    <Paragraph style={{ fontSize: 18, marginBottom: 5 }}>{time}</Paragraph>
                </Col>
                <Row type="flex" justify="start" align="middle" style={{ width: '100%' }}>
                    <Paragraph style={{ fontSize: 18, marginBottom: 5 }}>
                        <Description desp={desp} />
                    </Paragraph>
                </Row>
            </Card>


        );


    }

    render() {
        const { title, desp, user, time } = this.props.data
        const qid = this.props.data.qid
        return (
            this.renderTitle(title, desp, user, time, qid)
        );
    }
}


export default withRouter(UCard);


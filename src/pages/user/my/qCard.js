import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { withRouter } from "react-router-dom";
import User from '../../../components/auth/user'
import { Card, Row, Typography } from 'antd';
import Description from '../../../components/markd/Description'

const { Paragraph } = Typography;


class QCard extends BaseComponent {

    renderTitle = (title, desp, user, time, qid) => {
        return (
            <Card style={{ marginTop: 8 }} bodyStyle={{ paddingTop: 12, paddingBottom: 12, margin: 0 }}>
                <Row style={{ fontSize: 14, marginBottom: 5 }} type="flex" justify="start" align="middle">
                    <Row style={{ width: "50%" }}>
                        <User user={user} small />
                    </Row>
                    <Row style={{ width: "50%" }} type="flex" justify="end">
                        {time}
                    </Row>
                </Row>
                <Row type="flex" justify="start" align="middle" style={{ fontSize: 18, width: "100%", marginBottom: 3 }}>
                    <a onClick={() => {
                        this.props.history.push({
                            pathname: "/user/detail",
                            state: { qid, user, completed: true }
                        })
                    }}>
                        {title}
                    </a>
                </Row>
                <Paragraph style={{ marginBottom: 0 }}>
                    <Description desp={desp} />
                </Paragraph>
            </Card>
        );
    }

    componentWillMount() {
    }

    render() {
        const { desp, title, user, qid, time } = this.props.data
        return (
            this.renderTitle(title, desp, user, time, qid)  //title,desp,user,time,qid
        );
    }
}


export default withRouter(QCard);

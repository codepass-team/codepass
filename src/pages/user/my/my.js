import React from "react"
import BaseComponent from '../../../components/BaseComponent'
import { Col, Row, Tabs } from 'antd'
import QCard from './qCard'
import ACard from './aCard'
import ErrorPage from '../../../components/ErrorPage'

const { TabPane } = Tabs;

export class My extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: 1,
        }
    };

    componentWillMount() {
        var successAction = (result) => {
            console.log(result.data)
            if (result.status === "ok") {
                this.setState({ data: result.data })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        var errorAction = (result) => {
            this.pushNotification("warning", "Connection Failed");
        }

        this.getWithErrorAction('/api/question/list?userId=6', successAction, errorAction);//待更新后端接口和url
    }

    renderQCard = (data) => {
        console.log(data.user)
        if (data.user !== this.loadStorage("user"))
            return (
                <QCard data={data} />
            )
    }

    renderACard = (data) => {
        console.log(data.user)
        if (data.user === this.loadStorage("user"))
            return (
                <ACard data={data} />
            )
    }

    render() {
        if (!this.loadStorage("user") || this.loadStorage("user") === "")
            return (
                <Row type="flex" justify="center" style={{ marginTop: 200 }}>
                    <ErrorPage text={"You have not logged in."} />
                </Row>)

        if (this.state.data.length)
            return (
                <Row style={styles.container}>
                    <Col lg={6} xs={1} />
                    <Col lg={12} xs={22}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Questions" key="1">
                                {this.state.data.map(this.renderQCard)}
                            </TabPane>
                            <TabPane tab="Answers" key="2">
                                {this.state.data.map(this.renderACard)}
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col lg={6} xs={1} />
                </Row>
            );
        else
            return (
                <Row style={styles.container} type="flex" justify="center">
                    <Row style={{ fontSize: 22, marginTop: 300 }}>
                        现在还没有提问...
                    </Row>
                </Row>
            )

    }
}

const styles = {
    container: {
        marginTop: "50px",
        paddingBottom: "100px"
    }
}


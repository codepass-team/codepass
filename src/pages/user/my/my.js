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
            qdata: [],
            adata: []
        }
    };

    componentWillMount() {
        let errorAction = (result) => {
            this.pushNotification("warning", "Connection Failed");
        }

        this.getWithErrorAction('/api/question/listMy', (result) => {
            console.log(result)
            if (result.status === "ok") {
                this.setState({ qdata: result.data })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }, errorAction);

        this.getWithErrorAction('/api/answer/listMy', (result) => {
            console.log(result)
            if (result.status === "ok") {
                this.setState({ adata: result.data })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }, errorAction);
    }

    renderQCard = (data, index) => {
        return (
            <QCard data={data} key={index} />
        )
    }

    renderACard = (data, index) => {
        return (
            <ACard data={data} key={index} />
        )
    }

    render() {
        if (!this.loadStorage("user") || this.loadStorage("user") === "")
            return (
                <Row type="flex" justify="center" style={{ marginTop: 200 }}>
                    <ErrorPage text={"You have not logged in."} />
                </Row>)

        if (this.state.qdata.length || this.state.adata.length)
            return (
                <Row style={styles.container}>
                    <Col lg={6} xs={1} />
                    <Col lg={12} xs={22}>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="Questions" key="1">
                                {this.state.qdata.length === 0 ?
                                    <Row style={styles.container} type="flex" justify="center">
                                        <Row style={{ fontSize: 22, marginTop: 300 }}>
                                            现在还没有提问...
                                        </Row>
                                    </Row> : this.state.qdata.map(this.renderQCard)}
                            </TabPane>
                            <TabPane tab="Answers" key="2">
                                {this.state.adata.length === 0
                                    ? <Row style={styles.container} type="flex" justify="center">
                                        <Row style={{ fontSize: 22, marginTop: 300 }}>
                                            现在还没有回答...
                                            </Row>
                                    </Row>
                                    : this.state.adata.map(this.renderACard)}
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col lg={6} xs={1} />
                </Row>
            );
        else
            return null

    }
}

const styles = {
    container: {
        marginTop: "50px",
        paddingBottom: "100px"
    }
}


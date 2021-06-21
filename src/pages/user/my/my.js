import React from "react"
import BaseComponent from '../../../components/BaseComponent'
import { Col, Row, Skeleton, Tabs } from 'antd'
import QCard from './qCard'
import ACard from './aCard'
import ErrorPage from '../../../components/ErrorPage'

const { TabPane } = Tabs;

export class My extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            qdata: [],
            adata: [],
            loading1: false,
            loading2: false
        }
    };

    componentWillMount() {
        let errorAction = (result) => {
            this.pushNotification("warning", "连接失败");
        }

        this.setState({ loading1: true, loading2: true })

        this.getWithErrorAction('/api/question/listMy', (result) => {
            if (result.status === "ok") {
                this.setState({ qdata: result.data, loading1: false })
            } 
            // else {
            //     this.pushNotification("warning", JSON.stringify(result));
            // }
        }, errorAction);

        this.getWithErrorAction('/api/answer/listMy', (result) => {
            if (result.status === "ok") {
                this.setState({ adata: result.data, loading2: false })
            } 
            // else {
            //     this.pushNotification("warning", JSON.stringify(result));
            // }
        }, errorAction);
    }

    deleteQCard = (index) => {
        var successAction = (result) => {
            if (result.status == 'ok') {
                var qdata = this.state.qdata
                qdata.splice(index, 1)
                this.setState({ qdata: qdata })
                console.log(this.state.qdata)
            }
            else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.delete('/api/question/' + this.state.qdata[index].id, successAction)
    }

    deleteACard = (index) => {
        var successAction = (result) => {
            if (result.status == 'ok') {
                var adata = this.state.adata
                adata.splice(index, 1)
                this.setState({ adata: adata })
                console.log(this.state.adata)
            }
            else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.delete('/api/answer/' + this.state.adata[index].id, successAction)
    }

    render() {
        console.log(this.state.qdata, this.state.adata)
        if (!this.loadStorage("user") || this.loadStorage("user") === "")
            return (
                <Row type="flex" justify="center" style={{ marginTop: 200 }}>
                    <ErrorPage text={"您还没有登录"} />
                </Row>)
        return (
            <Row style={styles.container}>
                <Col lg={6} xs={1} />
                <Col lg={12} xs={22}>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="问题" key="1">
                            {this.state.loading1 ? <div><Skeleton /><Skeleton /><Skeleton /></div> : this.state.qdata.length === 0 ?
                                <Row style={styles.container} type="flex" justify="center">
                                    <Row style={{ fontSize: 22, marginTop: 200 }}>
                                        <Col span={24}>
                                            <Row type="flex" justify='center'>
                                                <Col>现在还没有问题...</Col>
                                            </Row>
                                            <Row type="flex" justify='center' style={{ marginTop: 15 }}>
                                                <Col>
                                                    <a onClick={() => {
                                                        this.props.history.push({
                                                            pathname: "/user/list",
                                                        })
                                                    }}>去发现页看看</a>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Row> : this.state.qdata.map(this.renderQCard)}
                        </TabPane>
                        <TabPane tab="回答" key="2">
                            {this.state.loading2 ? <div><Skeleton /><Skeleton /><Skeleton /></div> : this.state.adata.length === 0
                                ? <Row style={styles.container} type="flex" justify="center">
                                    <Row style={{ fontSize: 22, marginTop: 200 }}>
                                        <Col span={24}>
                                            <Row type="flex" justify='center'>
                                                <Col>现在还没有回答...</Col>
                                            </Row>
                                            <Row type="flex" justify='center' style={{ marginTop: 15 }}>
                                                <Col>
                                                    <a onClick={() => {
                                                        this.props.history.push({
                                                            pathname: "/user/list",
                                                        })
                                                    }}>去发现页看看</a>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Row> : this.state.adata.map(this.renderACard)}
                        </TabPane>
                    </Tabs>
                </Col>
                <Col lg={6} xs={1} />
            </Row >
        );
    }

    renderQCard = (data, index) => {
        return (
            <QCard data={data} key={index} index={index} deleteQCard={this.deleteQCard} />
        )
    }

    renderACard = (data, index) => {
        return (
            <ACard data={data} key={index} index={index} deleteACard={this.deleteACard} />
        )
    }
}

const styles = {
    container: {
        marginTop: "50px",
        paddingBottom: "100px"
    }
}


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
            if (result.status === "ok") {
                this.setState({ qdata: result.data })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }, errorAction);

        this.getWithErrorAction('/api/answer/listMy', (result) => {
            if (result.status === "ok") {
                this.setState({ adata: result.data })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }, errorAction);
    }

    deleteQCard = (index)=>{
        var successAction = (result)=>{
            if(result.status=='ok'){
                var qdata = this.state.qdata
                qdata.splice(index,1)
                this.setState({qdata:qdata})
                console.log(this.state.qdata)
            }
            else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.delete('/api/question/' + this.state.qdata[index].id,successAction)
    }

    deleteACard = (index)=>{
        var successAction = (result)=>{
            if(result.status=='ok'){
                var adata = this.state.adata
                adata.splice(index,1)
                this.setState({adata:adata})
                console.log(this.state.adata)
            }
            else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        this.delete('/api/answer/' + this.state.adata[index].id,successAction)
    }

    render() {
        console.log(this.state.qdata,this.state.adata)
        if (!this.loadStorage("user") || this.loadStorage("user") === "")
            return (
                <Row type="flex" justify="center" style={{ marginTop: 200 }}>
                    <ErrorPage text={"You have not logged in."} />
                </Row>)
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
    }

    renderQCard = (data, index) => {
        console.log(data,index)
        return (
            <QCard data={data} key={index} index={index} deleteQCard={this.deleteQCard}/>
        )
    }

    renderACard = (data, index) => {
        console.log(data,index)
        return (
            <ACard data={data} key={index} index={index} deleteACard={this.deleteACard}/>
        )
    }
}

const styles = {
    container: {
        marginTop: "50px",
        paddingBottom: "100px"
    }
}


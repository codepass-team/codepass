import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Col, Row } from 'antd';
import QDetail from './qDetail'
import ADetail from './aDetail'


export class Detail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: 0,
            found: false
        }
    }

    componentWillMount() {
        // location由react-router注入
        // location.state可以用来存放临时信息
        const { qid } = this.props.location.state
        var successAction = (result) => {
            if (result.status === "ok") {
                this.setState({ data: result.data, found: true })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        var errorAction = () => {
            this.pushNotification("warning", "Question Not Found");
        }

        if (this.state.data === 0)
            this.getWithErrorAction('/api/question/' + qid, successAction, errorAction);
    }

    render() {
        if (!this.state.found)
            return (
                <Row style={styles.container}>
                    <Col lg={6} xs={1} />
                    {/* <Col lg={12} xs={22}>
                        Sorry, answer not found. 
                    </Col> */}
                    <Col lg={6} xs={1} />
                </Row>
            )
        else if (this.props.location.state && this.state.data &&  this.state.data.questioner.username === this.loadStorage("user")) {
            // 是自己提的问题
            return (
                <QDetail data={this.state.data} />
            )
        } else {
            return (
                <ADetail data={this.state.data} />
            )
        }
    }
}

const styles = {
    container: {
        marginTop: "50px"
    }
}


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
        const { qid } = this.props.location.state
        var successAction = (result) => {
            if (result.status === "ok") {
                result = result.data
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
        if (this.props.location.state && this.state.question.user === this.loadStorage("user")) {

            return (
                <QDetail data={this.state.question} />
            )
        } else {
            return (
                <ADetail data={this.state.question} />
            )
        }
    }
}

const styles = {
    container: {
        marginTop: "50px"
    }
}


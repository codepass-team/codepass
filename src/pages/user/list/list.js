import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Col, Divider, Row } from 'antd';
import UCard from './uCard'


export class List extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: 1,
        }
    };

    componentWillMount() {
        var successAction = (result) => {
            if (result.status === "ok") {
                this.setState({ data: result.data })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        var errorAction = () => {
            this.pushNotification("warning", "Connection Failed");
        }

        this.getWithErrorAction('/api/question/listAll', successAction, errorAction);
    }

    renderUCards = () => {
        if (this.state.data !== 1)
            return (
                <Row style={{ fontSize: 20, width: "100%" }} type="flex" justify="center">
                    {this.state.data.content.map(this.renderUCard)}
                </Row>
            )
        return null
    }

    renderUCard = (item) => {
        if (item.status === 1)
            return (
                <UCard data={item} />
            )
        else
            return null
    }

    // renderCCards=()=>{
    //     if(this.state.data!=1)
    //         return(
    //             <TabPane tab="Completed" key="2">
    //                 {this.state.data.map(this.renderCCard)}
    //             </TabPane>
    //         )
    //     return null
    // }

    // renderCCard=(item)=>{
    //     if(item.status==2)
    //         return(
    //             <CCard data={item}/>
    //         )
    //     else
    //         return null
    // }

    render() {
        return (
            <Row style={styles.container}>
                <Col lg={6} xs={1} />
                <Col lg={12} xs={22}>
                    <Row style={{ fontWeight: "bold", fontSize: 20 }}>Question List</Row>
                    <Divider style={{ marginTop: 5 }} />
                    {this.renderUCards()}
                </Col>
                <Col lg={6} xs={1} />
            </Row>
        );
    }
}

const styles = {
    container: {
        marginTop: "50px"
    }
}


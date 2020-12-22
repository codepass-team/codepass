import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Col, Divider, Row } from 'antd';
import UCard from './uCard'


export class List extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            // page, etc
        }
    };

    componentWillMount() {
        let successAction = (result) => {
            if (result.status === "ok") {
                // TODO: 页码处理
                this.setState({ items: result.data.content })
            } else {
                this.pushNotification("warning", JSON.stringify(result));
            }
        }

        let errorAction = () => {
            this.pushNotification("warning", "Connection Failed");
        }

        this.getWithErrorAction('/api/question/listAll', successAction, errorAction);
    }

    renderUCards = () => {
        return (
            <Row style={{ fontSize: 20, width: "100%" }} type="flex" justify="center">
                {this.state.items.map(this.renderUCard)}
            </Row>
        )
    }

    renderUCard = (item, index) => {
        // 只有自己提出的问题处在编辑状态, 后端才会返回
        return (
            <UCard data={item} key={index} />
        )
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
                    <Row style={{ fontWeight: "bold", fontSize: 20 }}>问题列表</Row>
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


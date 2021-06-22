import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Col, Divider, Row, Skeleton } from 'antd';
import UCard from './uCard'


export class List extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: false,
            user: this.loadStorage("user"),
            // page, etc
        }
    };

    componentWillMount() {

        // this.setState({ loading: true, user: this.props.user })

        this.getWithErrorAction('/api/question/listAll', (result) => {
            if (result.status === "ok") {
                // TODO: 页码处理
                this.setState({ items: result.data.content, loading: false })
            } 
            // else {
            //     this.pushNotification("warning", JSON.stringify(result));
            // }
        }, () => {
            this.pushNotification("warning", "连接失败");
        });
    }

    renderUCards = () => {
        return (
            <Row style={{ fontSize: 20, width: "100%" }} type="flex" justify="center">
                {this.state.items.length ? this.state.items.map(this.renderUCard) :
                    <Col span={24}>现在还没有问题...</Col>}
            </Row>
        )
    }

    renderUCard = (item, index) => {
        console.log(item);
        if (item.status === 0) {
            return null
        }
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
                    {this.state.loading ? <Col span={24}><Skeleton /><Skeleton /><Skeleton /><Skeleton /></Col> : this.renderUCards()}
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


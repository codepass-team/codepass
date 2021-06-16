import React from "react"
import BaseComponent from '../../../components/BaseComponent'
import { Col, Row, Skeleton, Tabs } from 'antd'

const { TabPane } = Tabs;

export class Help extends BaseComponent{
    constructor(props){
        super(props)
        this.state = {
            languageTips:'',
            pageTips:'',
        }
    };

    render(){
        return (
            <Row style={styles.container}>
                <Col lg={6} xs={1} />
                <Col lg={12} xs={22}>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="网页使用指南" key="1">
                            <Row>
                                <h1 style={styles.title}>如何正确的使用系统?</h1>
                            </Row>
                            <Row>
                                <p style={styles.paragraph}>{this.state.pageTips}</p>
                            </Row>
                        </TabPane>
                        <TabPane tab="docker支持语言" key="2">
                            <Row>
                                <h1 style={styles.title}>5分钟教会你使用docker镜像</h1>
                            </Row>
                            <Row>
                                <p style={styles.paragraph}>{this.state.languageTips}</p>
                            </Row>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        )
    }
}

const styles = {
    container: {
        marginTop: "50px",
        paddingBottom: "100px"
    },
    paragraph:{
        fontSize:"20px",
        fontFamily:"Arial,'Microsoft Yahei','微软雅黑'",
        fontWeight:'600',
        lineHeight:'24px',
        textIndent: '2em',
    },
    title:{
        fontSize:"32px",
    }
}


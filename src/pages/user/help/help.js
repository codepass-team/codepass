import React from "react"
import BaseComponent from '../../../components/BaseComponent'
import { Col, Row, Skeleton, Tabs } from 'antd'

const { TabPane } = Tabs;

export class Help extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            activeKey: '1',
            languageTips: 'docker是一个虚拟容器，你可以像使用VSCode一样使用它，在docker中安装你需要的扩展，将你的代码放在这里，回答者就可以看到你的真实代码，赶快来试一试吧！',
            pageTips: '这是一个代码问答交流平台，你可以在这里提出问题，也可以在这里解决别人的问题，在Codepass开始储存你的知识，分享你的故事！欢迎您的到来，让我们开始吧！',
        }
    };

    handlePageJump = () => {
        this.setState({
            activeKey: '2'
        })
    }

    keyChange = (key)=>{
        this.setState({
            activeKey:key
        })
    }

    render() {
        return (
            <Row style={styles.container}>
                <Col lg={6} xs={1} />
                <Col lg={12} xs={22}>
                    <Tabs activeKey={this.state.activeKey} onChange={this.keyChange}>
                        <TabPane tab="网页使用指南" key="1">
                            <Row>
                                <h1 style={styles.title}>创建你的第一个问题</h1>
                            </Row>
                            <Row>
                                <p style={styles.paragraph}>{this.state.pageTips}</p>
                                <p style={styles.paragraph}>如何创建第一个问题呢?你可以在首页的输入框中输入你的问题，说不定已经有人帮你解决了哦。如果还没有解决，你可以创建新的问题，进入docker编辑你的代码，docker具体使用请看
                                 <a onClick={this.handlePageJump}>docker使用</a></p>
                            </Row>
                        </TabPane>
                        <TabPane tab="docker使用" key="2">
                            <Row>
                                <h1 style={styles.title}>马上教会你使用docker镜像</h1>
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
    paragraph: {
        fontSize: "20px",
        fontFamily: "Arial,'Microsoft Yahei','微软雅黑'",
        // fontWeight:'600',
        lineHeight: '30px',
        textIndent: '2em',
    },
    title: {
        fontSize: "32px",
    },
    link: {
        textDecoration: 'underline',
        color: '#00FFFF',
    }
}


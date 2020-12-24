import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import BaseComponent from '../../../components/BaseComponent';
import { Menu, Icon, Col, Row, Table } from 'antd'

export class Home extends BaseComponent {


    constructor(props) {
        console.log("Home")
        console.log(props)
        super(props)
        this.state = {
            current: null,
            users: null,
            questions: null,
            answers: null
        }
    }

    componentWillMount() {

    }

    render() {
        return (
            <Row style={{ marginTop: 20 }} type='flex' align='middle' justify='center'>
                <Col span={18} offset={1}>
                </Col>
            </Row>
        )
    }
}


export default withRouter(Home)

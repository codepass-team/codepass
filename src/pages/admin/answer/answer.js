import React from 'react'
import { Row, Col, Table } from 'antd'
import BaseComponent from "../../../components/BaseComponent"


export class Answer extends BaseComponent {
    render() {
        return (
            <Row style={{ marginTop: 20 }} type='flex' align='middle' justify='center'>
                <Col span={18} offset={1}>
                    {/* <Table rowKey='id' columns={this.columns.answer} dataSource={this.state.answers}></Table> */}
                </Col>
            </Row>
        )
    }
}
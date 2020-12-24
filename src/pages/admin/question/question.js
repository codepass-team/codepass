import React from 'react'
import { Col, Row, Table } from 'antd'
import BaseComponent from "../../../components/BaseComponent"

export class Question extends BaseComponent {

    columns = [
        { title: 'Id', dataIndex: 'id' },
        { title: '标题', dataIndex: 'title' },
        { title: '内容', dataIndex: 'content' },
        { title: '提问者', dataIndex: 'questioner.username' },
        { title: '时间', dataIndex: 'raiseTime', render: text => this.handleDate(text) + this.handleTime(text) },
        { title: '容器Id', dataIndex: 'dockerId' },
        { title: '点赞数', dataIndex: 'likeCount' },
        { title: '评论数', dataIndex: 'commentCount' },
        { title: '收藏数', dataIndex: 'collectCount' },
        { title: '状态', dataIndex: 'status' }
    ]

    constructor(props) {
        console.log("Home")
        console.log(props)
        super(props)
        this.state = {
            data: [],
            pagination: {},
            loading: false,
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = () => {
        this.setState({ loading: true });
        this.getWithErrorAction('/api/question/listAll', res => {
            if (res.status === 'ok') {
                let data = res.data
                const pagination = { ...this.state.pagination };
                pagination.total = data.totalCount;
                this.setState({
                    loading: false,
                    data: data.results,
                    pagination,
                });
            }
        })
    };

    render() {
        return (
            <Row style={{ marginTop: 20 }} type='flex' align='middle' justify='center'>
                <Col span={18} offset={1}>
                    <Table
                        rowKey='id'
                        columns={this.columns}
                        dataSource={this.state.data}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}
                    />
                </Col>
            </Row>
        )
    }
}
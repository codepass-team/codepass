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

    fetch = (current) => {
        this.setState({ loading: true });
        this.getWithErrorAction('/api/question/listAll?page=' + current, res => {
            if (res.status === 'ok') {
                let data = res.data
                this.setState({
                    loading: false,
                    data: data.content,
                    pagination: {
                        current: data.pageNumber,
                        total: data.totalElements,
                        onChange: p=>this.fetch(p-1)
                    },
                });
            }
        })
    };

    render() {
        return (
            <Table
                rowKey='id'
                columns={this.columns}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
            />
        )
    }
}
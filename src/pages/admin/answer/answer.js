import React from 'react'
import { Row, Col, Table } from 'antd'
import BaseComponent from "../../../components/BaseComponent"


export class Answer extends BaseComponent {

    columns = [
        { title: 'Id', dataIndex: 'id' },
        { title: '内容', dataIndex: 'content' },
        { title: '回答者', dataIndex: 'answerer.username' },
        { title: '时间', dataIndex: 'answerTime', render: text => this.handleDate(text) + this.handleTime(text) },
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
                    data: data.content,
                    pagination,
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
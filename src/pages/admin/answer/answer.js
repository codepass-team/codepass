import React from 'react'
import { Row, Col, Table, Tag, Button } from 'antd'
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
        {
            title: '状态', dataIndex: 'status', render: s => <Tag color={s ? 'gray' : 'green'}>
                {s ? '已发布' : '编辑中'}
            </Tag>
        },
        {
            title: '操作', dataIndex: 'x', render: (s, r) => <Button onClick={()=>this.del(r.id)}>删除</Button>
        }
    ]

    del(id) {
        this.delete('/api/answer/' + id, res => {
            if (res.status === 'ok') {
                let idx = this.state.data.map(r => r.id).indexOf(id)
                this.state.data.splice(idx, 1)
                this.setState({
                    data: this.state.data
                })
            }
        })
    }

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
        this.getWithErrorAction('/api/answer/listAll?page=' + (current || 0), res => {
            if (res.status === 'ok') {
                let data = res.data
                /*
                totalElements	7
                totalPages	1
                pageNumber	1
                numberOfElements	7
                 */
                this.setState({
                    loading: false,
                    data: data.content,
                    pagination: {
                        current: data.pageNumber,
                        total: data.totalElements,
                        onChange: p => this.fetch(p - 1)
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
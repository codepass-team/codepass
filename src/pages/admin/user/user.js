import React from 'react'
import { Table, Button } from 'antd'
import BaseComponent from "../../../components/BaseComponent"


export class User extends BaseComponent {

    columns = [
        { title: 'Id', dataIndex: 'id' },
        { title: '用户名', dataIndex: 'username' },
        { title: '性别', dataIndex: 'gender' },
        { title: '工作', dataIndex: 'job' },
        { title: '所在行业', dataIndex: 'job' },
        { title: '年龄', dataIndex: 'age' },
        { title: '粉丝数', dataIndex: 'followerCount' },
        {
            title: '操作', dataIndex: 'x', render: (s, r) => <Button onClick={() => this.del(r.id)}>删除</Button>
        }
    ]

    del(id) {
        this.delete('/api/user/' + id, res => {
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
        this.getWithErrorAction('/api/user/listAll?page=' + (current || 0), res => {
            if (res.status === 'ok') {
                let data = res.data
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
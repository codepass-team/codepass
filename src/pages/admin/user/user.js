import React from 'react'
import { Row, Col, Table } from 'antd'
import BaseComponent from "../../../components/BaseComponent"


export class User extends BaseComponent {

    columns = [
        { title: 'Id', dataIndex: 'id' },
        { title: '用户名', dataIndex: 'username' },
        { title: '性别', dataIndex: 'gender' },
        { title: '工作', dataIndex: 'job' },
        { title: '所在行业', dataIndex: 'job' },
        { title: '年龄', dataIndex: 'age' },
        { title: '粉丝数', dataIndex: 'followerCount' }
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
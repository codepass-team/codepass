import React from 'react'
import { Row, Col, Table, Tag, Button } from 'antd'
import BaseComponent from "../../../components/BaseComponent"

export class Docker extends BaseComponent {

    columns = [
        { title: 'Id', dataIndex: 'id' },
        { title: '端口号', dataIndex: 'port', render: p => p ? <a href={this.host + ":" + p}>{p}</a> : '-' },
        { title: '密码', dataIndex: 'password' },
        {
            title: '状态', dataIndex: 'status', render: s => <Tag color={s ? 'green' : 'gray'}>
                {s ? '运行中' : '未运行'}
            </Tag>
        },
        {
            title: '操作', dataIndex: '', key: 'x',
            render: (text, record, index) => record.status === 0
                ? <Button loading={this.state.bloading[index]} type="primary" onClick={() => this.startDocker(record.id, index)} >启动</Button>
                : <Button loading={this.state.bloading[index]} onClick={() => this.stopDocker(record.id, index)} type="danger">关闭</Button>
        }
    ]

    startDocker(id, i) {
        if (!id) return
        let bloading = this.state.bloading
        bloading[i] = true
        this.setState({
            bloading
        })
        this.post('/api/docker/start/' + id, null, res => {
            if (res.status === 'ok') {
                let { bloading, data } = this.state
                bloading[i] = false
                data[i].port = res.data.port
                data[i].status = res.data.status
                data[i].password = res.data.password
                this.setState({
                    bloading,
                    data
                })
            }
        })
    }

    stopDocker(id, i) {
        if (!id) return
        let bloading = this.state.bloading
        bloading[i] = true
        this.setState({
            bloading
        })
        this.delete('/api/docker/' + id, res => {
            if (res.status === 'ok') {
                let { bloading, data } = this.state
                bloading[i] = false
                data[i].port = 0
                data[i].status = 0
                this.setState({
                    bloading,
                    data
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
            bloading: []
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = (current) => {
        this.setState({ loading: true });
        this.getWithErrorAction('/api/docker/listAll?page=' + (current || 0), res => {
            if (res.status === 'ok') {
                let data = res.data
                let bloading = data.content.map(i => false)
                this.setState({
                    loading: false,
                    data: data.content,
                    pagination: {
                        current: data.pageNumber,
                        total: data.totalElements,
                        onChange: p => this.fetch(p - 1),
                    },
                    bloading,
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
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
            render: (text, record) => record.status === 0 ? <Button onClick={() => this.startDocker(record.id)} >启动</Button> : <Button onClick={() => this.stopDocker(record.id)} >关闭</Button>
        }
    ]

    startDocker(id) {
        // this.post('/api/docker/start/' + id, null, res=>{

        // })
    }

    stopDocker(id) {

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
        this.getWithErrorAction('/api/docker/listAll?page=' + (current || 0), res => {
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
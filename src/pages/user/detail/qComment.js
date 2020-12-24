import React from "react"
import { Comment, Avatar, Form, Button, List, Input, Col } from 'antd';
import moment from 'moment';
import BaseComponent from '../../../components/BaseComponent';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                添加评论
            </Button>
        </Form.Item>
    </div>
);

class QComment extends BaseComponent {
    constructor(props) {
        super(props)
        console.log("QComment")
        console.log(props)
        this.state = {
            questionId: 0,
            comments: 0,
            submitting: false,
            value: '',
        };
    }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        let form = new FormData()
        form.set("content", this.state.value)

        this.post('/api/comment/question/' + this.props.questionId, form, (res) => {
            if (res.status === 'ok') {
                this.pushNotification("info", "发送成功")
            } else {
                this.pushNotification("danger", "发送失败")
            }
        })

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: 'Han Solo',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    componentWillMount() {
        this.setState({
            comments: this.props.comments.content
        })
    }

    render() {
        const { comments, submitting, value } = this.state;

        return (
            <div>
                {comments.length > 0 ? <CommentList comments={comments} /> : <Col>现在还没有人评论...</Col>}
                <Comment
                    avatar={
                        <Avatar
                            icon='user'
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </div>
        );
    }
}

export default QComment
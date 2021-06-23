import React from "react"
import { Comment, Avatar, Form, Button, List, Input, Col } from 'antd';
import moment from 'moment';
import BaseComponent from '../../../components/BaseComponent';
import MyAvatar from "../../handleAvatar";

const { TextArea } = Input;

const CommentList = ({ comments }) => {
    console.log(comments);
    return (<List
        dataSource={comments}
        header={comments.length + ' 评论'}
        itemLayout="horizontal"
        renderItem={comment => <Comment avatar={<MyAvatar id={comment.commenter.id} name={comment.commenter.username} size={30}></MyAvatar>} {...comment} />}
    />
    )
};

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
        this.state = {
            questionId: 0,
            user: 0,
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
                this.pushNotification("success", "发送成功")
                this.setState({
                    submitting: false,
                    value: '',
                    comments: [
                        {
                            id: res.data.id,
                            questionId: res.data.questionId,
                            content: <p>{this.state.value}</p>,
                            commentTime: moment().fromNow(),
                            commenter: res.data.commenter,
                        },
                        ...this.state.comments,
                    ],
                });
            } else {
                this.pushNotification("danger", "发送失败")
            }
        })

    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    componentWillMount() {
        this.setState({
            comments: this.props.comments.content,
            user: this.props.user,
            questionId: this.props.questionId
        })
    }

    render() {
        const { comments, submitting, value } = this.state;
        return (
            <div style={{ marginTop: 20 }}>
                {comments.length > 0 ? <CommentList comments={comments} /> : <Col>现在还没有人评论...</Col>}
                <Comment
                    avatar={
                        <Avatar
                            icon='user'
                            alt="Coder"
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
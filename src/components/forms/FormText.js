import React, { Component } from 'react';
import { Form, Icon, Input } from 'antd';

export class FormText extends Component {

    renderInput() {
        if (this.props.width)
            return <Input
                style={{ width: this.props.widthz }}
                type={this.props.inputType}
                rows={this.props.rows}
                prefix={<Icon type={this.props.icon} />} />
        else
            return <Input
                size="large"
                style={{ width: "396px", height: "40px" }}
                type={this.props.inputType}
                rows={this.props.rows}
                prefix={<Icon type={this.props.icon} />} />
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        const { getFieldDecorator } = this.props.form;
        const { message } = this.props

        return (
            <Form.Item {...formItemLayout} label={this.props.label}>
                {getFieldDecorator(this.props.name, {
                    initialValue: this.props.defaultValue,
                    rules: [
                        {
                            type: this.props.type, message: (message === "" ? '不是有效的' + this.props.type : message),
                        },
                        {
                            required: this.props.required,
                            message: (message === "" ? '请输入您的' + this.props.name1 + ' !' : message),
                        },
                        { validator: this.props.validator },
                    ]
                })(
                    <Input size="large" style={{ width: '349px' }}
                        type={this.props.inputType}
                        rows={this.props.rows}
                        prefix={<Icon type={this.props.icon} />} />
                )}
            </Form.Item>
        );
    }
}

FormText.defaultProps = {
    required: false,
    rows: 1,
    defaultValue: "",
    message: ""
}


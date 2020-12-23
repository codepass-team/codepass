import React from 'react';
import { withRouter } from "react-router-dom";
import { Button, Col, Form, Row } from 'antd';
import BaseComponent from '../BaseComponent';
import { FormButton, FormText } from '../../components/forms';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin,
})

class SignUp extends BaseComponent {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (values.username === '') {
                this.pushNotification("warning", "用户名是空的！", this.props.dispatch);
                return;
            }
            if (values.password === '') {
                this.pushNotification("warning", "密码是空的!", this.props.dispatch);
                return;
            }
            if (values.passwordAgain !== values.password) {
                this.pushNotification("warning", "两次输入的密码不一致!", this.props.dispatch);
                return;
            }
            // if(values.name===''){
            //     this.pushNotification("warning","姓名不能为空",this.props.dispatch);
            // }
            if (!err) {
                console.log("hey");
                console.log('Received values of form: ', values);
            }

            let form = new FormData();
            form.append('username', values.username);
            form.append('password', values.password);

            var successAction = (result) => {
                localStorage.setItem('user', JSON.stringify(result.content));
                this.props.switch()
                this.pushNotification("success", "注册成功！现在可以登录啦！");
            }

            var unsuccessAction = (result) => {
                this.pushNotification("warning", result.message);
            }

            this.post("/api/register", form, successAction, unsuccessAction)
        });
    }

    renderLogo = () => {
        return (
            <Row type="flex" justify='center'>
                <img alt="" style={styles.logo} src={require("@/assets/logo2.png")} />
            </Row>
        )
    }

    renderContent = () => {
        return (
            <Row type='flex'
                justify='center'
                align="middle"
                style={{ borderRadius: '20px' }}>
                <Col>
                    <Row
                        style={styles.cardContainer}>
                        <div style={styles.welcome}>欢迎来到CodePass</div>
                        <div style={styles.welcome2}></div>
                        <Form onSubmit={this.handleSubmit} type='flex' justify='center'>
                            <Row style={{ width: "100%" }} type="flex" justify='center'>
                            <Row style={{ width: "100%", marginLeft: "80px", color: '#AAAAAA', fontSize: 15 }}
                                    type="flex" justify='start'>请输入你的用户名:</Row>
                                <FormText form={this.props.form}
                                    name='username' required={true} icon="user" />
                                <Row style={{ width: "100%", marginLeft: "80px", color: '#AAAAAA', fontSize: 15 }}
                                    type="flex" justify='start'>请输入你的密码:</Row>
                                <FormText form={this.props.form} style={{ marginBottom: "10px" }}
                                    name='password' required={true} icon="lock"
                                    inputType="password" />
                                <Row style={{ width: "100%", marginLeft: "80px", color: '#AAAAAA', fontSize: 15 }}
                                    type="flex" justify='start'>重复你的密码:</Row>
                                <FormText form={this.props.form}
                                    name="passwordAgain" required={true} icon='lock'
                                    inputType='password' />
                            </Row>
                            <Row type='flex' justify='center'>
                                <Col>
                                    <FormButton form={this.props.form} label="注册" style={styles.button} />
                                    <Button style={styles.button2} onClick={this.props.onCancel}>
                                        取消
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        <Row type='flex' justify='center'>
                            <Col>
                                已经有账号了?<Button onClick={this.props.switch} type="link">现在登录吧！</Button>
                            </Col>
                        </Row>
                    </Row>
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <Row>
                {this.renderLogo()}
                {this.renderContent()}
            </Row>
        );
    }

}


const styles = {

    logo: {
        height: '64px',
        width: '192px'
    },

    cardContainer: {
        width: '500px',
        marginTop: '10px'
    },

    button: {
        width: '350px',
        height: '40px',
    },

    button2: {
        width: '350px',
        height: '40px',
        color: 'white',
        backgroundColor: '#CCCCCC',
        marginBottom: '20px',
    },

    welcome: {
        fontSize: 25,
        marginLeft: '80px',
        marginRight: '10px',
        marginBottom: '3px',
    },
    welcome2: {
        fontSize: 17,
        color: '#AAAAAA',
        marginLeft: '80px',
        marginRight: '10px',
        marginBottom: '10px',
    },

};

export default Form.create()(connect(mapStateToProps)(withRouter(SignUp)))


import React from 'react';
import { withRouter } from "react-router-dom";
import { loginAsUser, loginAsAdmin } from '../../redux/actions/action';
import { Button, Col, Form, Row } from 'antd';
import BaseComponent from '../BaseComponent';
import { FormButton, FormText } from '../../components/forms';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.identityReducer.user
})

class SignIn extends BaseComponent {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { usrname, pwd } = values

            if (usrname === '') {
                this.pushNotification("warning", "用户名不能为空", this.props.dispatch);
                return;
            }
            if (pwd === '') {
                this.pushNotification("warning", "密码不能为空", this.props.dispatch);
                return;
            }

            let form = new FormData();
            form.append('username', usrname);
            form.append('password', pwd);

            var successAction = (result) => {
                if (result.status === "ok") {
                    let data = result.data
                    localStorage.setItem('token', data.token);
                    if (data.isAdmin) {
                        this.props.dispatch(loginAsAdmin(usrname));
                        this.pushNotification("success", "欢迎管理员" + usrname + "回到CodePass");
                    } else {
                        this.props.dispatch(loginAsUser(usrname));
                        this.pushNotification("success", "欢迎" + usrname + "回到CodePass");
                    }
                    this.props.onCancel()
                } else {
                    this.pushNotification("warning", "用户名或密码错误");
                }
            }

            var errorAction = (result) => {
                this.pushNotification("warning", "用户名或密码错误");
            }

            this.post('/api/login', form, successAction, errorAction);
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
                        style={styles.cardContainer} type="flex" justify='center'>
                        <Row type="flex" justify="start" style={styles.welcome}>
                            欢迎来到CodePass
                        </Row>
                        <Row type="flex" justify="start" style={styles.welcome2}>
                        </Row>
                        <Form onSubmit={this.handleSubmit} type='flex' justify='center'>
                            <Row type="flex" justify='center'>
                                <Row style={{ width: "100%", marginLeft: "80px", color: '#AAAAAA', fontSize: 15 }}
                                    type="flex" justify='start'>请输入你的用户名:</Row>
                                <FormText form={this.props.form}
                                    label='' name='usrname' required={true} icon="user" name1='用户名' />
                                <Row style={{ width: "100%", marginLeft: "80px", color: '#AAAAAA', fontSize: 15 }}
                                    type="flex" justify='start'>请输入你的密码:</Row>
                                <FormText form={this.props.form}
                                    label='' name='pwd' required={true} icon="lock"
                                    inputType="password" name1='密码' />
                                <FormButton form={this.props.form} label="登陆" style={styles.button} />
                                <Button style={styles.button2} onClick={this.props.onCancel}>
                                    取消
                                </Button>
                            </Row>
                        </Form>
                        <Row type='flex' justify='center'>
                            <Col>
                                还没有账号? <Button onClick={this.props.switch} type="link">点击这里注册</Button>
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
        width: '300px',
        height: '40px',
    },

    button2: {
        width: '300px',
        height: '40px',
        color: 'white',
        backgroundColor: '#CCCCCC',
        marginBottom: '20px'
    },

    welcome: {
        fontSize: 25,
        width: "100%",
        marginLeft: '80px',
        marginRight: '10px',
        marginBottom: '3px',
    },
    welcome2: {
        fontSize: 17,
        width: "100%",
        color: '#AAAAAA',
        marginLeft: '80px',
        marginRight: '10px',
        marginBottom: '10px',
    },

};

export default Form.create()(connect(mapStateToProps)(withRouter(SignIn)))


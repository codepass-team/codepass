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
    constructor(props) {
        super(props)
        this.state = {
            isFindPwd: false,
        }
    }

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
                        this.get('/api/user', (result) => {
                            if (result.status === "ok"&&result.data.email===null) {
                                this.pushNotification("success", '填写邮箱有助于您找回密码哦!');
                            }
                        });
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

    verifyPassword = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { usrname, verifyNumber, newPwd, againPwd } = values

            if (usrname === '') {
                this.pushNotification("warning", "用户名不能为空", this.props.dispatch);
                return;
            }
            if (verifyNumber === '') {
                this.pushNotification("warning", "验证码不能为空", this.props.dispatch);
                return;
            }
            if (newPwd === '') {
                this.pushNotification("warning", "新密码不能为空", this.props.dispatch);
                return;
            }
            if (againPwd === '') {
                this.pushNotification("warning", "确认密码不能为空", this.props.dispatch);
                return;
            }
            if (newPwd !== againPwd) {
                this.pushNotification("warning", "密码不一致", this.props.dispatch);
                return;
            }

            let form = new FormData();
            form.append('name', usrname);
            form.append('password', newPwd);
            form.append('captcha', verifyNumber);

            var successAction = (result) => {
                if (result.status === "ok") {
                    let data = result.data
                    this.pushNotification("success", data);
                    // localStorage.setItem('token', data.token);
                    // if (data.isAdmin) {
                    //     this.props.dispatch(loginAsAdmin(usrname));
                    //     this.pushNotification("success", "欢迎管理员" + usrname + "回到CodePass");
                    // } else {
                    //     this.props.dispatch(loginAsUser(usrname));
                    //     this.pushNotification("success", "欢迎" + usrname + "回到CodePass");
                    // }
                    this.props.onCancel()
                } else {
                    this.pushNotification("warning", "修改用户密码失败");
                }
            }

            var errorAction = (result) => {
                this.pushNotification("warning", "修改用户密码失败");
            }

            this.post('/api/reset/password', form, successAction, errorAction);
        });
    }

    getVerify = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { usrname, verifyNumber, newPwd, againPwd } = values

            if (usrname === '') {
                this.pushNotification("warning", "用户名不能为空", this.props.dispatch);
                return;
            }

            let form = new FormData();
            form.append('name', usrname);

            var successAction = (result) => {
                if (result.status === "ok") {
                    let data = result.data
                    this.pushNotification("success", data);
                    // localStorage.setItem('token', data.token);
                    // if (data.isAdmin) {
                    //     this.props.dispatch(loginAsAdmin(usrname));
                    //     this.pushNotification("success", "欢迎管理员" + usrname + "回到CodePass");
                    // } else {
                    //     this.props.dispatch(loginAsUser(usrname));
                    //     this.pushNotification("success", "欢迎" + usrname + "回到CodePass");
                    // }
                    // this.props.onCancel()
                } else {
                    this.pushNotification("warning", "获取验证码失败");
                }
            }

            var errorAction = (result) => {
                this.pushNotification("warning", "获取验证码失败");
            }

            this.post('/api/reset/email', form, successAction, errorAction);
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
                    {this.state.isFindPwd ? this.renderFindPwd() : this.renderLogin()}
                </Col>
            </Row>
        );
    }

    renderFindPwd() {
        return (
            <Row
                style={styles.cardContainer} type="flex" justify='center'>
                <Row type="flex" justify="start" style={styles.welcome}>
                    欢迎来到CodePass
                </Row>
                <Row type="flex" justify="start" style={styles.welcome2}>
                </Row>
                <Form onSubmit={this.verifyPassword} type='flex' justify='center'>
                    <Row type="flex" justify='center'>
                        <Row style={{ width: "100%", marginLeft: "80px", color: '#AAAAAA', fontSize: 15 }}
                            type="flex" justify='start'>请输入你的用户名:</Row>
                        <Row type='flex' justify='center'>
                            <Col span={12}>
                                <FormText form={this.props.form}
                                    label='' name='usrname' required={true} icon="user" name1='用户名' />
                            </Col>
                            <Col span={6} style={{position:'relative',left:'6px'}}>
                                <Button type="dashed" size='large' onClick={this.getVerify}>
                                    获取验证码
                                </Button>
                            </Col>
                        </Row>

                        <Row style={{ width: "80%", marginLeft: "80px", color: '#AAAAAA', fontSize: 15 }}
                            type="flex" justify='start'>验证码:</Row>
                        <FormText form={this.props.form}
                            label='' name='verifyNumber' required={true} icon="api"
                            name1='验证码' />

                        <Row style={{ width: "100%", marginLeft: "80px", color: '#AAAAAA', fontSize: 15 }}
                            type="flex" justify='start'>请输入新密码:</Row>
                        <FormText form={this.props.form}
                            label='' name='newPwd' required={true} icon="lock"
                            inputType="password" name1='新密码'/>

                        <Row style={{ width: "100%", marginLeft: "80px", color: '#AAAAAA', fontSize: 15 }}
                            type="flex" justify='start'>请再次输入密码:</Row>
                        <FormText form={this.props.form}
                            label='' name='againPwd' required={true} icon="lock"
                            inputType="password" name1='确认密码' />

                        <FormButton form={this.props.form} label="确认" style={styles.button} />
                        <Button style={styles.button2} onClick={this.props.onCancel}>
                            取消
                        </Button>
                    </Row>
                </Form>
                <Row type='flex' justify='center'>
                    <Col>
                        {/* 还没有账号?  */}
                        <Button onClick={this.switchToLogin} type="link">返回登录</Button>
                    </Col>
                </Row>
            </Row>
        )
    }

    switchToLogin = () => {
        this.setState({
            isFindPwd: false
        })
    }

    renderLogin() {
        return (
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
                        <FormButton form={this.props.form} label="登录" style={styles.button} />
                        <Button style={styles.button2} onClick={this.props.onCancel}>
                            取消
                        </Button>
                    </Row>
                </Form>
                <Row type='flex' justify='center'>
                    <Col>
                        {/* 还没有账号?  */}
                        <Button onClick={this.props.switch} type="link">点击这里注册</Button>
                        |
                        <Button onClick={this.switchToPwd} type="link">忘记密码?</Button>
                    </Col>
                </Row>
            </Row>
        )
    }

    switchToPwd = () => {
        this.setState({
            isFindPwd: true
        })
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


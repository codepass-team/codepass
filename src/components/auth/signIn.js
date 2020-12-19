import React from 'react';
import { withRouter } from "react-router-dom";
import { loginAsUser } from '../../redux/actions/action';
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
            console.log(values)
            if (values.usrname === '') {
                this.pushNotification("warning", "Username Empty", this.props.dispatch);
                return;
            }
            if (values.pwd === '') {
                this.pushNotification("warning", "Password Empty", this.props.dispatch);
                return;
            }

            var successAction = (result) => {
                if (result.status === "ok") {
                    this.handleSuccess(values.usrname, result.data.token);
                } else {
                    this.pushNotification("warning", "Username or Password Wrong");
                }
            }

            var errorAction = (result) => {
                this.pushNotification("warning", "Username or Password Wrong");
            }

            let param = `?email=${values.usrname}&password=${values.pwd}`
            this.post('/api/login' + param, null, successAction, errorAction);

        });
    }

    handleSuccess = (username, token) => {
        this.props.dispatch(loginAsUser(username, token));
        localStorage.setItem('user', username);
        localStorage.setItem('token', token);
        this.props.onCancel()
        this.pushNotification("success", "Sign In Successfully As " + username);
    }

    renderLogo = () => {
        return (
            <Row type="flex" justify='center'>
                <img style={styles.logo} src={require("@/assets/logo2.png")} />
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
                            Welcome to CodePass
                        </Row>
                        <Row type="flex" justify="start" style={styles.welcome2}>
                            Sign In
                        </Row>
                        <Form onSubmit={this.handleSubmit} type='flex' justify='center'>
                            <Row type="flex" justify='center'>
                                <FormText form={this.props.form}
                                    label='' name='usrname' required={true} icon="user" />

                                <FormText form={this.props.form}
                                    label='' name='pwd' required={true} icon="lock"
                                    inputType="password" />
                                <FormButton form={this.props.form} label="SignIn" style={styles.button} />
                                <Button style={styles.button2} onClick={this.props.onCancel}>
                                    Cancel
                                </Button>
                            </Row>
                        </Form>
                        <Row type='flex' justify='center'>
                            <Col>
                                Not a member yet? <Button onClick={this.props.switch} type="link">Sign Up</Button>
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


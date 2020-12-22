import { Component } from 'react';
import { notification } from 'antd';

let moment = require('moment');

class BaseComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: null
        }
    }

    ip = "http://katty.top:8000";

    post = (url, form, successAction, unsuccessAction, errorAction) => {
        const token = localStorage.getItem("token")
        return fetch(this.ip + url, {
            method: 'POST',
            mode: 'cors',
            body: form,
            credentials: 'include',
            headers: {
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            }
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error);
            })
            .then((result) => {
                this.handleResult(result, successAction, unsuccessAction, errorAction);
            })
            .catch((reason) => {
                console.error(reason)
            })
    }

    get = (url, successAction) => {
        let unsuccessAvtion = (result) => {
            console.log(result.message)
            this.pushNotification("warning", result.message);
        }
        let errorAction = () => {
            console.log("error")
        }
        this.getWithErrorAction(url, successAction, unsuccessAvtion, errorAction)
    }

    getWithErrorAction = (url, successAction, unsuccessAction, errorAction) => {
        const token = localStorage.getItem("token")
        return fetch(this.ip + url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            }
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error);
            })
            .then((result) => {
                this.handleResult(result, successAction, unsuccessAction, errorAction);
            });
    }

    timeout(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms, 'done');
        });
    }

    handleResult = (result, successAction, unsuccessAction, errorAction) => {
        if (!result) {
            if (errorAction) errorAction()
            this.pushNotification("warning", "Connection Failure");
            return;
        } else if (result.status === null) {
            if (unsuccessAction) unsuccessAction(result)
            return;
        }
        if (result.status === 401) {
            console.log("Token 失效")
            localStorage.clear()
        }
        successAction(result);
    }

    fromNow = (date) => {
        return moment(date).fromNow()
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleDate = (_date, count) => {
        if (_date) {
            _date += ""
            let date = _date.substring(5, 7) + "月" + _date.substring(8, 10) + "日";
            if (count === 1)
                date += "（今天）";
            else if (count === 2)
                date += "（明天）";
            return date;
        }
    }

    handleTime = (_time) => {
        if (_time) {
            _time += ""
            let time = _time.substring(11, 16)
            return time
        }
    }

    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    pushNotification = (kind, reason) => {
        notification.config({
            placement: 'topRight',
            top: 80,
            duration: 4,
        });
        if (kind === 'warning')
            notification.warning({
                message: reason,
                description: "失败了",
            })
        else if (kind === 'success')
            notification.success({
                message: reason,
                description: "成功了"
            })
        else
            notification.open({
                message: reason,
                description: "发生了未知错误"
            })
    }

    scrollToView = (id) => {
        if (id) {
            let anchorElement = document.getElementById(id);
            if (anchorElement) {
                anchorElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }

    sleep(delay) {
        let start = (new Date()).getTime();
        while ((new Date()).getTime() - start < delay) { }
    }

    loadStorage(key) {
        return localStorage.getItem(key)
    }
}

export default BaseComponent;
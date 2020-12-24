import React from 'react'
import { Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { cancelModal, setOnCancel, showSignIn } from '../redux/actions/action';
import { notification } from 'antd';

const mapStateToProps = state => ({
    user_redux: state.identityReducer.user,
    admin_redux: state.identityReducer.admin,
    sales_redux: state.identityReducer.sales
})

const PrivateRoute = function ({
    // 解构赋值 将 props 里面的 component 赋值给 Component
    component: Component,
    user_redux,
    admin_redux,
    sales_redux,
    location,
    history,
    dispatch,
    path,//路径
    role,//如果需要授权，需要的权限等级
    auth,//是否需要授权
    ...props
}) {
    const jumpBack = (_user) => {
        if (!_user || !_user.id)
            history.replace('/user/home')
        dispatch(cancelModal())
    }

    const pushNotification = (kind, reason) => {
        notification.config({
            placement: 'topRight',
            top: 80,
            duration: 4,
        });
        if (kind === 'warning')
            notification.warning({
                message: reason,
                description: "请求失败",
            })
        else if (kind === 'success')
            notification.success({
                message: reason,
                description: "请求成功"
            })
        else
            notification.open({
                message: reason,
                description: ""
            })
    }

    let islogin = false
    switch (role) {
        case 0:
            islogin = user_redux
            break
        case 1:
            islogin = admin_redux
            break
        case 2:
            islogin = sales_redux
            break
        default:
            break
    }
    return (
        <Route {...props}
            path={path}
            render={(p) => {
                // 传了user参数 或者 redux中有登录信息 或者 该页面不需要鉴权
                // 正常渲染
                if (islogin || !auth) {
                    return <Component />
                } else {
                    pushNotification("warning", "请先登录再进行操作")
                    history.push({ pathname: "/user/home" })
                    dispatch(showSignIn())
                    dispatch(setOnCancel(jumpBack))
                    return null
                }
            }} />
    )
}

PrivateRoute.defaultProps = {
    user: null,
    role: 0
}

export default connect(mapStateToProps)(withRouter(PrivateRoute))
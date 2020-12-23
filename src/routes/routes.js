import * as Pages from '../pages'
import UserLayout from '../components/layouts/user/UserLayout'
import AdminLayout from '../components/layouts/admin/AdminLayout'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form } from 'antd'
import { Collect } from '../pages/user/collect'

const mapStateToProps = state => ({
    user: state.identityReducer.user,
})

var wrap = (component) => {
    return Form.create()(connect(mapStateToProps)(withRouter(component)))
}

const mainRoutes = [//默认路由（其实是第二层，第一层在隔壁index.jsx用来加载外层layout
    {
        path: "/user",
        icon: 'user',
        component: UserLayout,
        children: [
            {
                path: "/home",
                icon: 'home',
                component: wrap(Pages.User.Home),
            },
            {
                path: "/my",
                icon: 'my',
                component: wrap(Pages.User.My),
            },
            {
                path: "/list",
                icon: 'list',
                component: wrap(Pages.User.List),
            },
            {
                path: "/search",
                icon: 'search',
                component: wrap(Pages.User.Search)
            },
            {
                path: "/detail",
                icon: 'detail',
                component: wrap(Pages.User.Detail)
            },
            {
                path: "/person",
                icon: 'person',
                component: wrap(Pages.User.Person)
            },
            {
                path: "/user",
                icon: 'user',
                component: wrap(Pages.User.User)
            },
            {
                path: "/playground",
                icon: 'playground',
                component: wrap(Pages.Playground)
            },
        ]
    },
    {
        path: "/admin",
        icon: 'admin',
        component: AdminLayout,
        children: [
            {
                path: "/home",
                icon: 'home',
                component: wrap(Pages.Admin.Home),
            },
            {
                path: "/collect",
                icon: 'collect',
                component: wrap(Collect)
            },
        ]
    }
];

export default mainRoutes;
import * as Pages from '../pages'
import UserLayout from '../components/layouts/user/UserLayout'
import AdminLayout from '../components/layouts/admin/AdminLayout'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin
})

var wrap = (component) => {
    return connect(mapStateToProps)(withRouter(component))
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
        auth: true,
        role: 1,
        component: AdminLayout,
        children: [
            {
                path: "/home",
                icon: 'home',
                component: wrap(Pages.Admin.Home),
            },
            {
                path: "/question",
                icon: 'question',
                component: wrap(Pages.Admin.Question)
            },
            {
                path: "/answer",
                icon: 'answer',
                component: wrap(Pages.Admin.Answer)
            },
            {
                path: "/user",
                icon: 'user',
                component: wrap(Pages.Admin.User)
            },
            {
                path: "/docker",
                icon: 'docker',
                component: wrap(Pages.Admin.Docker)
            },
        ]
    }
];

export default mainRoutes;
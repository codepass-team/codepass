import * as Pages from '../pages'
import UserLayout from '../components/layouts/user/UserLayout'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form } from 'antd'
import Person from '../pages/user/person/person'
import User from '../pages/user/user'
import { Playground } from '../pages/user/playground'
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
                component: wrap(Person)
            },
            {
                path: "/user",
                icon: 'user',
                component: wrap(User)
            },
            {
                path: "/playground",
                icon: 'playground',
                component: wrap(Playground)
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
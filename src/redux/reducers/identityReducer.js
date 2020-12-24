var identityReducer = (state = {}, action) => {

    switch (action.type) {

        case 'LOGINASUSER':
            localStorage.setItem('user', action.user)
            localStorage.removeItem('isAdmin')
            localStorage.removeItem('isSales')
            return { ...state, user: action.user, admin: null, sales: null };

        case 'LOGINASADMIN':
            localStorage.setItem('user', action.admin)
            localStorage.setItem('isAdmin', true)
            localStorage.removeItem('isSales')
            return { ...state, user: null, admin: action.admin, sales: null };

        case 'LOGINASSALES':
            localStorage.setItem('user', action.admin)
            localStorage.removeItem('isAdmin')
            localStorage.setItem('isSales', true)
            return { ...state, user: null, admin: null, sales: action.sales };

        case 'LOGOUT':
            localStorage.clear()
            return { ...state, user: null, admin: null, sales: null };

        default:
            return state;
    }
}

export default identityReducer;

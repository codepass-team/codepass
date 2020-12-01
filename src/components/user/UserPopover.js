import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux"
import BaseComponent from "../BaseComponent"
import {List, ListItem, Typography} from '@material-ui/core';
import {logout} from '../../redux/actions/action';

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin
})

class UserPopover extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleClose = name => () => {
        this.setState({
            [name]: null,
        });
    };

    signOut = () => {
        localStorage.clear()
        this.props.dispatch(logout())
    }

    // payRecord=()=>{
    //     this.props.dispatch(showDrawer("历史消费记录",<PayRecord/>))
    // }

    render() {

        return (
            <List component="nav">
                <ListItem button onClick={this.signOut}>
                    <Typography>Sign Out</Typography>
                </ListItem>
            </List>
        )
    }
}

export default withRouter(connect(mapStateToProps)(UserPopover));
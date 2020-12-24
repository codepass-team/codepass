import React from "react";
import { Row } from 'antd';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import BaseComponent from "../BaseComponent"
import { Avatar, Typography } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin
})

class UserMenu extends BaseComponent {

    handleClose = name => () => {
        this.setState({
            [name]: null,
        });
    };

    renderAvatar = () => {
        const { user, admin } = this.props
        if (user === null && admin === null)
            return null;
        return (
            <Avatar style={styles.avatar}>
                {(user || admin || 'Coder').toUpperCase()}
            </Avatar>
        )
    }

    /* <Avatar style={styles.avatar} src={this.getImagePath(this.props.user.avatarId)}/> */

    render() {
        const { user, admin } = this.props
        if (user === null && admin === null) {
            return null;
        }

        return (
            <Row type="flex" align='middle' justify="center" style={styles.container}>
                {this.renderAvatar()}
                <Typography style={styles.title1}>Welcome,</Typography>
                <Typography style={styles.title2}>{this.props.user || this.props.admin || "Coder"}</Typography>
            </Row>
        )
    }
}

const styles = {
    container: {
        backgroundColor: "rgba(0,0,0,0)",
    },
    title1: {
        color: "white",
        fontSize: '20px',
    },
    title2: {
        color: "white",
        fontSize: '22px',
        marginLeft: 5
    },
    avatar: {
        marginRight: 20,
    },

};


export default withRouter(connect(mapStateToProps)(UserMenu));
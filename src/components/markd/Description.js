import React from "react";
import BaseComponent from "../BaseComponent"

const ReactMarkdown = require('react-markdown')

export default class Description extends BaseComponent {

    render() {
        if (this.props.desp == null) {
            return null;
        }

        return (
            <ReactMarkdown
                source={this.props.desp}
                escapeHtml={false}
                renderers={{
                    paragraph: props => <paragraph {...props} style={{marginBottom: 5}}/>
                }}
            />
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

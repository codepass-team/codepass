import React from "react";
import BaseComponent from "../BaseComponent"

const ReactMarkdown = require('react-markdown')

export default class Description extends BaseComponent {

    render() {
        if (this.props.desp === null) {
            return null;
        }

        return (
            <ReactMarkdown
                source={this.props.desp}
                escapeHtml={false}
                renderers={{
                    paragraph: props => <p {...props} style={{ marginBottom: 5 }} />
                }}
            />
        )
    }
}

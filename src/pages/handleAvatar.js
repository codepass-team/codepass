import React from "react"
import { Avatar } from 'antd'
import BaseComponent from '../components/BaseComponent';

export default class MyAvatar extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            name: '',
            color: '',
            size: props.size ? props.size : 55
        }
    }

    getName = () => {
        if (this.props.name.length < 2) return this.props.name.toUpperCase()
        if (this.props.name.length % 2 == 0) {
            return this.props.name.substring(0, 2).toUpperCase()
        }
        return this.props.name.substring(0, 3).toUpperCase()
    }

    hashColor = () => {
        let id = this.state.id
        let x = id % 10, y = id % 100 / 10
        for (let i = 0; i < id % 256; i++) {
            x = x * id % 256;
            y = y * id % 256;
        }
        this.state.color = 'rgb(' + x + ',' + y + ',' + x * y % 256 + ')';
    }

    componentWillMount() {
        this.state.id = this.props.id
        this.state.name = this.getName()
        this.hashColor();
        console.log(this.state.id, this.state.name, this.state.color);
    }

    render() {
        return (<Avatar shape={this.props.shape || "square"} style={{ marginRight: 8, fontSize: 30, marginTop: 5, backgroundColor: this.state.color }} size={this.state.size}>
            {this.state.name}
        </Avatar>)
    }
}
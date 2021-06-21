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
        }
    }

    getName = () => {
        if (this.props.name.length < 2) return this.props.name
        return this.props.name.substring(0, 3)
    }

    hashColor = () => {
        let id = this.state.id
        let x = id % 10, y = id % 100 / 10
        for (let i = 0; i < id % 256; i++) {
            x = x * id % 256;
            y = y * id % 256;
        }
        this.state.color = 'rgb(' + x + ',' + y + ',' + x * y % 256 + ')';
        console.log(this.state.color);
    }

    componentWillMount() {
        this.state.id = this.props.id
        this.state.name = this.getName()
        this.hashColor();
    }

    render() {
        return (<Avatar shape="square" style={{ marginRight: 8, fontSize: 30, marginTop: 5, backgroundColor:this.state.color }} size={55}>
            {this.state.name}
        </Avatar>)
    }
}
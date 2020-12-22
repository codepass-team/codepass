import React from "react";
import { Row, Col } from "antd";
import BaseComponent from "../../../components/BaseComponent";

export class Playground extends BaseComponent {


    render() {
        return (
            <div>
                <Row>Hello</Row>
                <Row><Col>Hello</Col></Row>
                <Row><Col>Hello</Col></Row>
            </div>
        )
    }
}
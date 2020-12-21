import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { withRouter } from "react-router-dom";
import User from '../../../components/auth/user'
import { Card, Col, Icon, Row, Typography } from 'antd';
import Description from '../../../components/markd/Description'

const { Paragraph } = Typography;


class QCard extends BaseComponent {

    constructor(props){
        super(props)
        this.state={
            LikeIconColor:'#1890ff'
        }
    }

    changeLikeColor = ()=>{
        if(this.state.LikeIconColor=='#33ff33'){
            Icon.setTwoToneColor('#1890ff')
            this.setState({LikeIconColor:'#1890ff'})
        }
        else{
            Icon.setTwoToneColor('#33ff33')
            this.setState({LikeIconColor:'#33ff33'})
        }
    }

    renderTitle = (title, likeCount, user, time, qid) => {
        return (
            <Card style={{ marginTop: 8 }} bodyStyle={{ paddingTop: 12, paddingBottom: 12, margin: 0 }}>
                <Col span={12}  style={{ fontSize: 18,paddingLeft:5,paddingTop:3 }}>
                    <a onClick={() => {
                        this.props.history.push({
                            pathname: "/user/detail",
                            state: { qid, user, completed: true }
                        })
                    }}>
                        {title}
                    </a>
                    <Icon type="fire" style={{marginRight:5,marginLeft:5,fontSize:13}} onClick={this.changeLikeColor}/>
                    <p style={{fontSize:13,display:'inline'}}>{likeCount}</p>
                </Col>
                <Col span={12}>
                    <p style={{fontStyle:'Italic',marginBottom:0,float:'right',paddingTop:5}}>{this.handleDate(time)+' '+this.handleTime(time)}</p>
                </Col>
            </Card>
        );
    }

    componentWillMount() {
    }

    render() {
        const { title, likeCount, user, qid, raiseTime } = this.props.data
        return (
            this.renderTitle(title, likeCount, user, raiseTime, qid)  //title,desp,user,time,qid
        );
    }
}


export default withRouter(QCard);

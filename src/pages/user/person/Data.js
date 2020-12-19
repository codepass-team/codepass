import { Button, Col, Divider, Input, Radio, Row, Select,InputNumber } from 'antd';
import React from 'react'
import BaseComponent from '../../../components/BaseComponent';
import {EditTwoTone,PlusCircleTwoTone} from '@ant-design/icons'
import './css/data.css'

const {Option} = Select

export default class Data extends BaseComponent{
    constructor(props){
        super(props)
        this.state={
            display_btn:false,
            display_msg:true,
            save_btn_disabled:true,
            input:null
        }
    }

    render(){
        return (
            <Col className='each-div'>
                <Col span={6} className='title-div'>
                    <h3 className='title'>{this.props.name}</h3>
                </Col>
                {this.state.display_msg?this.renderRow():this.renderModifyData()}
            </Col>
        )
    }

    renderRow(){
        if(this.props.content == null){
            return (
                <Col className='msg' span={18} onMouseOver={()=>this.handleMouseOver()} onMouseOut={()=>this.handleMouseOut()}>
                    <span className='msg-text'>未知</span>
                    <Button 
                        type='default' 
                        size='default' 
                        className='modify-btn' 
                        style={{display:this.state.display_btn?'inline-block':'none'}}
                        onClick={()=>this.modifyButtonClick()}
                    >
                        <PlusCircleTwoTone></PlusCircleTwoTone>
                        <span className='change-text'>添加</span>
                    </Button>
                </Col>
            )
        }
        else{
            return (
                <Col className='msg' span={18} onMouseOver={()=>this.handleMouseOver()} onMouseOut={()=>this.handleMouseOut()}>
                    <span className='msg-text'>{this.props.content}</span>
                    <Button 
                        type='default'
                        size='default' 
                        className='modify-btn' 
                        style={{display:this.state.display_btn?'inline-block':'none'}}
                        onClick={()=>this.modifyButtonClick()}
                    >
                        <EditTwoTone></EditTwoTone>
                        <span className='change-text'>修改</span>
                    </Button>
                </Col>
            )
        }
    }

    handleMouseOver(){
        this.setState({
            display_btn:true
        })
    }

    handleMouseOut(){
        this.setState({
            display_btn:false
        })
    }

    modifyButtonClick = ()=>{
        this.setState({
            display_msg:false
        })
    }

    cancelButtonClick = ()=>{
        this.setState({
            display_msg:true
        })
    }

    inputChange = (value)=>{
        this.setState({
            save_btn_disabled:false,
            input:value
        })
    }

    radioChecked = ()=>{
        var radios = document.getElementById('radioGroup').children
        for(let i=0;i<radios.length;i++){
            if(radios[i].checked){
                return radios[i].value
            }
        }
    }

    renderModifyData(){
        switch(this.props.name){
            case('昵称'):
                return (
                    <Col span={18}>
                        <Input 
                        placeholder={this.props.content?this.props.content:''} 
                        style={{width:'50%'}} onChange={(e)=>{this.inputChange(e.target.value)}}
                        />
                        <Button 
                        type='primary' 
                        className='operate-btn' 
                        disabled={this.state.save_btn_disabled?true:false}
                        onClick={()=>this.props.onChangeState({name:{name:'昵称',content:this.state.input}})}
                        >保存</Button>
                        <Button onClick={()=>{this.cancelButtonClick()}} className='operate-btn'>取消</Button>
                    </Col>
                )
            case('性别'):
                return (
                    <Col span={18}>
                        <Radio.Group buttonStyle='solid' onChange={(e)=>this.inputChange(e.target.value)}>
                            <Radio.Button value='男'>男</Radio.Button>
                            <Radio.Button value='女'>女</Radio.Button>
                        </Radio.Group>
                        <Button 
                        type='primary' 
                        className='operate-btn'
                        onClick={()=>this.props.onChangeState({gender:{name:'性别',content:this.state.input}})}
                        >保存</Button>
                        <Button onClick={()=>{this.cancelButtonClick()}} className='operate-btn'>取消</Button>
                    </Col>
                )
            case('职业'):
            console.log('职业')
                return (
                    <Col span={18}>
                        <Input 
                        placeholder={this.props.content?this.props.content:''} 
                        style={{width:'50%'}} onChange={(e)=>{this.inputChange(e.target.value)}}
                        />
                        <Button 
                        type='primary' 
                        className='operate-btn' 
                        disabled={this.state.save_btn_disabled?true:false}
                        onClick={()=>this.props.onChangeState({job:{name:'职业',content:this.state.input}})}
                        >保存</Button>
                        <Button onClick={()=>{this.cancelButtonClick()}} className='operate-btn'>取消</Button>
                    </Col>
                )
            case('所在行业'):
                console.log('所在行业')
                return (
                    <Col span={18}>
                        <Select style={{width:'50%'}} 
                        defaultValue='高新科技'
                        onChange={e=>this.inputChange(e)}
                        >
                            <Option value='高新科技'>高新科技</Option>
                            <Option value='互联网'>互联网</Option>
                            <Option value='电子商务'>电子商务</Option>
                            <Option value='电子游戏'>电子游戏</Option>
                            <Option value='计算机'>计算机</Option>
                            <Option value='出版业'>出版业</Option>
                            <Option value='金融'>金融</Option>
                            <Option value='银行'>银行</Option>
                            <Option value='财务'>财务</Option>
                            <Option value='酒店'>酒店</Option>
                            <Option value='旅游'>旅游</Option>
                            <Option value='广告'>广告</Option>
                            <Option value='制药'>制药</Option>
                            <Option value='信息传媒'>信息传媒</Option>
                            <Option value='教育'>教育</Option>
                            <Option value='个体户'>个体户</Option>
                            <Option value='化工业'>化工业</Option>
                        </Select>
                        <Button type='primary' className='operate-btn'
                        onClick={()=>this.props.onChangeState({tech:{name:'所在行业',content:this.state.input}})}>保存</Button>
                        <Button onClick={()=>{this.cancelButtonClick()}} className='operate-btn'>取消</Button>
                    </Col>
                )    
            case('年龄'):
                return (
                    <Col span={18}>
                        <InputNumber min={1} max={100} style={{width:'50%'}} onChange={(e)=>{this.inputChange(e)}}></InputNumber>
                        <Button type='primary' className='operate-btn' disabled={this.state.save_btn_disabled?true:false}
                        onClick={()=>this.props.onChangeState({age:{name:'年龄',content:this.state.input}})}>保存</Button>
                        <Button onClick={()=>{this.cancelButtonClick()}} className='operate-btn'>取消</Button>
                    </Col>
                )
        }
    }
}
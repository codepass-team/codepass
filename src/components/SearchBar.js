import React from "react";
import {AutoComplete, Input} from 'antd';
import BaseComponent from './BaseComponent'
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {setKeyword} from '../redux/actions/action'

const mapStateToProps = state => ({
    keyword: state.keywordReducer.keyword,
})

const { Option } = AutoComplete

var key = 0

class SearchBar extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            isEnter: false,
            dataSource: [],
            name: ""
        }
    };

    search = () => {
        const keyword = this.state.name
        this.props.dispatch(setKeyword(keyword))
        if (!keyword || keyword === "") {
            this.pushNotification("warning", "Keyword shouldn't be empty.")
            return
        }
        this.props.history.push({pathname: "/user/", state: {keyword}})
        this.timeout(1).then(() =>

            this.props.history.push({pathname: "/user/search", state: {keyword}}))

    }

    fetchAutoComplete = (value) => {
        console.log(value)
        var successAction = (result) => {
            const group = result.data
            console.log(group)
            this.setState({dataSource: group});
        }
        this.get('/api/question/searchRecommend?keywords=' + value + '&limits=5', successAction)
    }

    autoOnChange = (value) => {
        var val = value.split(',')[0]
        this.setState({
            name: value
        })
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timeout(500).then(() => {
            this.fetchAutoComplete(val)
        });
    }

    renderSearch = () => {
        let style = {}
        if (this.state.isEnter)
            style = {width: '100%', opacity: 1, fontFamily: "Georgia"}
        else
            style = {width: '100%', opacity: 0.4, fontFamily: "Georgia"}
        return (
            <AutoComplete
                size="large"
                style={style}
                defaultActiveFirstOption={false}
                dataSource={this.state.dataSource.map(item=>{
                    key = key + 1;
                    var uqKey= item+','+key
                    return <Option key={uqKey}>{item}</Option>
                })}
                onChange={this.autoOnChange}
                placeholder="Search For An Existing QA">
                <Input.Search
                    size="large"
                    onSearch={this.search}
                />
            </AutoComplete>
        )
    }

    render() {
        return (
            <div
                onClick={() => this.setState({isEnter: true})}>
                {this.renderSearch()}
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(SearchBar));
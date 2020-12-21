import React from "react";
import { AutoComplete, Input } from 'antd';
import BaseComponent from './BaseComponent'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { setKeyword } from '../redux/actions/action'

const mapStateToProps = state => ({
    keyword: state.keywordReducer.keyword,
})

const { Option } = AutoComplete

class SearchBar extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            query: "",
            isEnter: false,
            dataSource: [],
        }
    };

    search = () => {
        const keyword = this.state.query
        this.props.dispatch(setKeyword(keyword))
        if (!keyword || keyword === "") {
            this.pushNotification("warning", "Keyword shouldn't be empty.")
            return
        }
        this.props.history.push({ pathname: "/user/", state: { keyword } })
        this.timeout(1).then(() => this.props.history.push({ pathname: "/user/search", state: { keyword } }))
    }

    fetchAutoComplete = (value) => {
        var successAction = (result) => {
            const group = result.data
            this.setState({ dataSource: group });
        }
        this.get('/api/question/searchRecommend?keywords=' + value + '&limits=5', successAction)
    }

    autoOnChange = (value) => {
        this.setState({
            query: value
        })
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timeout(500).then(() => {
            this.fetchAutoComplete(value)
        });
    }

    renderSearch = () => {
        let style = {}
        if (this.state.isEnter)
            style = { width: '100%', opacity: 1, fontFamily: "Georgia" }
        else
            style = { width: '100%', opacity: 0.4, fontFamily: "Georgia" }
        return (
            <AutoComplete
                size="large"
                style={style}
                value={this.state.query}
                dataSource={this.state.dataSource.map(item => <Option key={item}>{item}</Option>)}
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
            <div onClick={() => this.setState({ isEnter: true })}>
                {this.renderSearch()}
            </div>
        );
    }
}

export default connect(mapStateToProps)(withRouter(SearchBar));
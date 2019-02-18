import React, { Component } from 'react';
import { is, fromJS } from 'immutable';//处理巨大的对象
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';//使用prop-types检测props数据类型
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './header.less';
export default class PublicHeader extends Component{
    static propTypes = {
        record: PropTypes.any,
        title: PropTypes.string.isRequired,
        confirm: PropTypes.any,
    }
    state = {
        navState:false,//导航栏是否显示
    };
    // 切换左侧导航栏状态
    toggleNav = ()=>{
        this.setState({
            navState:!this.state.navState
        })
    }
    // css动画组件设置为目标组件
    FirstChild = props => {
        const childrenArray = React.Children.toArray(props.children);
        return childrenArray[0] || null;
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps))|| !is(fromJS(this.state),fromJS(nextState))
    }
    render(){
        return(
            <header>
                <span className="header-slide-icon icon-catalog" onClick={this.toggleNav}></span>
                <span className="header-title">{this.props.title}</span>
                <ReactCSSTransitionGroup
                component={this.FirstChild}
                transitionName="nav"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                    {
                    this.state.navState && <aside key='nav-slide' className="nav-slide-list" onClick={this.toggleNav}>
                        <NavLink to="/" exact className="nav-link icon-jiantou-copy-copy">首页</NavLink>
                        <NavLink to="/balance" exact className="nav-link icon-jiantou-copy-copy">提现</NavLink>
                        <NavLink to="/helpcenter" exact className="nav-link icon-jiantou-copy-copy">帮助中心</NavLink>
                    </aside>
                    }
                </ReactCSSTransitionGroup>
            </header>
        )
    }
}
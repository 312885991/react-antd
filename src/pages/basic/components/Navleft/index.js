import React from 'react';
import { Menu, Button, Icon } from 'antd';
import { Link } from 'react-router-dom'
import BasicMenu from '../../BasicMenu'
import { connect } from 'react-redux';
import { changeMenu } from '../../../../redux/action'
import './index.less'
const { SubMenu } = Menu;
const MenuItem = Menu.Item;
 class NavLeft extends React.Component{

    state = {}

    componentWillMount(){
        const menuTreeNode = this.renderMenu(BasicMenu);
        let activeKey = window.location.pathname;
        this.setState({
            menuTreeNode,
            activeKey
        })
    }

    handleChangePath = ({item, key, keyPath}) =>{
        const { dispatch} = this.props;
        // 派发action 改变store数据
        dispatch(changeMenu(item.props.title));
        this.setState({
            activeKey: key
        })
    }

    renderMenu = (data) => {
        return data.map((item) => {
            if(item.children){
                return (
                    <SubMenu title={item.name} key={item.path}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <MenuItem title={item.name} key={item.path}>
                    <Link to={item.path}>{item.name}</Link>
                </MenuItem>
            )
        })
    }
    render(){
        return(
            <div>
                <div className="logo">
                    <img src="/assets/logo.svg" />
                    <h1>Antd Basic MS</h1>
                </div>
                <Menu theme="dark"
                    onClick={this.handleChangePath}
                    selectedKeys={this.state.activeKey}
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}

export default connect()(NavLeft)

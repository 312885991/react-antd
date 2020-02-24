import React from 'react'
import { Card, Button, Radio } from 'antd'

export default class Buttons extends React.Component{

    state = {
        loading: true,
        size: 'default'
    }

    handleOpen = () =>{
        this.setState({
            loading:true
        })
    }

    handleShutdown = () =>{
        this.setState({
            loading:false
        })
    }

    handleChange = (e) =>{
        this.setState({
            size: e.target.value
        })
    }

    render(){
        const { loading, size } = this.state;
        return(
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">ReactAntd</Button>
                    <Button>ReactAntd</Button>
                    <Button type="dashed">ReactAntd</Button>
                    <Button type="danger">ReactAntd</Button>
                    <Button disabled>ReactAntd</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap" style={{marginTop:10}}>
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button icon="search" shape="circle" />
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="Loading按钮" className="card-wrap" style={{marginTop:10}}>
                    <Button type="primary" loading={loading}>确定</Button>
                    <Button loading={loading} type="primary" shape="circle" />
                    <Button loading={loading} onClick={this.handleOpen}>点击加载</Button>
                    <Button loading={loading} shape="circle" />
                    <Button type="primary" onClick={this.handleShutdown}>点击关闭</Button>
                </Card>
                <Card title="按钮尺寸" className="card-wrap" style={{marginTop:10}}>
                    <Radio.Group onChange={this.handleChange} value={size}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={size}>ReactAntd</Button>
                    <Button type="default" size={size}>ReactAntd</Button>
                    <Button type="dashed" size={size}>ReactAntd</Button>
                    <Button type="danger" size={size}>ReactAntd</Button>
                </Card>
            </div>
        )
    }
}
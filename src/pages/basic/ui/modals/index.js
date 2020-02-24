import React from 'react'
import { Card, Modal, Button } from 'antd'
import './index.less'
export default class Modals extends React.Component{

    state = {
        showModal1:false,
        showModal2:false,
        showModal3:false,
        showModal4:false
    }

    handleOpen = (type) =>{
        this.setState({
            [type]:true
        })
    }

    handleShutDown = (type) =>{
        this.setState({
            [type]:false
        })
    }

    handleClick = (type) =>{
        Modal[type]({
            title: "提示",
            content: "你确定你学会了React吗？"
        })
    }

    render(){
        return(
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal3')}>顶部20px弹窗</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框" className="card-wrap" style={{marginTop:10}}>
                    <Button type="primary" onClick={()=>this.handleClick('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={()=>this.handleClick('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleClick('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleClick('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.handleClick('warning')}>Warning</Button>
                </Card>
                <Modal
                    title="React-Antd"
                    visible={this.state.showModal1}
                    onOk={()=>this.handleShutDown('showModal1')}
                    onCancel={()=>this.handleShutDown('showModal1')}
                >
                    <p>欢迎来到React-Antd的天地</p>
                </Modal>
                <Modal
                    title="React-Antd"
                    visible={this.state.showModal2}
                    onOk={()=>this.handleShutDown('showModal2')}
                    onCancel={()=>this.handleShutDown('showModal2')}
                    okText="我学会了"
                    cancelText="我还没学会"
                >
                    <p>您是否学会了React-Antd的使用？</p>
                </Modal>
                <Modal
                    title="React-Antd"
                    visible={this.state.showModal3}
                    onOk={()=>this.handleShutDown('showModal3')}
                    onCancel={()=>this.handleShutDown('showModal3')}
                    style={{top:20}}
                >
                    <p>欢迎来到React-Antd的天地</p>
                </Modal>
                <Modal
                    title="React-Antd"
                    visible={this.state.showModal4}
                    onOk={()=>this.handleShutDown('showModal4')}
                    onCancel={()=>this.handleShutDown('showModal4')}
                    wrapClassName="vertical-center-modal"
                >
                    <p>欢迎来到React-Antd的天地</p>
                </Modal>
            </div>
        )
    }
}
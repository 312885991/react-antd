import React from 'react';
import { Card, Button, notification } from 'antd';

export default class Notification extends React.Component{

    handleClick = (type) =>{
        notification[type]({
            message:"发工资了",
            description:"上月考勤22天，迟到12天，实发工资250，请笑纳"
        })
    }

    handleChangePosition = (type, placement) =>{
        notification[type]({
            message:"发工资了",
            description:"上月考勤22天，迟到12天，实发工资250，请笑纳",
            placement
        })
    }

    render(){
        return(
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleClick('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleClick('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleClick('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.handleClick('error')}>Error</Button>
                </Card>
                <Card title="通知提醒框-方向控制" className="card-wrap" style={{marginTop:10}}>
                    <Button type="primary" onClick={()=>this.handleChangePosition('success', 'topLeft')}>Success-TopLeft</Button>
                    <Button type="primary" onClick={()=>this.handleChangePosition('info', 'topRight')}>Info-TopRight</Button>
                    <Button type="primary" onClick={()=>this.handleChangePosition('warning', 'bottomLeft')}>Warning-BottomLeft</Button>
                    <Button type="primary" onClick={()=>this.handleChangePosition('error', 'bottomRight')}>Error-BottomRight</Button>
                </Card>
            </div>
        )
    }
}

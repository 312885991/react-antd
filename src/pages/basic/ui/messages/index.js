import React from 'react';
import { Card, message, Button } from 'antd'

export default class Messages extends React.Component{

    handleClick = (type) =>{
        message[type]('恭喜你，学会了React的基础知识');
    }

    render(){
        return(
            <div>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleClick('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleClick('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleClick('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.handleClick('warning')}>Warning</Button>
                </Card>
            </div>
        )
    }
}
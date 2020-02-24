import React from 'react'
import { Result, Button } from 'antd'

export default class NotFound extends React.Component{

    handleClick = () =>{
        window.location.href = '/basic/home';
    }

    render(){
        return(
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={this.handleClick}>返回首页</Button>}
            />
        )
    }
}
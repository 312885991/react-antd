import React from 'react';
import { Card, Form, Button, Icon, Input, Checkbox, message } from 'antd';
const FormItem = Form.Item;
class Login extends React.Component {

    render() {
        return (
            <div>
                <Card title="登录行内表单">
                    <InlineLogin />
                </Card>
                <Card title="登录水平表单" style={{marginTop:10}}>
                    <HorizontalLogin />
                </Card>
            </div>
        )
    }
}

class InlineLogin extends React.Component{
    
    handleSubmit = () => {
        this.props.form.validateFields((errors, values)=>{
            if(!errors){
                message.success(`您提交的用户名是${values.username},密码是${values.password}`)
            }
        })
    }
    
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form layout="inline">
                        <FormItem>
                            {
                                getFieldDecorator('username',{
                                    rules:[{
                                        required:true,
                                        message:'用户名不能为空'
                                    }]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入用户名"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password',{
                                    rules:[{
                                        required:true,
                                        message:'密码不能为空'
                                    }]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入密码"
                                        type="password"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                        </FormItem>
                    </Form>
            </div>
        )
    }
}

InlineLogin = Form.create()(InlineLogin);

class HorizontalLogin extends React.Component{

    handleLogin = () => {
        this.props.form.validateFields((errors, values)=>{
          if(!errors){
                message.success(`您提交的用户名是${values.username},密码是${values.password}`)
            }
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form layout="horizontal" style={{width:300}}>
                        <FormItem>
                            {
                                getFieldDecorator('username',{
                                    rules:[
                                    {
                                        required:true,
                                        message:'用户名不能为空'
                                    },
                                    {
                                        min:5,max:10,
                                        message:'长度不在范围内'
                                    },
                                    {
                                        pattern:new RegExp('^\\w+$','g'),
                                        message:'用户名必须为字母或者数字'
                                    }
                                ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入用户名"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password',{
                                    rules:[{
                                        required:true,
                                        message:'密码不能为空'
                                    }]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入密码"
                                        type="password"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember',{
                                    valuePropName:'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )   
                            }
                            <a style={{float:'right'}}>忘记密码？</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleLogin} style={{width:300}}>登录</Button>
                        </FormItem>
                    </Form>
            </div>
        )
    }
}
HorizontalLogin = Form.create()(HorizontalLogin);

export default Login;
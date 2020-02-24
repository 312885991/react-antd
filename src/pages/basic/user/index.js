import React from 'react';
import { Form, Button, Card, Table, message, Input, Select, DatePicker, Modal } from 'antd';
import axios from '../../../axios'
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea =Input.TextArea;
export default class User extends React.Component{

    state = {
        loading: false,
        isVisible: false,
        isRoleVisible: false
    }

    componentWillMount(){
        this.requestList();
    }

    // 查询用户信息
    requestList = () => {
        this.setState({
            loading: true
        })
        axios.mock({
            url:'/user'
        }).then((res)=>{
            this.setState({
                loading:false,
                dataSource:res.data
            })
        }).catch((err)=>{
            this.setState({
                loading:false
            })
            message.error("获取数据失败")
        })
    }

    // 删除一条记录
    handleDelete = (item) => {
        message.success(`当前删除的信息为：${item.username}`)
    }


    // 点击行触发
    handleChange = (record, index) => {
        this.setState({
            selectedRowKeys: [index],
            item: record
        })
    }

    // 提交用户信息
    handleSubmitUser = () => {
        this.userForm.props.form.validateFields((err, values)=>{
            if(!err){
                const type = this.state.type;
                if(type == 'detail'){
                    this.setState({
                        isVisible:false
                    })
                    return;
                }
                // 模拟提交数据
                // const url = type == 'add'? '/user/add':'/user/edit'
                // axios.get({
                //     url:url
                // })
                message.success("提交成功");
                this.setState({
                    isVisible:false
                })
                this.userForm.props.form.resetFields();
            }
        })
    }

    // 新增，编辑，用户详情
    handleOperatorUser = (type) => {
        if(type == 'add'){
            this.setState({
                type:'add',
                title:'新增用户',
                isVisible:true
            })
        }
        if(type == 'edit'){
            if(!this.state.item){
                message.error("请先选择一条记录")
            }else{
                // 先调用详情接口查出最新数据
                this.setState({
                    type:'edit',
                    title:'编辑用户',
                    // item: res.data
                    isVisible:true
                })
            }
        }
        if(type == 'detail'){
            if(!this.state.item){
                message.error("请先选择一条记录")
            }else{
                // 先调用详情接口查出最新数据
                this.setState({
                    type:'detail',
                    title:'用户详情',
                    // item: res.data
                    isVisible:true,
                    hasFooter:false
                })
            }
        }
    }

    // 分配角色
    handleOperatorRole = () => {
        const item = this.state.item;
        if(!item){
            message.error("请选择一条记录")
            return;
        }
        this.requestAllRole();
        this.requestRolesById(item.id);
        this.setState({
            isRoleVisible:true
        })
    }

    // 提交角色
    handleSubmitRole = () => {
        this.roleForm.props.form.validateFields((err, values)=>{
            if(!err){
                // console.log(values.roles);
                // 模拟提交数据
                // const item = this.state.item;
                // axios.get({
                //     url:'/role/modify?id='+ item.id,
                //     data:values.roles
                // })
                message.success("提交成功")
                this.roleForm.props.form.resetFields();
                this.setState({
                    isRoleVisible:false
                })
            }
        })
    }

    // 获取全部角色
    requestAllRole = () => {
        axios.mock({
            url: '/role/list'
        }).then((res)=>{
            this.setState({
                allRole:res.data
            })
        }).catch(()=>{
            message.error("获取角色失败");
        })
    }

    // 根据ID获取该账号下所有角色
    requestRolesById = (id) => {
        axios.mock({
            url: '/getRolesByUserId?id='+id
        }).then((res)=>{
            this.setState({
                roles:res.data
            })
        }).catch(()=>{
            message.error("获取角色失败");
        })
    }

    render(){
        const columns = [
            {
                title:'ID',
                dataIndex:'id',
                key:'id',
                align:'center'
            },
            {
                title:'用户名',
                dataIndex:'username',
                key:'username',
                align:'center',
                width:120,
                render(username){
                return <a>{username}</a>
                }
            },
            {
                title:'性别',
                dataIndex:'sex',
                key:'sex',
                align:'center',
                render(sex){
                    return sex == 1?'男':'女'
                }
            },
            {
                title:'年龄',
                dataIndex:'age',
                key:'age',
                align:'center'
            },
            {
                title:'状态',
                dataIndex:'state',
                key:'state',
                align:'center',
                render(state){
                    return state == 0? '停用':'启用'
                }
            },
            {
                title:'爱好',
                dataIndex:'hobby',
                key:'hobby',
                align:'center',
                render(hobby){
                    let config = {
                        '1':'打篮球',
                        '2':'爬山',
                        '3':'打网球',
                        '4':'游泳',
                        '5':'LOL'
                    }
                    return hobby.map((item)=>
                        config[item]
                    ).join('、');
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
                key:'birthday',
                align:'center'
            },
            {
                title:'地址',
                dataIndex:'address',
                key:'address',
                align:'center'
            },
            {
                title:'操作',
                align:'center',
                render:(item)=>{
                    return <a onClick={()=> this.handleDelete(item)}>删除</a>
                }
            }
        ]
        const { dataSource, loading, selectedRowKeys, item, type, isVisible, title, isRoleVisible, roles, allRole } = this.state;
        const rowSelection = {
            type:'radio',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    item: selectedRows[0]
                })
            }
        }
        return(
            <div>
                <Card>
                    {<FilterForm />}
                </Card>
                <Card className="card-wrap" style={{marginTop:10}}>
                    <Button type="primary" icon="plus" style={{marginBottom:15}} onClick={()=>this.handleOperatorUser('add')}>新增用户</Button>
                    <Button type="primary" icon="edit" style={{marginBottom:15}} onClick={()=>this.handleOperatorUser('edit')}>编辑用户</Button>
                    <Button type="primary" icon="copy" style={{marginBottom:15}} onClick={()=>this.handleOperatorUser('detail')}>用户详情</Button>
                    <Button type="primary" icon="tool" style={{marginBottom:15}} onClick={this.handleOperatorRole}>分配角色</Button>
                    <Table
                        loading={loading}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                        rowSelection={rowSelection}
                        onRow={(record, index)=>{
                            return{
                                onClick:()=>{
                                    this.handleChange(record, index)
                                }
                            }
                        }}
                    />
                </Card>
                <Modal
                    visible={isVisible}
                    title={title}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible:false
                        })
                    }}
                    onOk={()=>{
                        this.handleSubmitUser()
                    }}
                    okText="提交"
                    cancelText="返回"
                >
                    {<UserForm type={type} item={item} wrappedComponentRef={(inst) => this.userForm = inst}/>}
                </Modal>
                <Modal
                    visible={isRoleVisible}
                    title="分配角色"
                    onCancel={()=>{
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible:false
                        })
                    }}
                    onOk={()=>{
                        this.handleSubmitRole()
                    }}
                    okText="提交"
                    cancelText="返回"
                >
                    {<RoleForm item={item} roles={roles} allRole={allRole} wrappedComponentRef={(inst) => this.roleForm = inst}/>}
                </Modal>
            </div>
        )
    }
}

class FilterForm extends React.Component{

    handleReset = () => {
        this.props.form.resetFields();
    }

    handeleQuery = () => {
        let values = this.props.form.getFieldsValue();
        let states = ['停用','启用'];
        let sexs = ['未知','男','女'];
        message.success(`当前提交的信息为：${states[values.state]}|${values.username?values.username:''}|${sexs[values.sex]}`)
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form layout="inline">
                    <FormItem label="账号状态">
                        {
                            getFieldDecorator('state',{
                                initialValue:1
                            })(
                                <Select style={{width:80}}>
                                    <Option value={1}>启用</Option>
                                    <Option value={0}>停用</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="用户名">
                        {
                            getFieldDecorator('username')(
                                <Input placeholder="请输入要查询的用户名" style={{width:170}}/>
                            )
                        }
                    </FormItem>
                    <FormItem label="性别">
                        {
                            getFieldDecorator('sex',{
                                initialValue:1
                            })(
                                <Select style={{width:60}}>
                                    <Option value={1}>男</Option>
                                    <Option value={2}>女</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handeleQuery}>查询</Button>
                    </FormItem>
                    <FormItem>
                        <Button onClick={this.handleReset}>重置</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
FilterForm = Form.create()(FilterForm)


class UserForm extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const item = this.props.item;
        const type = this.props.type;
        const rowObject = {
            minRows:2,
            maxRows:4
        }
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:8
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        return(
            <div>
                <Form>
                    <FormItem label="用户名" {...formItemLayout}>
                        {
                            type == 'detail'?item.username:
                            getFieldDecorator('username',{
                                initialValue: type=='edit'?item.username:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'用户名不能为空'
                                    }
                                ]
                            })(
                                <Input placeholder="请输入用户名"/>
                            )
                        }
                    </FormItem>
                    {
                        type == 'detail'?'':
                        <FormItem label="密码"  {...formItemLayout}>
                            {
                                getFieldDecorator('password',{
                                    initialValue: type == 'edit'?item.password:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'密码不能为空'
                                        }
                                    ]
                                })(
                                    <Input type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                    }
                    <FormItem label="性别"  {...formItemLayout}>
                        {
                            type == 'detail'? item.sex ==1?'男':'女':
                            getFieldDecorator('sex',{
                                initialValue:type=='edit'?item.sex :1
                            })(
                                <Select style={{width:60}}>
                                    <Option value={1}>男</Option>
                                    <Option value={2}>女</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="账号状态"  {...formItemLayout}>
                        {
                            type == 'detail'? item.state ==0?'停用':'启用':
                            getFieldDecorator('state',{
                                initialValue:type=='edit'?item.state:1
                            })(
                                <Select>
                                    <Option value={0}>停用</Option>
                                    <Option value={1}>启用</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="出生日期"  {...formItemLayout}>
                        {
                            type == 'detail'? item.birthday:
                            getFieldDecorator('birthday',{
                                initialValue:type=='edit'?moment(item.birthday):moment('1998-02-04')
                            })(
                                <DatePicker
                                    showTime
                                    format='YYYY-MM-DD HH:mm:ss' 
                                />
                            )
                        }
                    </FormItem>
                    <FormItem label="地址"  {...formItemLayout}>
                        {
                            type == 'detail'? item.address:
                            getFieldDecorator('address',{
                                initialValue:type=='edit'?item.address:''
                            })(
                                <TextArea autoSize={rowObject}/>
                            )
                        }
                    </FormItem>
                </Form>
            </div>
        )
    }
}

UserForm = Form.create()(UserForm)


class RoleForm extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const item = this.props.item;
        const roles = this.props.roles || [];
        const allRole = this.props.allRole || [];
        const allRoleOption = allRole.map((role)=>
            <Option value={role.id}>{role.name}</Option>
        )
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:18
            }
        }
        return(
            <div>
                <Form>
                    <FormItem label="用户名" {...formItemLayout}>
                        <Input value={item.username} disabled/>
                    </FormItem>
                    <FormItem label="性别" {...formItemLayout}>
                        <Select value={item.sex==1?'男':'女'} disabled/>
                    </FormItem>
                    <FormItem label="年龄" {...formItemLayout}>
                        <Input value={item.age} disabled />
                    </FormItem>
                    <FormItem label="地址" {...formItemLayout}>
                        <Input value={item.address} disabled />
                    </FormItem>
                    <FormItem label="角色" {...formItemLayout}>
                        {
                            getFieldDecorator('roles',{
                                initialValue:roles,
                                rules:[
                                    {
                                        required:true,
                                        message:"角色不能为空"
                                    }
                                ]
                            })(
                                <Select mode="multiple">
                                    {allRoleOption}
                                </Select>
                            )
                        }
                    </FormItem>
                </Form>
            </div>
        )
    }
}

RoleForm = Form.create()(RoleForm)
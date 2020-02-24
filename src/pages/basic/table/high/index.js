import React from 'react'
import { Card, Table, Button, Tag, message } from 'antd'
import axios from '../../../../axios'

export default class HighTable extends React.Component{

    state = {
        loading:false
    }

    componentWillMount(){
        this.requestList();
    }

    handleDelete = (item) => {
        message.success(`当前要删除的信息为:ID=${item.id},姓名=${item.username}`)
    }

    handleInfo = (item) => {
        message.success(`当前信息为:ID=${item.id},姓名=${item.username}`)
    }

    requestList = () => {
        this.setState({
            loading:true
        })
        axios.mock({
            url:'/table/list',
            params:{}
        }).then((res)=>{
            this.setState({
                dataSource: res.data,
                loading:false
            })
        }).catch((error)=>{
            this.setState({
                loading:false
            })
        })
    }

    render(){
        const { dataSource, loading } = this.state;
        const columns1 = [
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
                align:'center'
            },
            {
                title:'性别',
                dataIndex:'sex',
                key:'sex',
                align:'center',
                render(sex){
                    let array = ['未知','男','女'];
                    return array[sex];
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                key:'state',
                align:'center',
                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'hobby',
                key:'hobby',
                align:'center',
                render(hobby){
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return hobby.map((item)=>{
                        return config[item]
                    }).join('、');
                }
            },
            {
                title:'已婚',
                dataIndex:'isMarried',
                key:'isMarried',
                align:'center',
                render(isMarried){
                    if(isMarried){
                        return '是'
                    }
                    return '否'
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
                key:'birthday',
                align:'center'
            },
            {
                title:'早起时间',
                dataIndex:'time',
                key:'time',
                align:'center'
            },
            {
                title:'地址',
                dataIndex:'address',
                key:'address',
                align:'center'
            }
        ]
        const columns2 = [
            {
                title:'ID',
                dataIndex:'id',
                key:'id',
                align:'center',
                fixed:'left',
                width:80
            },
            {
                title:'用户名',
                dataIndex:'username',
                key:'username',
                align:'center',
                fixed:'left',
                width:100
            },
            {
                title:'性别',
                dataIndex:'sex',
                key:'sex',
                align:'center',
                width:80,
                render(sex){
                    let array = ['未知','男','女'];
                    return array[sex];
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                key:'state',
                align:'center',
                width:120,
                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'hobby',
                key:'hobby',
                align:'center',
                width:250,
                render(hobby){
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return hobby.map((item)=>{
                        return config[item]
                    }).join('、');
                }
            },
            {
                title:'已婚',
                dataIndex:'isMarried',
                key:'isMarried',
                align:'center',
                width:80,
                render(isMarried){
                    if(isMarried){
                        return '是'
                    }
                    return '否'
                }
            },
            {
                title:'已婚',
                dataIndex:'isMarried',
                key:'isMarried',
                align:'center',
                width:80,
                render(isMarried){
                    if(isMarried){
                        return '是'
                    }
                    return '否'
                }
            },
            {
                title:'已婚',
                dataIndex:'isMarried',
                key:'isMarried',
                align:'center',
                width:80,
                render(isMarried){
                    if(isMarried){
                        return '是'
                    }
                    return '否'
                }
            },
            {
                title:'已婚',
                dataIndex:'isMarried',
                key:'isMarried',
                align:'center',
                width:80,
                render(isMarried){
                    if(isMarried){
                        return '是'
                    }
                    return '否'
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
                key:'birthday',
                align:'center',
                width:120
            },
            {
                title:'早起时间',
                dataIndex:'time',
                key:'time',
                align:'center',
                width:100
            },
            {
                title:'地址',
                dataIndex:'address',
                key:'address',
                align:'center',
                width:150,
                fixed:'right'
            }
        ]
        const columns3 = [
            {
                title:'ID',
                dataIndex:'id',
                key:'id',
                align:'center',
                defaultSortOrder: 'ascend',
                sorter: (a, b) => a.id - b.id,
            },
            {
                title:'用户名',
                dataIndex:'username',
                key:'username',
                align:'center'
            },
            {
                title:'性别',
                dataIndex:'sex',
                key:'sex',
                align:'center',
                render(sex){
                    let array = ['未知','男','女'];
                    return array[sex];
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                key:'state',
                align:'center',
                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'hobby',
                key:'hobby',
                align:'center',
                render(hobby){
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return hobby.map((item)=>{
                        return config[item]
                    }).join('、');
                }
            },
            {
                title:'已婚',
                dataIndex:'isMarried',
                key:'isMarried',
                align:'center',
                filters:[
                    {
                        text:'已婚',
                        value:true
                    },
                    {
                        text:'未婚',
                        value:false
                    }
                ],
                // 过滤规则
                onFilter: (value, record) => record.isMarried === value,
                render(isMarried){
                    if(isMarried){
                        return '是'
                    }
                    return '否'
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
                key:'birthday',
                align:'center'
            },
            {
                title:'早起时间',
                dataIndex:'time',
                key:'time',
                align:'center'
            },
            {
                title:'地址',
                dataIndex:'address',
                key:'address',
                align:'center'
            }
        ]
        const columns4 = [
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
                render:(username, item) => { 
                    return <a onClick={()=>this.handleInfo(item)}>{username}</a>
                }
            },
            {
                title:'性别',
                dataIndex:'sex',
                key:'sex',
                align:'center',
                render(sex){
                    let array = ['未知','男','女'];
                    return array[sex];
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                key:'state',
                align:'center',
                render(state){
                    let config = {
                        '1':<Tag color="magenta">咸鱼一条</Tag>,
                        '2':<Tag color="red">风华浪子</Tag>,
                        '3':<Tag color="volcano">北大才子</Tag>,
                        '4':<Tag color="orange">百度FE</Tag>,
                        '5':<Tag color="gold">创业者</Tag>
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'hobby',
                key:'hobby',
                align:'center',
                render(hobby){
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return hobby.map((item)=>{
                        return config[item]
                    }).join('、');
                }
            },
            {
                title:'已婚',
                dataIndex:'isMarried',
                key:'isMarried',
                align:'center',
                render(isMarried){
                    if(isMarried){
                        return '是'
                    }
                    return '否'
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
                key:'birthday',
                align:'center'
            },
            {
                title:'早起时间',
                dataIndex:'time',
                key:'time',
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
                    return <Button onClick={()=> this.handleDelete(item)}>删除</Button>
                }
            }
        ]
        return(
            <div>
                <Card title="表头固定">
                    <Table
                        bordered
                        loading={loading}
                        dataSource={dataSource}
                        columns={columns1}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="侧边固定" style={{marginTop:10}}>
                    <Table
                        bordered
                        loading={loading}
                        dataSource={dataSource}
                        columns={columns2}
                        scroll={{x:1325}}
                    />
                </Card>
                <Card title="筛选和排序" style={{marginTop:10}}>
                    <Table
                        bordered
                        loading={loading}
                        dataSource={dataSource}
                        columns={columns3}
                    />
                </Card>
                <Card title="特殊操作" style={{marginTop:10}}>
                    <Table
                        bordered
                        loading={loading}
                        dataSource={dataSource}
                        columns={columns4}
                    />
                </Card>
            </div>
        )
    }
}
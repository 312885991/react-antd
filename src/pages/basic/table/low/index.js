import React from 'react'
import axios from '../../../../axios'
import { Card, Table, message } from 'antd'

export default class LowTable extends React.Component{

    state = {
        loading:false,
        dataSource:[]
    }

    componentWillMount(){
        this.requestList();
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
                loading: false
            })
        }).catch((error)=>{
            this.setState({
                loading:false
            })
        })
    }

    handleChange = (record, index) => {
        this.setState({
            selectedRadioRowKeys: [index]
        })
        message.success(`当前选中的ID为${record.id}，用户名为${record.username}`)
    }

    render(){
        const dataSource = [
            {
                "id":1,
                "username":"刘路生",
                "sex":1,
                "state":1,
                "hobby":[1,5],
                "isMarried":false,
                "birthday":"1998-02-04",
                "address":"江西省吉安市遂川县",
                "time":"8:00"
            },
            {
                "id":2,
                "username":"袁群昇",
                "sex":1,
                "state":2,
                "hobby":[2,3],
                "isMarried":true,
                "birthday":"1998-02-04",
                "address":"江西省赣州市信丰县",
                "time":"8:00"
            },
            {
                "id":3,
                "username":"肖志涛",
                "sex":1,
                "state":3,
                "hobby":[1,2,6],
                "isMarried":false,
                "birthday":"1998-02-04",
                "address":"江西省抚州市",
                "time":"9:00"
            },
            {
                "id":4,
                "username":"何兴民",
                "sex":1,
                "state":4,
                "hobby":[5,6],
                "isMarried":true,
                "birthday":"1998-02-04",
                "address":"江西省南昌市",
                "time":"10:00"
            }
        ];
        const colums = [
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
        // 单选框
        const selectedRadioRowKeys = this.state.selectedRadioRowKeys;
        const rowRadioSelection = {
            type:'radio',
            selectedRowKeys:selectedRadioRowKeys
        }
        // 复选框
        const selectedCheckRowKeys = this.state.selectedCheckRowKeys;
        const rowCheckSelecttion = {
            type:'checkbox',
            selectedRowKeys:selectedCheckRowKeys,
            onChange:(selectedRowKeys, selectedRows)=>{
                this.setState({
                    selectedCheckRowKeys: selectedRowKeys
                })
            }
        }
        return(
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        loading={false}
                        dataSource={dataSource} 
                        columns={colums}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock数据表格" style={{marginTop:10}}>
                    <Table
                        bordered
                        loading={this.state.loading}
                        dataSource={this.state.dataSource} 
                        columns={colums}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock数据表格-单选" style={{marginTop:10}}>
                    <Table
                        bordered
                        loading={this.state.loading}
                        dataSource={this.state.dataSource}
                        rowSelection={rowRadioSelection}
                        onRow = {(record, index)=>{
                            return{
                                onClick:()=>{
                                    this.handleChange(record, index)
                                }
                            }
                        }}
                        columns={colums}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock数据表格-多选" style={{marginTop:10}}>
                    <Table
                        bordered
                        loading={this.state.loading}
                        dataSource={this.state.dataSource} 
                        columns={colums}
                        rowSelection={rowCheckSelecttion}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}
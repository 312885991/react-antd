import React from 'react';
import { Card, Button, Form, Select, Input, Modal, message, Table, DatePicker, Badge } from 'antd';
import axios from '../../../axios'
import moment from 'moment'
import Utils from '../../../utils/utils'
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class Order extends React.Component{

    state = {
        dataSource:[],
        showInfo: false
    }

    componentWillMount(){
        this.requestList();
    }

    requestList = () => {
        axios.mock({
            url:'/orders'
        }).then((res)=>{
            this.setState({
                dataSource: res.data
            })
        }).catch(()=>{
            message.error("获取表格数据失败")
        })
    }

    handleChange = (record, index) => {
        this.setState({
            selectedRowKeys:[index],
            item: record
        })
    }

    handleOrderInfo = () => {
        if(!this.state.item){
            message.error("请先选择一条记录")
            return
        }
        this.setState({
            showInfo:true
        })
    }

    render(){
        const { dataSource, selectedRowKeys, item, showInfo } = this.state;
        const columns = [
            {
                title:'用户名',
                dataIndex:'username',
                key:'username',
                align:'center'
            },
            {
                title:'订单编号',
                dataIndex:'orderId',
                key:'orderId',
                align:'center'
            },
            {
                title:'手机号',
                dataIndex:'phone',
                key:'phone',
                align:'center'
            },{
                title:'里程数(KM)',
                dataIndex:'distance',
                key:'distance',
                align:'center',
                render(distance){
                    return distance/1000;
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                key:'state',
                align:'center',
                render(state){
                    let config = {
                        '1':<Badge status="default" text="未开始"/>,
                        '2':<Badge status="success" text="进行中"></Badge>,
                        '3':<Badge status="error" text="已结束"></Badge>
                    };
                    return config[state];
                }
            },
            {
                title:'开始时间',
                dataIndex:'beginTime',
                key:'beginTime',
                align:'center'
            },
            {
                title:'结束时间',
                dataIndex:'endTime',
                key:'endTime',
                align:'center'
            },
            {
                title:'订单金额',
                dataIndex:'pay',
                key:'pay',
                align:'center',
                render(pay){
                    return '￥'+pay;
                }
            }
        ]
        const rowSelection = {
            type:"radio",
            selectedRowKeys,
            onChange:(selectedRowKeys, selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    item: selectedRows[0]
                })
            }
        }
        return(
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.handleOrderInfo} style={{marginBottom:15}}>订单详情</Button>
                    <Table 
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
                    visible={showInfo}
                    title="订单详情"
                    onCancel={()=>{
                        this.setState({
                            showInfo:false
                        })
                    }}
                    onOk={()=>{
                        this.setState({
                            showInfo:false
                        })
                    }}
                    okText="确定"
                    cancelText="返回"
                >
                    {<InfoForm item={item}/>}
                </Modal>
            </div>
        )
    }
}


class FilterForm extends React.Component{


    handleSubmit = () => {
        let citys = ['全部','北京','上海','天津'];
        let states = ['全部','未开始','进行中','已结束'];
        const value = this.props.form.getFieldsValue();
        let beginTime = Utils.formatDate(moment(value.betweenTime[0], 'YYYY-MM-DD HH:mm:ss').valueOf());
        let endTime = Utils.formatDate(moment(value.betweenTime[1], 'YYYY-MM-DD HH:mm:ss').valueOf());
        message.success(`当前提交的内容为：${citys[value.city]} | ${beginTime} | ${endTime} | ${states[value.state]}`)
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form layout="inline">
                    <FormItem label="城市">
                        {
                            getFieldDecorator('city',{
                                initialValue: 0
                            })(
                                <Select style={{width:80}}>
                                    <Option value={0}>全部</Option>
                                    <Option value={1}>北京</Option>
                                    <Option value={2}>上海</Option>
                                    <Option value={3}>天津</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="日期">
                        {
                            getFieldDecorator('betweenTime',{
                                initialValue:[moment('2020-01-21'), moment('2020-02-21')]
                            })(
                                <RangePicker 
                                    showTime
                                    format="YYYY:MM:DD HH:mm:ss"
                                 />
                            )
                        }
                    </FormItem>
                    <FormItem label="订单状态">
                        {
                            getFieldDecorator('state',{
                                initialValue:0
                            })(
                                <Select style={{ width: 120 }}>
                                    <Option value={0}>全部</Option>
                                    <Option value={1}>未开始</Option>
                                    <Option value={2}>进行中</Option>
                                    <Option value={3}>已结束</Option>
                                </Select>  
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleSubmit}>查询</Button>
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


class InfoForm extends React.Component{
    
    render(){
        const { item } = this.props;
        const formItemLayout ={
            labelCol:{
                xs:24,
                sm:8
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const config = {
            '1':'未开始',
            '2':'进行中',
            '3':'已结束'
        };
        return(
            <div>
                <Form layout="horizontal">
                    <FormItem label="用户名" {...formItemLayout}>
                        <Input value={item.username} disabled/>
                    </FormItem>
                    <FormItem label="订单编号" {...formItemLayout}>
                        <Input value={item.orderId} disabled/>
                    </FormItem>
                    <FormItem label="手机号(+86)" {...formItemLayout}>
                        <Input value={item.phone} disabled/>
                    </FormItem>
                    <FormItem label="里程数(KM)" {...formItemLayout}>
                        <Input value={item.distance/1000} disabled/>
                    </FormItem>
                    <FormItem label="状态" {...formItemLayout}>
                        <Select value={config[item.state]} disabled />
                    </FormItem>
                    <FormItem label="订单金额(RMB)" {...formItemLayout}>
                        <Input value={'￥'+item.pay} disabled/>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Order
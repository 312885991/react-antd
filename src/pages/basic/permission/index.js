import React from 'react'
import { Card, Modal, Button, Form, Tree, Table, message, Input, Select, InputNumber, Spin } from 'antd';
import axios from '../../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
export default class Permission extends React.Component {

    state = {
        loading: false,
        createModal: false,
        distributeModal: false
    }

    componentWillMount() {
        this.requestList();
    }

    // 查询表格数据
    requestList = () => {
        this.setState({
            loading: true
        })
        axios.mock({
            url: 'role/list'
        }).then((res) => {
            this.setState({
                dataSource: res.data,
                loading: false
            })
        }).catch(() => {
            message.error("获取数据失败");
            this.setState({
                loading: false
            })
        })
    }

    // 点击行触发
    handleChange = (record, index) => {
        this.setState({
            selectedRowKeys: [index],
            item: record
        })
    }

    // 创建角色
    handleCreateRole = () => {
        this.setState({
            createModal: true
        })
    }

    // 提交创建角色信息
    handleSumitCreateRole = () => {
        this.createForm.props.form.validateFields((err, values) => {
            if (!err) {
                // 模拟提交数据
                console.log(values);
                message.success("提交成功")
                this.setState({
                    createModal: false
                })
                this.createForm.props.form.resetFields();
            }
        })
    }

    // 渲染菜单树
    renderTreeNode = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.name} key={item.id}>
                        {this.renderTreeNode(item.children)}
                    </TreeNode>
                )
            }
            return <TreeNode title={item.name} key={item.id} />
        })
    }

    // 分配权限
    handleDistribute = () => {
        const item = this.state.item;
        if (!item) {
            message.error("请先选择一条记录");
            return;
        }
        this.requestMenuTree();
        this.requestMenuByRoleId(item.id);
        this.setState({
            distributeModal: true
        })
    }

    // 查询所有的菜单树
    requestMenuTree = () => {
        axios.mock({
            url: '/menu/tree'
        }).then((res) => {
            const menuTree = this.renderTreeNode(res.data);
            this.setState({
                menuTree
            })
        }).catch(() => {
            message.error("获取全部菜单失败")
        })
    }

    // 根据角色ID查询对应的所有菜单ID
    requestMenuByRoleId = (id) => {
        axios.mock({
            url: '/getMenuByRoleId?id=' + id
        }).then((res) => {
            this.setState({
                menuList: res.data
            })
        }).catch(() => {
            message.error("获取角色下的菜单失败")
        })
    }

    // 提交分配权限信息
    handleSubmitDistribute = () => {
        // 得到的menuList是字符串数组
        const menuList = this.state.menuList;
        // const item = this.state.item;
        if (menuList.size == 0) {
            message.error("菜单不能为空")
            return;
        }
        // 转换成Int类型数组
        const list = menuList.map((item) => {
            return parseInt(item);
        })
        console.log(list);
        // 模拟提交数据，更改角色菜单权限
        // axios.post({
        //     url:'/role/editMenu?roleId='+item.id,
        //     data:list
        // })
        message.success("提交成功")
        this.setState({
            distributeModal: false
        })
    }

    // 点击Tree复选框时触发
    handleOnCheck = (checkedKeys) => {
        this.setState({
            menuList: checkedKeys
        })
    }

    // 点击树节点时触发
    handleOnSelect = (checkedKeys) => {
        this.setState({
            menuList: checkedKeys
        })
    }

    // 删除表格数据
    handleDelete = (item) => {
        message.success(`当前删除的信息为：${item.name}`)
    }

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                align: 'center'
            },
            {
                title: '角色名',
                dataIndex: 'name',
                align: 'center',
                render(name) {
                    return <a>{name}</a>
                }
            },
            {
                title: '性别',
                dataIndex: 'sex',
                align: 'center',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                align: 'center'
            },
            {
                title: '工资',
                dataIndex: 'wages',
                align: 'center',
                render(wages) {
                    return '￥' + wages
                }
            },
            {
                title: '注册日期',
                dataIndex: 'register',
                align: 'center'
            },
            {
                title: '操作',
                align: 'center',
                render: (item) => {
                    return <a onClick={() => this.handleDelete(item)}>删除</a>
                }
            }
        ]
        const { loading, selectedRowKeys, dataSource, createModal, distributeModal, menuTree, menuList } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    item: selectedRows[0]
                })
            }
        }
        return (
            <div>
                <Card className="card-wrap">
                    <Button type="primary" icon="plus" style={{ marginBottom: 15 }} onClick={this.handleCreateRole}>新建角色</Button>
                    <Button type="primary" icon="tool" style={{ marginBottom: 15 }} onClick={this.handleDistribute}>分配权限</Button>
                    <Table
                        bordered
                        loading={loading}
                        dataSource={dataSource}
                        columns={columns}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.handleChange(record, index)
                                }
                            }
                        }}
                    />
                </Card>
                <Modal
                    visible={createModal}
                    title="新建角色"
                    okText="提交"
                    cancelText="返回"
                    onOk={() => {
                        this.handleSumitCreateRole()
                    }}
                    onCancel={() => {
                        this.setState({
                            createModal: false
                        })
                    }}
                >
                    {<CreateForm wrappedComponentRef={(inst) => this.createForm = inst} />}
                </Modal>
                <Modal
                    visible={distributeModal}
                    title="分配权限"
                    okText="提交"
                    cancelText="返回"
                    onOk={() => {
                        this.handleSubmitDistribute()
                    }}
                    onCancel={() => {
                        this.setState({
                            distributeModal: false
                        })
                    }}
                >
                    <Tree
                        checkable={true}
                        // checkStrictly={true}
                        checkedKeys={menuList}
                        defaultExpandAll={true}
                        onCheck={this.handleOnCheck}
                        onSelect={this.handleOnSelect}
                    >
                        {menuTree}
                    </Tree>
                </Modal>
            </div>
        )
    }
}

class CreateForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 8
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        return (
            <div>
                <Form>
                    <FormItem label="角色名" {...formItemLayout}>
                        {
                            getFieldDecorator('roleName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '角色名不能为空'
                                    }
                                ]
                            })(
                                <Input placeholder="请输入角色名" />
                            )
                        }
                    </FormItem>
                    <FormItem label="性别" {...formItemLayout}>
                        {
                            getFieldDecorator('sex', {
                                initialValue: 1,
                                rules: [
                                    {
                                        required: true,
                                        message: '性别不能为空'
                                    }
                                ]
                            })(
                                <Select>
                                    <Option value={1}>男</Option>
                                    <Option value={2}>女</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="年龄" {...formItemLayout}>
                        {
                            getFieldDecorator('age', {
                                initialValue: 20,
                                rules: [
                                    {
                                        required: true,
                                        message: '年龄不能为空'
                                    }
                                ]
                            })(
                                <InputNumber />
                            )
                        }
                    </FormItem>
                    <FormItem label="工资" {...formItemLayout}>
                        {
                            getFieldDecorator('wages', {
                                rules: [
                                    {
                                        required: true,
                                        message: '工资不能为空'
                                    }
                                ]
                            })(
                                <Input placeholder="请输入您的工资" />
                            )
                        }
                    </FormItem>
                </Form>
            </div>
        )
    }
}

CreateForm = Form.create()(CreateForm)
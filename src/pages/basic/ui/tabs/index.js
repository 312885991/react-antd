import React from 'react';
import { Card, Tabs, message, Icon, Radio } from 'antd';
const { TabPane } = Tabs;
export default class Tab extends React.Component {

    state = {
        size: 'default'
    }

    callback = (key) => {
        message.info(`当前选中的页签是第${key}页签`);
    }
    
    handleChange = (e) => {
        this.setState({
            size: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Card title="基础Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">
                            欢迎来到React的天地！
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            欢迎来到React的天地！
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            欢迎来到React的天地！
                         </TabPane>
                    </Tabs>
                </Card>
                <Card title="禁用Tab页签" className="card-wrap" style={{marginTop:10}}>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">
                            欢迎来到React的天地！
                        </TabPane>
                        <TabPane disabled tab="Tab 2" key="2">
                            欢迎来到React的天地！
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            欢迎来到React的天地！
                         </TabPane>
                    </Tabs>
                </Card>
                <Card title="控制Tab页签大小" className="card-wrap" style={{marginTop:10}}>
                    <Radio.Group onChange={this.handleChange} style={{marginBottom:15}} defaultValue="default">
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                    <Tabs defaultActiveKey="1" onChange={this.callback} size={this.state.size}>
                        <TabPane tab='Tab1' key="1">
                            欢迎来到React的天地！
                        </TabPane>
                        <TabPane tab='Tab2' key="2">
                            欢迎来到React的天地！
                        </TabPane>
                        <TabPane tab='Tab3' key="3">
                            欢迎来到React的天地！
                         </TabPane>
                         <TabPane tab='Tab4' key="4">
                            欢迎来到React的天地！
                         </TabPane>
                    </Tabs>
                </Card>
                <Card title="带图标Tab页签" className="card-wrap" style={{marginTop:10}}>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab={<span><Icon type="plus"/>Tab1</span>} key="1">
                            欢迎来到React的天地！
                        </TabPane>
                        <TabPane tab={<span><Icon type="edit"/>Tab2</span>} key="2">
                            欢迎来到React的天地！
                        </TabPane>
                        <TabPane tab={<span><Icon type="delete"/>Tab3</span>} key="3">
                            欢迎来到React的天地！
                         </TabPane>
                         <TabPane tab={<span><Icon type="android"/>Tab4</span>} key="4">
                            欢迎来到React的天地！
                         </TabPane>
                    </Tabs>
                </Card>
            </div>
        )
    }
}
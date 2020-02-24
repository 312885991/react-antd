import React from 'react'
import { Card, Spin, Icon, Alert } from 'antd'
export default class Loading extends React.Component {

    state = {}

    render() {
        const AntIcom = <Icon type="loading" style={{ fontSize: 24 }}/>;
        return (
            <div>
                <Card title="Spin基础用法" className="card-wrap">
                    <Spin size="small" style={{ marginRight: 20 }} />
                    <Spin style={{ marginRight: 20 }} />
                    <Spin size="large" style={{ marginRight: 20 }} />
                    <Spin indicator={<Icon type="loading" style={{ marginRight: 20 }} />} />
                    <Spin indicator={<Icon type="loading" style={{ marginRight: 20, fontSize: 30 }} />} />
                    <Spin indicator={<Icon type="sync" spin style={{ marginRight: 20, fontSize: 30 }} />} />
                    <Spin indicator={<Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" spin style={{ marginRight: 20, fontSize: 30 }} />} />
                    <Spin indicator={<Icon type="slack" spin style={{ fontSize: 30 }} />} />
                </Card>
                <Card title="内容遮罩" className="card-wrap" style={{ marginTop: 10 }}>
                    <Spin spinning={false}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="success"
                        />
                    </Spin>
                    <Spin>
                        <Alert
                            style={{marginTop:20}}
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="success"
                            
                        />
                    </Spin>
                    <Spin tip="加载中">
                        <Alert
                            style={{marginTop:20}}
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                            
                        />
                    </Spin>
                    <Spin indicator={AntIcom}>
                        <Alert
                            style={{marginTop:20}}
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="error"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}
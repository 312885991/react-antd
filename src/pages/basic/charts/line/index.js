import React from 'react';
import { Card, Spin } from 'antd';
import axios from '../../../../axios'
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
    Guide,
} from "bizcharts";

export default class Pie extends React.Component {

    state = {
        showSpin: false,
        showSpin2: false
    }

    componentWillMount() {
        this.requestSingleList();
        this.requestCategoryList();
    }

    requestSingleList = () => {
        this.setState({
            showSpin1: true
        })
        axios.mock({
            url: '/charts/line/single'
        }).then((res) => {
            this.setState({
                showSpin1: false,
                data1: res.data
            })
        }).catch(() => {
            this.setState({
                showSpin1: false
            })
        })
    }

    requestCategoryList = () => {
        this.setState({
            showSpin2: true
        })
        axios.mock({
            url: '/charts/line/category'
        }).then((res) => {
            this.setState({
                showSpin2: false,
                data2: res.data
            })
        }).catch(() => {
            this.setState({
                showSpin2: false
            })
        })
    }

    render() {
        const { showSpin1, data1, showSpin2, data2 } = this.state;
        const cols1 = {
            sales: {
                alias: "销售额",
                min: 0
            },
            year: {
                alias: "年份",
                range: [0, 1]
            }
        };
        const cols2 = {
            sales:{
                alias:"销售额"
            },
            day: {
                range: [0, 1],
            },
        };
        return (
            <div>
                <Card title="折线图之一">
                    <Spin spinning={showSpin1}>
                        <Chart height={400} data={data1} forceFit scale={cols1}>
                            <Axis name="sales"
                                label={{
                                    formatter: val => `${val}（万元）`,
                                }}
                            />
                            <Axis name="year"
                                label={{
                                    formatter: val => `${val}年`,
                                }}
                            />
                            <Guide>年销售额增长图</Guide>
                            <Tooltip
                                crosshairs={{
                                    type: "y"
                                }}
                            />
                            <Geom type="line" position="year*sales" size={2} scale={cols2} />
                            <Geom
                                type="point"
                                position="year*sales"
                                size={4}
                                shape={"circle"}
                                style={{
                                    stroke: "#fff",
                                    lineWidth: 1
                                }}
                            />
                        </Chart>
                    </Spin>
                </Card>
                <Card title="折线图之二" style={{ marginTop: 10 }}>
                    <Spin spinning={showSpin2}>
                        <Chart height={400} data={data2} forceFit scale={cols2}>
                            <Legend />
                            <Axis name="day" />
                            <Axis
                                name="sales"
                                label={{
                                    formatter: val => `${val}亿`,
                                }}
                            />
                            <Guide>骑行订单量</Guide>
                            <Tooltip
                                crosshairs={{
                                    type: 'y',
                                }}
                            />
                            <Geom type="line" position="day*sales" size={2} color={'name'} />
                            <Geom
                                type="point"
                                position="day*sales"
                                size={4}
                                shape={'circle'}
                                color={'name'}
                                style={{
                                    stroke: '#fff',
                                    lineWidth: 1,
                                }}
                            />
                        </Chart>
                    </Spin>
                </Card>
                <Card title="折线图之三" style={{ marginTop: 10 }}>
                    <Spin spinning={showSpin1}>
                        <Chart height={400} data={data1} forceFit scale={cols1}>
                            <Axis name="year" title/>
                            <Axis
                                title
                                name="sales"
                                label={{
                                    formatter: val => {
                                        return (val / 10).toFixed(1) + "k";
                                    }
                                }}
                            />
                            <Tooltip
                                crosshairs={{
                                    type: "line"
                                }}
                            />
                            <Geom type="area" position="year*sales" />
                            <Geom type="line" position="year*sales" size={2} />
                        </Chart>
                    </Spin>
                </Card>
            </div>
        )
    }
}
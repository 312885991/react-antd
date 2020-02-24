import React from 'react';
import { Card, Spin } from 'antd';
import axios from '../../../../axios'
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    Guide
} from "bizcharts";
import DataSet from "@antv/data-set";

export default class Pie extends React.Component {

    state = {
        showSpin: false
    }

    componentWillMount() {
        this.requestList();
    }

    requestList = () => {
        const { DataView } = DataSet;
        this.setState({
            showSpin: true
        })
        axios.mock({
            url: '/charts/pie'
        })
            .then((res) => {
                let dv = new DataView();
                // console.log(res.data)
                const data = res.data;
                dv.source(data).transform({
                    type: "percent",
                    field: "GDP",
                    dimension: "city",
                    as: "percent"
                });
                this.setState({
                    showSpin: false,
                    dv,
                    data
                })
            })
            .catch((error) => {
                this.setState({
                    showSpin: false
                })
            })
    }

    render() {
        const { dv, showSpin, data } = this.state;
        const cols = {
            percent: {
                formatter: val => {
                    val = (val * 100).toFixed(2) + "%";
                    return val;
                }
            }
        }
        return (
            <div>
                <Card title="基础饼图">
                    <Spin spinning={showSpin}>
                        <Chart height={400} data={dv} forceFit scale={cols}>
                            <Coord type="theta" radius={0.9} />
                            <Axis name="percent" title />
                            <Legend
                                position="right"
                                offsetY={-150}
                                offsetX={-80}
                            />
                            <Tooltip
                                showTitle={false}
                                itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                            />
                            <Guide>江西省各市GDP占比图</Guide>
                            <Geom
                                type="intervalStack"
                                position="percent"
                                color="city"
                                tooltip={[
                                    "city*percent",
                                    (city, percent) => {
                                        percent = percent * 100 + "%";
                                        return {
                                            name: city,
                                            value: percent
                                        };
                                    }
                                ]}
                                style={{
                                    lineWidth: 1,
                                    stroke: "#fff"
                                }}
                            >
                                <Label
                                    content="percent"
                                    formatter={(val, item) => {
                                        return item.point.city + ": " + val;
                                    }}
                                />
                            </Geom>
                        </Chart>
                    </Spin>
                </Card>
                <Card title="环形饼图" style={{ marginTop: 10 }}>
                    <Spin spinning={showSpin}>
                        <Chart height={400} data={dv} forceFit scale={cols}>
                            <Coord type="theta" radius={0.9} innerRadius={0.6} />
                            <Axis name="percent" title />
                            <Legend
                                position="right"
                                offsetY={-150}
                                offsetX={-80}
                            />
                            <Tooltip
                                showTitle={false}
                                itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                            />
                            <Guide>江西省各市GDP占比图</Guide>
                            <Geom
                                type="intervalStack"
                                position="percent"
                                color="city"
                                tooltip={[
                                    "city*percent",
                                    (city, percent) => {
                                        percent = percent * 100 + "%";
                                        return {
                                            name: city,
                                            value: percent
                                        };
                                    }
                                ]}
                                style={{
                                    lineWidth: 1,
                                    stroke: "#fff"
                                }}
                            >
                                <Label
                                    content="percent"
                                    formatter={(val, item) => {
                                        return item.point.city + ": " + val;
                                    }}
                                />
                            </Geom>
                        </Chart>
                    </Spin>
                </Card>
                <Card title="南丁格尔玫瑰图" style={{ marginTop: 10 }}>
                    <Spin spinning={showSpin}>
                        <Chart height={400} data={data} forceFit>
                            <Coord type="polar" radius={0.99} />
                            <Legend
                                position="right"
                                offsetY={-150}
                                offsetX={-80}
                            />
                            <Guide>江西省各市GDP占比图</Guide>
                            <Geom
                                type="interval"
                                position="city*GDP"
                                color="city"
                                style={{
                                    lineWidth: 1,
                                    stroke: "#fff"
                                }}
                            >
                                <Label
                                    content={["city*GDP", (city, GDP) => {
                                        return `${city}:${GDP}`;
                                    }]}
                                />
                            </Geom>
                        </Chart>
                    </Spin>
                </Card>
            </div>
        )
    }
}
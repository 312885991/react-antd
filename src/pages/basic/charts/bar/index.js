import React from 'react';
import { Card, Spin } from 'antd';
import axios from '../../../../axios'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Label,
  Legend,
  Guide
} from "bizcharts";
import DataSet from "@antv/data-set";

export default class Bar extends React.Component {

  state = {
    singleSpin: false,
    categroySpin: false
  }

  componentWillMount(){
    this.requestSingleList();
    this.requestCategoryList();
  }

  // 请求单组图表数据
  requestSingleList = () => {
    this.setState({
      singleSpin:true
    })
    axios.mock({
      url:'/charts/bar/single'
    }).then((res)=>{
      this.setState({
        data: res.data,
        singleSpin:false
      })
    }).catch((error)=>{
      this.setState({
        singleSpin:false
      })
    })
  }

  // 请求分组图表数据
  requestCategoryList = () => {
    this.setState({
      categroySpin:true
    })
    axios.mock({
      url:'/charts/bar/category'
    }).then((res)=>{
      let ds = new DataSet();
      let dv = ds.createView().source(res.data);
      dv.transform({
        type: "fold",
        fields: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        key: "日期",
        value: "订单数"
      });
      this.setState({
        categroySpin:false,
        dv
      })
    }).catch((error)=>{
      this.setState({
        categroySpin:false
      })
    })
  }

  render() {
    const { data, dv, singleSpin, categroySpin } = this.state;
    const scale = {
      province:{
        alias:'省份'
      },
      sales:{
        alias:'销售额'
      }
    }
    return (
      <div>
        <Card title="柱形图表之一">
          <Spin spinning={singleSpin}>
            <Chart height={400} data={data} forceFit scale={scale}> 
              <Axis name="province" title/>
              <Axis name="sales" title/>
              <Tooltip
                crosshairs={{
                  type: "y"
                }}
              />
              <Guide>销售订单量</Guide>
              <Geom type="interval" position="province*sales">
                <Label 
                  content={["province*sales", (province, sales)=>{
                    return `${sales}`;
                  }]}
                />
              </Geom>
            </Chart>
          </Spin>
        </Card>
        <Card title="柱形图表之二" style={{ marginTop: 10 }}>
          <Spin spinning={categroySpin}>
            <Chart height={400} data={dv} forceFit>
              <Axis name="日期" title/>
              <Axis name="订单数" title/>
              <Legend />
              <Tooltip
                crosshairs={{
                  type: "y"
                }}
              />
              <Guide>骑行订单量</Guide>
              <Geom
                type="interval"
                position="日期*订单数"
                color={"name"}
                adjust={[
                  {
                    type: "dodge",
                    marginRatio: 1 / 32
                  }
                ]}
              />
            </Chart>
          </Spin>
        </Card>
      </div>
    )
  }
}
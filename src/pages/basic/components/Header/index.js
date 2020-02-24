import React from 'react';
import { Row, Col, message, Modal } from 'antd'
import Utils from '../../../../utils/utils'
import axios from '../../../../axios'
import { connect } from 'react-redux';
import './index.less'
class Header extends React.Component{

    state = {
        userName:'别回头丶'
    }

    componentWillMount(){
        let that = this;
        // 时钟
        setInterval(function(){
            let sysTime = Utils.formatSysTime(new Date().getTime());
            that.setState({
                sysTime
            })
        }, 1000)
        // 获取IP
        this.getIp();
        // 1S后根据得到的IP获取所在城市
        setTimeout(function(){
            that.getCity();
            // 1S后根据得到的所在城市获取天气
            setTimeout(function(){
                that.getWeatherAPIData();
            },1000)
        },1000)
    }
    
    // 获取IP地址
    getIp = () => {
        axios.get({
            url:'/account/getIp'
        }).then((res)=>{
            // message.info(`${res.ip}`)
            let ip = res.ip;
            this.setState({
                ip
            })
        }).catch((error)=>{
            message.error("获取城市地址失败，使用默认地址遂川")
        })
    }

    // 通过IP地址获取所在城市
    getCity = () =>{
        if(this.state.ip){
            let ip =this.state.ip;
            axios.jsonp({
                url:'http://api.map.baidu.com/location/ip?ak=suRn5UGusu479hMzpusgmfvAGFsp55Io&ip='+ ip +'&coor=bd09ll'
            }).then((res)=>{
                let city = res.content.address_detail.city;
                message.info(`当前定位城市：${city}`)
                this.setState({
                    city
                })
            }).catch(()=>{
                message.error("获取城市地址失败，使用默认地址遂川")
            })
        }
    }

    // 根据城市名获取天气
    getWeatherAPIData = () =>{
        // 默认地址
        let city = "遂川";
        if(this.state.city){
            if(this.state.city != ""){
                city = this.state.city;
            }
        }
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+ encodeURIComponent(city) +'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            // console.log(res);
            let data = res.results[0].weather_data[0];
            let currentCity = res.results[0].currentCity;
            this.setState({
                dayPictureUrl:data.dayPictureUrl,
                weather:data.weather,
                currentCity
            })
        })
    }

    // 处理退出
    handleOut = () => {
        Modal.confirm({
            title:'提醒',
            content:'您确定要退出么？',
            onOk(){
                window.location.href='/basic/home'
            },
            okText:"确定",
            cancelText:"取消"
        })
    }

    render(){
        const { userName, sysTime, currentCity, dayPictureUrl, weather } = this.state;
        return(
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        欢迎，<span>{userName}</span><a href="#" onClick={this.handleOut}>退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="3" className="breadcrumb-title">
                        <span>{this.props.menuName}</span>
                    </Col>
                    <Col span="21" className="weather">
                        <span className="date">{sysTime}</span>
                        <span className="weather-city">{currentCity}</span>
                        <span className="weather-img"><img src={dayPictureUrl}/></span>
                        <span className="weather-detail">{weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menuName: state.menuName
    }
}

export default connect(mapStateToProps)(Header);

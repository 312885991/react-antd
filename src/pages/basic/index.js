import React from 'react';
import { Row, Col } from 'antd';
import NavLeft from './components/Navleft'
import Footer from './components/Footer'
import Header from './components/Header'
import './index.less'
import '../../commom.less'

export default class Basic extends React.Component{
    render(){
        return(
            <Row className="container">
                <Col className="nav-left" xs={0} sm={0} md={3} lg={4} xl={4}>
                    <NavLeft />
                </Col>
                <Col className="main" xs={24} sm={24} md={21} lg={20} xl={20}>
                    <Header />
                    <Row className="content">
                        {this.props.children}
                    </Row>
                    <Footer />
                </Col>
            </Row>
        )
    }
}
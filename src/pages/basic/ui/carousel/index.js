import React from 'react';
import { Card, Carousel } from 'antd';
import './index.less'

export default class Carousels extends React.Component{
    render(){
        return(
            <div>
                <Card title="文字背景轮播" className="card-wrap">
                    <Carousel autoplay>
                        <div><h3>React</h3></div>
                        <div><h3>Vue</h3></div>
                        <div><h3>Angularjs</h3></div>
                        <div><h3>Webpack</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="slider-wrap" style={{marginTop:10}}>
                    <Carousel autoplay effect="fade" >
                        <div><img src="http://image.quicklyweb.cn/2019-10-02_1569997963524.jpg"/></div>
                        <div><img src="http://image.quicklyweb.cn/2019-10-08_1570524386506.png"/></div>
                        <div><img src="http://image.quicklyweb.cn/2019-10-08_1570524401382.png"/></div>
                        <div><img src="http://image.quicklyweb.cn/2019-10-08_1570524415072.png"/></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
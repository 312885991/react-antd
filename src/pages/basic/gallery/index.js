import React from 'react';
import { Card, Modal, Row, Col } from 'antd';
const { Meta } = Card;

export default class Gallery extends React.Component{

    state = {
        showModal:false
    }

    handlePreview = (imgUrl) => {
        this.setState({
            showModal: true,
            imageUrl: imgUrl
        })
    }

    render(){
        const images = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png'],
        ]
        const imgList = images.map((list)=>list.map((item)=>
            {
                let imgUrl = "http://upload.quicklyweb.cn/gallery/"+item;
                return <Card
                    hoverable
                    style={{marginBottom:5}}
                    cover={<img src={imgUrl}  onClick={()=>this.handlePreview(imgUrl)}/>}
                >
                    <Meta title="欢迎走进画廊世界" description="2020-02-21" style={{textAlign:'center'}}/>
                </Card>
            }))
        return(
            <div>
                <Row>
                    <Col span={5}>
                        {imgList[0]}
                    </Col>
                    <Col span={5}>
                        {imgList[1]}
                    </Col>
                    <Col span={5}>
                        {imgList[2]}
                    </Col>
                    <Col span={5}>
                        {imgList[3]}
                    </Col>
                    <Col span={4}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Modal
                    title="图片画廊"
                    visible={this.state.showModal}
                    onCancel={()=>[
                        this.setState({
                            showModal:false
                        })
                    ]}
                    footer={null}
                >
                    {<img src={this.state.imageUrl} style={{width:'100%',height:500}}/>}
                </Modal>
            </div>
        )
    }
}
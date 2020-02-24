import React from 'react';
import { Card, Button, Modal } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class Rich extends React.Component{

    state = {
        showRichText: false,
        editorState: '',
        contentState: ''
    }

    handleEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    handleContentStateChange = (contentState) => {
        this.setState({
            contentState
        })
    }

    handleClearContent = () => {
        this.setState({
            editorState:''
        })
    }

    handleGetHtmlConetnt = () => {
        this.setState({
            showRichText: true
        })
    }

    render(){
        const { editorState, showRichText, contentState } = this.state;
        return(
            <div>
                <Card title="操作区" className="card-wrap">
                    <Button type="primary" onClick={this.handleClearContent}>清空文本</Button>
                    <Button type="primary" onClick={this.handleGetHtmlConetnt}>获取HTML内容</Button>
                </Card>
                <Card title="富文本">
                    <Editor
                        editorStyle={{minHeight:200}}
                        editorState={editorState}
                        onEditorStateChange={this.handleEditorStateChange}
                        onContentStateChange={this.handleContentStateChange}
                     />
                </Card>
                <Modal
                    title="HTML文本内容"
                    visible={showRichText}
                    footer={null}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                >
                    {draftjs(contentState)}
                </Modal>
            </div>
        )
    }
}
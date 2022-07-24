import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Modal,Form,Input,Button,Space,message } from 'antd'

@inject('HomeStore')
@observer
class CreateModal extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.HomeStore;
	};

    render() {
        return (
            <Modal title="新建表格" visible={this.store.createVis} 
                    style={{ marginTop: '120px'}} onCancel={this.handleClose}
                    footer={null} layout='horizontal' bodyStyle={{paddingBottom:'0'}}
            >
                <Form 
                    name="createTable_Form" 
                    onFinish={this.onFinish} 
                    onFinishFailed={this.onFinishFailed}
                    autoComplete='off'
                >
                    {/* 输入框 */}
                    <Form.Item label="表格名称 ">
                        <Input placeholder="请输入表格名称"/>
                    </Form.Item>    
                    {/* 按钮组 */}
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit"
                                    style={{ marginLeft:'300px',padding:'0 20px', verticalAlign: 'middle'}}
                            >   
                                确 认
                            </Button>
                            <Button  onClick={this.handleClose}
                                    style={{padding:'0 20px', verticalAlign: 'middle'}}
                            >   
                                取 消
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

    handleClose = () =>{
        this.store.setCreateVis(false);
    }

    //表单提交成功
    onFinish = (values) => {
        if(values === ""){
            message.warning('请输入表格名称');
        }
        else{
            this.store.createTable(values).then(res=>{
                if(res)
                    message.success('添加成功');
            })
            this.store.setCreateVis(false);
        }
    };

    //表单提交失败
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


}

export default CreateModal;
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
            this.store.isClass ? (
                <Modal title="新建分组" visible={this.store.createVis} 
                    style={{ marginTop: '120px'}} onCancel={this.handleClassClose}
                    footer={null} layout='horizontal' bodyStyle={{paddingBottom:'0'}}
                 >
                    <Form 
                        name="createClass_Form" 
                        onFinish={this.onClassFinish} 
                        onFinishFailed={this.onFinishFailed}
                        autoComplete='off'
                    >
                        {/* 输入框 */}
                        <Form.Item label="分组名称" name="className"
                                    rules={[
                                        {
                                          required: true,
                                          message: '请输入分组名称!',
                                        },
                                      ]}
                        >
                            <Input placeholder="请输入分组名称"/>
                        </Form.Item>    
                        <Form.Item label="描述信息" name="description">
                            <Input placeholder="请输入描述信息" style={{marginLeft:'10px'}}/>
                        </Form.Item>    
                        {/* 按钮组 */}
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit"
                                        style={{ marginLeft:'300px',padding:'0 20px', verticalAlign: 'middle'}}
                                >   
                                    确 认
                                </Button>
                                <Button  onClick={this.handleClassClose}
                                        style={{padding:'0 20px', verticalAlign: 'middle'}}
                                >   
                                    取 消
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            ):(
                <Modal title="新建表格" visible={this.store.createVis} 
                    style={{ marginTop: '120px'}} onCancel={this.handleTableClose}
                    footer={null} layout='horizontal' bodyStyle={{paddingBottom:'0'}}
                 >
                    <Form 
                        name="createTable_Form" 
                        onFinish={this.onTableFinish} 
                        onFinishFailed={this.onFinishFailed}
                        autoComplete='off'
                    >
                        {/* 输入框 */}
                        <Form.Item label="表格名称" name="tableName"
                                    rules={[
                                        {
                                          required: true,
                                          message: '请输入表格名称!',
                                        },
                                      ]}
                        >
                            <Input placeholder="请输入表格名称"/>
                        </Form.Item>
                        <Form.Item label="ERP代码" name="erp">
                            <Input placeholder="请输入ERP代码名称" style={{marginLeft:'15px'}}/>
                        </Form.Item>    
                        <Form.Item label="描述信息" name="description">
                            <Input placeholder="请输入描述信息" style={{marginLeft:'10px'}}/>
                        </Form.Item>    
                        {/* 按钮组 */}
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit"
                                        style={{ marginLeft:'300px',padding:'0 20px', verticalAlign: 'middle'}}
                                >   
                                    确 认
                                </Button>
                                <Button  onClick={this.handleTableClose}
                                        style={{padding:'0 20px', verticalAlign: 'middle'}}
                                >   
                                    取 消
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            )
            
        )
    }

    handleTableClose = () =>{
        this.store.setCreateVis(false);
    }

    handleClassClose = () =>{
        this.store.setCreateVis(false);
        this.store.setIsClass(false);
    }

    //表单提交成功
    onTableFinish = (values) => {

        this.store.createTable(values).then(res=>{
            if(res)
                message.success('新建成功');
        })
        this.store.setCreateVis(false);
    };

    onClassFinish = (values) => {

        this.store.createClass(values).then(res=>{
            if(res)
                message.success('新建成功');
        })
        this.store.setCreateVis(false);
        this.store.setIsClass(false);
    }

    //表单提交失败
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


}

export default CreateModal;
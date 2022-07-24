import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Modal,Form,Input,Button,Space } from 'antd'

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
                    style={{ marginTop: '200px'}} onCancel={this.handleClose}
                    footer={null} layout='horizontal' bodyStyle={{paddingBottom:'0'}}
            >
                <Form>
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


}

export default CreateModal;
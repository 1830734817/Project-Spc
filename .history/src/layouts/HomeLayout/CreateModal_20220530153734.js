import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Modal,Form,Input } from 'antd'

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
                    style={{ top: '500'}} onCancel={this.handleClose}
                    footer={null} layout='horizontal'
            >
                <Form>
                    <Form.Item label="表格名称">
                        <Input placeholder="请输入表格名称"/>
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit"
                                style={{ margin: '2px 10px', padding:'0 40px', verticalAlign: 'middle'}}
                        >   
                        确 认
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

    handleClose = () =>{
        this.store.setCreateVis(false);
    }

    handleSubmit = () =>{

    }
}

export default CreateModal;
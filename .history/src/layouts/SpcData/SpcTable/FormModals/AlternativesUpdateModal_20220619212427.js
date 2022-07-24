import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal,Form,Input,Button,Space,message } from 'antd'


@inject('SpcStore')
@observer
class AlternativesUpdateModal extends Component {
    constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
	};

    render() {
        return (
            <Modal title='?' visible={this.store.alternativesUpdateModalVis}
                    style={{top:130}} width={350} bodyStyle={{paddingBottom:'0'}}
                    footer={null} onCancel={this.handleClose}
            >
                <Form
                    name="updateForm" 
                    onFinish={this.onFinish} 
                    onFinishFailed={this.onFinishFailed}
                    autoComplete='off'
                >
                    {/* 输入框 */}
                    <Form.Item label="名称" name="name"
                                rules={[
                                    {
                                        required:true,
                                        message:'请输入名称'
                                    }
                                ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* 按钮组 */}
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit"
                                    style={{ marginLeft:'120px',padding:'0 20px', verticalAlign: 'middle'}}
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

    handleClose = ()=>{
        this.store.setAlternativesUpdateModalVis(false);
    }

    //表单提交成功
    onFinish = (values) => {
        // this.store.rename(values).then(res=>{
        //     if(res)
        //         message.success('修改成功');
        // })
        this.store.setAlternativesUpdateModalVis(false);
    };

    //表单提交失败
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
}

export default AlternativesUpdateModal;
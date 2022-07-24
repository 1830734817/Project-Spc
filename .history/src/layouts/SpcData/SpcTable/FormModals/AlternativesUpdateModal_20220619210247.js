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
            <Modal title={null} visible={this.store.alternativesUpdateModalVis}
                    style={{top:130}} width={350} bodyStyle={{paddingBottom:'0'}}
                    footer={null} onCancel={this.handleClose}
            >
                <Form
                    name="updateForm" 
                    onFinish={this.onFinish} 
                    onFinishFailed={this.onFinishFailed}
                    autoComplete='off'
                >

                </Form>

            </Modal>
        )
    }

    handleClose = ()=>{
        this.store.setAlternativesUpdateModalVis(false);
    }

    //表单提交成功
    onFinish = (values) => {
        this.store.rename(values).then(res=>{
            if(res)
                message.success('修改成功');
        })
        this.store.setAlternativesUpdateModalVis(false);
    };

    //表单提交失败
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
}

export default AlternativesUpdateModal;
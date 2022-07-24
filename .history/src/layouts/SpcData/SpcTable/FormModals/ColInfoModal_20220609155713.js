import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Modal,
         Form,
} from 'antd'

@inject('SpcStore')
@observer
class ColInfoModal extends Component {
    constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
	};

    render() {
        return (
        <Modal title="控制图层次信息设置" visible={this.store.colInfoModalVis} 
                style={{ top: 100}} width={700} bodyStyle={{paddingBottom:'0'}}
                onCancel={this.handleClose} footer={null}
        >
            <Form
                name="colInfoForm"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                autoComplete='off'
                layout='vertical'
                style={{height:'50vh'}}
            >
                <div className='colInfoFormContainer'>
                    {/* 标题 */}
                    <div style={{display:'flex',justifyContent: 'space-between'}}>
                        <b>层次类型</b>
                        <b>值</b>
                    </div>
                    
                </div>
            </Form>

        </Modal>
        )
    }

    handleClose = () =>{
        this.store.setColInfoModalVis(false);
    }

    //表单提交成功
    onFinish = (values) => {
        // this.store.rename(values).then(res=>{
        //     if(res)
        //         message.success('修改成功');
        // })
        this.store.setColInfoModalVis(false);
    };

    //表单提交失败
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
}

export default ColInfoModal;
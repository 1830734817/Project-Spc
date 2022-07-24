import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Modal,
         Form,
         Checkbox,
         Select,
} from 'antd'

const {Option} = Select;

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
                style={{ top: 100}} width={500} bodyStyle={{paddingBottom:'0'}}
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
                    <div style={{display:'flex',justifyContent: 'space-around'}}>
                        <b>层次类型</b>
                        <b>值&emsp;&emsp;&emsp;</b>
                    </div>
                    <hr/>

                    <Form.Item >
                        <div style={{display:'flex',justifyContent: 'space-around'}}>
                            <Form.Item name='产品型号' noStyle>
                                <Checkbox>产品型号</Checkbox>
                            </Form.Item>
                            <Form.Item name='产品型号值' noStyle>
                                <Select style={{ width:'150px'}}>
                                    <Option value='产品型号-1'>产品型号-1</Option>
                                    <Option value='产品型号-2'>产品型号-2</Option>
                                    <Option value='产品型号-3'>产品型号-3</Option>
                                    <Option value='产品型号-4'>产品型号-4</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        
                    </Form.Item>

                    {/* 按钮组 */}
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit"
                                    style={{,padding:'0 20px', verticalAlign: 'middle'}}
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
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Modal,
         Form,
         Input,
         Button,
         Space,
         message,
        Select,
} from 'antd'

const {Option} = Select;

@inject('SpcStore')
@observer
class FormCreateModal extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
	};

    render() {
        return (        
            <Modal title="新增控制图" visible={this.store.createModalVis} 
                style={{ marginTop: '0'}} onCancel={this.handleClose}
                footer={null} width={800} bodyStyle={{paddingBottom:'0'}}
            >
                
                <Form 
                    name="createForm" 
                    onFinish={this.onFinish} 
                    onFinishFailed={this.onFinishFailed}
                    autoComplete='off'
                    layout='vertical'
                >
                    <div className='createFormContainer'>
                        {/* 基本信息标题 */}
                        <Form.Item label="基本信息">
                            <hr/>
                        </Form.Item>

                        {/* 编号 */}
                        <Form.Item label="编号" name="Id"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                        ]}
                        >
                            <Input style={{ width:'400px'}}  />
                        </Form.Item> 

                        {/* 检测项目 */}
                        <Form.Item label="检测项目" name="checkProject">
                            <Select style={{ width:'400px'}} >
                                <Option value='壁厚1（mm）'>壁厚1（mm）</Option>
                                <Option value='壁厚2（mm）'>壁厚2（mm）</Option>
                                <Option value='参数A'>参数A</Option>
                                <Option value='参数B1'>参数B1</Option>
                                <Option value='参数B2'>参数B2</Option>
                                <Option value='参数B3'>参数B3</Option>
                                <Option value='参数C1'>参数C1</Option>
                                <Option value='参数C2'>参数C2</Option>
                                <Option value='参数C3'>参数C3</Option>
                                <Option value='参数D'>参数D</Option>
                                <Option value='参数E'>参数E</Option>
                            </Select>
                        </Form.Item> 

                        {/* 控制图类型 */}
                        <Form.Item label="控制图类型" name="chartType">
                            <Select style={{ width:'400px'}} >
                                <Option value='XR'>XR</Option>
                                <Option value='XS'>XS</Option>
                                <Option value='IMR'>IMR</Option>
                                <Option value='P'>P</Option>
                                <Option value='nP'>nP</Option>
                                <Option value='U'>U</Option>
                                <Option value='C'>C</Option>
                                <Option value='Y'>Y</Option>
                                <Option value='LaneyP'>LaneyP</Option>
                                <Option value='LaneyU'>LaneyU</Option>
                            </Select>
                        </Form.Item> 

                        {/* 样本容量 */}
                        <Form.Item label="样本容量" name="sampleSize">
                            <Select style={{ width:'400px'}} >
                                <Option value='1'>1</Option>
                                <Option value='2'>2</Option>
                                <Option value='3'>3</Option>
                                <Option value='4'>4</Option>
                                <Option value='5'>5</Option>
                                <Option value='6'>6</Option>
                                <Option value='7'>7</Option>
                                <Option value='8'>8</Option>
                                <Option value='9'>9</Option>
                                <Option value='10'>10</Option>
                                <Option value='11'>11</Option>
                                <Option value='12'>12</Option>
                                <Option value='13'>13</Option>
                                <Option value='14'>14</Option>
                                <Option value='15'>15</Option>
                                <Option value='16'>16</Option>
                                <Option value='17'>17</Option>
                                <Option value='18'>18</Option>
                                <Option value='19'>19</Option>
                                <Option value='20'>20</Option>
                                <Option value='21'>21</Option>
                                <Option value='22'>22</Option>
                                <Option value='23'>23</Option>
                                <Option value='24'>24</Option>
                                <Option value='25'>25</Option>
                               
                            </Select>
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
                    </div>
                    
                </Form>
            </Modal>
        )
    }

    handleClose = () =>{
        this.store.setCreateModalVis(false);
    }

    //表单提交成功
    onFinish = (values) => {
        // this.store.rename(values).then(res=>{
        //     if(res)
        //         message.success('修改成功');
        // })
        this.store.setCreateModalVis(false);
    };

    //表单提交失败
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


}

export default FormCreateModal;
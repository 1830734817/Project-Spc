import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal,Form,Input,Button,Space,message } from 'antd'


@inject('SpcStore')
@observer
class CheckProjectUpdateModal extends Component {
    constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
        this.formRef = React.createRef();
	};

    render() {
        return (
            <Modal title='设置检测项目' visible={this.store.checkProjectUpdateModalVis}
                    style={{top:240}} width={350} bodyStyle={{paddingBottom:'0'}}
                    footer={null} onCancel={this.handleClose}
            >
                <Form
                    name="updateForm" 
                    onFinish={this.onFinish} 
                    onFinishFailed={this.onFinishFailed}
                    autoComplete='off'
                    ref={this.formRef}
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
                                    style={{ marginLeft:'150px',padding:'0 20px', verticalAlign: 'middle'}}
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

    componentDidMount = ()=>{
        // if(this.store.isEditAlternatives === true){
        //     const {editAlternativesData} = this.store; 
        //     this.formRef.current.setFieldsValue({
        //         name:editAlternativesData[0].name,
        //     })
        // }
    }

    handleClose = ()=>{
        // if(this.store.isEditAlternatives === true)
        //     this.store.setIsEditAlternatives(false);
        this.store.setCheckProjectUpdateModalVis(false);
    }

    //表单提交成功
    onFinish = (values) => {
        const {tempCheckProjects} = this.store;

        // if(this.store.isEditAlternatives === true){
        //     const {editAlternativesData} = this.store; 
        //     values.key = editAlternativesData[0].key;
        //     tempColInfo[colInfoIndex].colValues.map((item,index)=>{
        //         if(item.key === values.key)
        //             this.store.updateAlternative(index,values);
        //     })
        //     this.store.setEditAlternativesData([values]);
        //     this.store.setIsEditAlternatives(false);
        // }
        // else{
            const key = tempCheckProjects.length+1;
            values.key = key;
            this.store.addCheckProject(values);
        // }
        this.store.setCheckProjectUpdateModalVis(false);
    };

    //表单提交失败
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
}

export default CheckProjectUpdateModal;
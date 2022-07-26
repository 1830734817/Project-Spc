import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal,Form,Input,Button,Space } from 'antd'


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
        if(this.store.isEditCheckProject === true){
            const {editCheckProjectData } = this.store; 
            this.formRef.current.setFieldsValue({
                name:editCheckProjectData[0].name,
            })
        }
    }

    handleClose = ()=>{
        if(this.store.isEditCheckProject === true)
            this.store.setIsEditCheckProject(false);
        this.store.setCheckProjectUpdateModalVis(false);
    }

    //表单提交成功
    onFinish = (values) => {
        const {tempCheckProjects} = this.store;

        if(this.store.isEditCheckProject === true){
            const {editCheckProjectData} = this.store; 

            values.key = editCheckProjectData[0].key;
            tempCheckProjects.map((item,index)=>{
                if(item.key === values.key)
                    this.store.updateCheckProject(index,values);
            })
            this.store.setEditCheckProjectData([values]);//未提交至接口前，再修改取最新数据
            this.store.setIsEditCheckProject(false);
        }
        else{
            const key = tempCheckProjects.length+1;
            values.key = key;
            this.store.addCheckProject(values);
        }
        this.store.setCheckProjectUpdateModalVis(false);
    };

    //表单提交失败
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
}

export default CheckProjectUpdateModal;
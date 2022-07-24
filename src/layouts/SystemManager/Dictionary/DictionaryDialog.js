import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, message } from 'antd';
import GlobalModal from 'Components/GlobalModal';
@inject('DictionaryStore')
@observer
class DeviceListDialog extends Component {
    render() {
        const { modalVisible, formData } = toJS(this.props.DictionaryStore)
        const formLabelCol = { span: 4 }
        const formWrapperCol = { span: 19 }
        const { getFieldDecorator } = this.props.form;
        return <div>
            {
                modalVisible && <GlobalModal
                    title={formData.id ? '编辑' : '新增'}
                    visible={modalVisible}
                    onOk={this.handleSubmit}
                    onCancel={e => this.props.DictionaryStore.modalChange(0)}
                    children={
                        <div>
                            <Form onSubmit={this.handleSubmit} layout='horizontal' labelCol={formLabelCol} wrapperCol={formWrapperCol}>
                                <Form.Item label="标签名">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入标签名' }],
                                        initialValue: formData.name || ''
                                    })(
                                        <Input placeholder="请输入标签名" />
                                    )}
                                </Form.Item>
                                <Form.Item label="数据值">
                                    {getFieldDecorator('value', {
                                        rules: [{ required: false }],
                                        initialValue: formData.value || ''
                                    })(
                                        <Input placeholder="请输入数据值" />
                                    )}
                                </Form.Item>
                                <Form.Item label="类型">
                                    {getFieldDecorator('type', {
                                        rules: [{ required: false }],
                                        initialValue: formData.type || ''
                                    })(
                                        <Input placeholder="请输入类型" />
                                    )}
                                </Form.Item>
                                <Form.Item label="描述">
                                    {getFieldDecorator('description', {
                                        rules: [{ required: false }],
                                        initialValue: formData.description || ''
                                    })(
                                        <Input placeholder="请输入描述" />
                                    )}
                                </Form.Item>
                                {/* <Form.Item label="排序(升序)">
                                    {getFieldDecorator('sort', {
                                        rules: [{ required: false }],
                                        initialValue: formData.sort || ''
                                    })(
                                        <Input placeholder="请输入排序方式" />
                                    )}
                                </Form.Item> */}
                                <Form.Item label="备注信息">
                                    {getFieldDecorator('remarks', {
                                        rules: [{ required: false }],
                                        initialValue: formData.remarks || ''
                                    })(
                                        <Input placeholder="请输入备注信息" />
                                    )}
                                </Form.Item>
                            </Form>
                        </div>
                    }
                />
            }
        </div>;
    }
    //提交表单
    handleSubmit = e => {
        e.preventDefault();
        const { getData, modalChange, addNew, formData, PageInfo } = this.props.DictionaryStore
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (formData.id) {
                    addNew(0, { ...formData, ...values }).then(res => {
                        if(res){
                            message.success('更新成功')
                            modalChange(0)
                            getData({ pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
                        }
                    })
                } else {
                    addNew(1, values).then(res => {
                        if(res){ 
                            message.success('添加成功')
                            modalChange(0)
                            getData({ pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
                        }
                    })
                }

            }
        });
    };

}
const DeviceListDialogForm = Form.create({ name: 'define' })(DeviceListDialog);
export default DeviceListDialogForm;
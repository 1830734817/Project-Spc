import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Input, Radio, Select } from 'antd';
import GlobalModal from 'Components/GlobalModal';
const { Option } = Select
@inject('SystemStore')
@observer
class Department extends Component {
    render() {
        const { modalVisible, formData, FactoryList } = toJS(this.props.SystemStore)
        const formLabelCol = { span: 4 }
        const formWrapperCol = { span: 18 }
        const { getFieldDecorator } = this.props.form;
        return <div>
            {
                modalVisible && <GlobalModal
					title={!formData.id ? '新增' : '编辑'}
                    visible={modalVisible}
                    onOk={this.handleSubmit}
                    onCancel={e => this.props.SystemStore.modalChange(0)}
                    children={
                        <div>
                            <Form onSubmit={this.handleSubmit} layout='horizontal' labelCol={formLabelCol} wrapperCol={formWrapperCol}>
                                {/*<Form.Item label="上级部门">
                                    {getFieldDecorator('parentId', {
                                        initialValue: formData.parentId || '总部门'
                                    })(
                                        <Input disabled placeholder="请输入上级部门" />
                                    )}
                                    </Form.Item>*/}
                                <Form.Item label="部门名称">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入部门名称' }],
                                        initialValue: formData.name || ''
                                    })(
                                        <Input placeholder="请输入部门名称" />
                                    )}
                                </Form.Item>
                                {/* <Form.Item label="排序">
                                    {getFieldDecorator('orderNum', {
                                        rules: [{ required: true, message: '请输入排列顺序' }],
                                        initialValue: formData.orderNum || ''
                                    })(
                                        <Input placeholder="请输入排列顺序" />
                                    )}
                                </Form.Item> */}
                                <Form.Item label="工厂">
                                    {getFieldDecorator('factoryId', {
                                        rules: [{ required: true, message: '请选择工厂' }],
                                        initialValue: formData.factoryId || ''
                                    })(
                                        <Select showSearch allowClear optionFilterProp="children" placeholder='请选择工厂'>
                                            {
                                                FactoryList.map((item, index) => (
                                                    <Option key={index} value={item.id}>{item.name}</Option>
                                                ))
                                            }
                                        </Select>
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
        const { getData, modalChange, addNew, formData, PageInfo } = this.props.SystemStore
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (formData.id) {
                    addNew(0, { ...formData, ...values }).then(res => {
                        if (res) {
                            message.success('更新成功')
                            modalChange(0)
                            getData(1, { pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
                        }
                    })
                } else {
                    // values.parentId = values.parentId === '总部门' ? 0 : ''
                    values.parentId = 0
                    addNew(1, values).then(res => {
                        if (res) {
                            message.success('添加成功')
                            modalChange(0)
                            getData(1, { pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
                        }
                    })
                }

            }
        });
    };
    componentDidMount() {
        this.props.SystemStore.getFactoryList()
    }
}
const DepartmentForm = Form.create({ name: 'define' })(Department);
export default DepartmentForm;
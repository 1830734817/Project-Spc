import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Tag, Divider, Select, Radio, Input } from 'antd';
// 定义表头
export function setColumns({
    editUser, deleteUser, resetPassword
}) {
    return [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'IC卡号',
            dataIndex: 'icCode',
            key: 'icCode',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <div>
                    {text ? <Tag color='#32C5FF' >启用</Tag> : <Tag color='#FF2A8E' >禁用</Tag>}
                </div>
            )
        },
        {
            title: '操作',
            align: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={e => editUser(record)}>编辑</a>
                    <Divider type="vertical" />
                    <a onClick={e => deleteUser(record)}>删除</a>
                    <Divider type="vertical" />
                    <a onClick={e => resetPassword(record)}>重置密码</a>
                </span>
            )
        }
    ];
}
// 用户编辑框
export function setEditFormColumns({
    formData, DepList, roleList, workshopList, handleSubmit, getFieldDecorator
}) {
    const formLabelCol = { span: 4 }
    const formWrapperCol = { span: 18 }
    const { Option } = Select;
    return (
        <Form onSubmit={handleSubmit} layout='horizontal' labelCol={formLabelCol} wrapperCol={formWrapperCol}>
            <Form.Item label="姓名">
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入姓名' }],
                    initialValue: formData.name || ''
                })(
                    <Input placeholder="请输入姓名" />
                )}
            </Form.Item>
            <Form.Item label="用户名">
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名' }],
                    initialValue: formData.username || ''
                })(
                    <Input placeholder="请输入用户名" />
                )}
            </Form.Item>
            <Form.Item label="部门">
                {getFieldDecorator('deptId', {
                    initialValue: DepList.findIndex(value => {
                        return value.id === formData.deptId
                    }) > -1 ? formData.deptId : undefined
                })(
                    <Select showSearch optionFilterProp="children" allowClear placeholder='请选择部门'>
                        {
                            DepList.map((item, index) => (
                                <Option key={index} value={item.id}>{item.name}</Option>
                            ))
                        }
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                    rules: [{ required: false, message: '请输入正确的E-mail', pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ }],
                    initialValue: formData.email || ''
                })(
                    <Input placeholder="请输入E-mail" />
                )}
            </Form.Item>
            <Form.Item label="手机号">
                {getFieldDecorator('mobile', {
                    rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1\d{10}$/ }],
                    initialValue: formData.mobile || ''
                })(
                    <Input placeholder="请输入手机号" />
                )}
            </Form.Item>
            <Form.Item label="IC卡号">
                {getFieldDecorator('icCode', {
                    rules: [{ required: false, message: '请输入IC卡号' }],
                    initialValue: formData.icCode || ''
                })(
                    <Input placeholder="请输入IC卡号" />
                )}
            </Form.Item>
            {!formData.id && <Form.Item label="密码">
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码' }],
                    initialValue: formData.password || ''
                })(
                    <Input placeholder="请输入密码" />
                )}
            </Form.Item>}
            <Form.Item label="状态">
                {getFieldDecorator('status', {
                    rules: [{ required: true, message: '请选择状态' }],
                    initialValue: formData.status || 0
                })(
                    <Radio.Group>
                        <Radio value={1}>正常</Radio>
                        <Radio value={0}>禁用</Radio>
                    </Radio.Group>
                )}
            </Form.Item>
            <Form.Item label="角色">
                {getFieldDecorator('ids', {
                    rules: [{ required: true, message: '请选择角色' }],
                    initialValue: formData.delFlag === 1 ? [] : formData.roleIds.roleList

                })(
                    <Select
                        showSearch optionFilterProp='children'
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="请选择角色"
                        value={formData.roleList}
                    >
                        {
                            roleList.map(item => {
                                return <Option value={item.value} key={item.value}>{item.label}</Option>
                            })
                        }
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="关联车间">
                {getFieldDecorator('workShopIds', {
                    initialValue: formData.delFlag === 1 ? [] : formData.roleIds.workshopList

                })(
                    <Select
                        showSearch optionFilterProp='children'
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="请选择车间"
                        value={formData.workshopIds}
                    >
                        {
                            workshopList.map(item => {
                                return <Option value={item.id} key={item.id}>{item.name}</Option>
                            })
                        }
                    </Select>
                )}
            </Form.Item>
        </Form>
    );
}
// 重置密码
export function setPasswordFormColums({
    handleSubmit, getFieldDecorator
}){
    const formLabelCol = { span: 4 }
    const formWrapperCol = { span: 18 }
    return <Form onSubmit={handleSubmit} layout='horizontal'>
    <Form.Item label="密码">
        {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
            initialValue: ''
        })(
            <Input placeholder="请输入密码" type='password' />
        )}
    </Form.Item>
</Form>
}
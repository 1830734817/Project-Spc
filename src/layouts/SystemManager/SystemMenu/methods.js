import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Tag, Divider, Input, Radio, Select } from 'antd';
// pc系统目录
export function setPcColumns({
    modalChange, deletePc, addLower
}) {
    return [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
            render: (text) => (
                <div> {text}</div>
                // <i class={text} style={{ width: 12, height: 12 }}></i>
            )
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (text, record) => (
                <div>
                    {text === 1 ? <Tag color='rgb(255, 191, 0)' >菜单</Tag> : <Tag color='rgb(50, 197, 255)' >目录</Tag>}
                </div>
            )
        },
        {
            title: '地址',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: '权限标识',
            dataIndex: 'perms',
            key: 'perms',
        },
        {
            title: '操作',
            align: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={e => modalChange(1, record)}>编辑</a>
                    <Divider type="vertical" />
                    <a onClick={e => deletePc(record)}>删除</a>
                    <Divider type="vertical" />
                    <a onClick={e => addLower(record)}>增加下级</a>
                </span>
            )
        }
    ]
}
// 小程序系统目录
export function setXcxColumns({
    modalChange, deleteXcx, addLower
}) {
    return [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '操作',
            align: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={e => modalChange(1, record)}>编辑</a>
                    <Divider type="vertical" />
                    <a onClick={e => deleteXcx(record)}>删除</a>
                </span>
            )
        }
    ]
}
// pc编辑form
export function setPcFormColumns({
    formData, arr, checkClientType, handleSubmit, getFieldDecorator
}){
    const formLabelCol = { span: 6 }
    const formWrapperCol = { span: 18 }
    const { Option } = Select;
    return <Form onSubmit={handleSubmit} layout='horizontal' labelCol={formLabelCol} wrapperCol={formWrapperCol}>
    <Form.Item label="上级菜单">
        {getFieldDecorator('parentId', {
            initialValue: formData.parentId || '根目录'
        })(
            <Select disabled>
                <Option value='0'>根目录</Option>
                {
                    arr.map((item, index) => (
                        <Option key={index} value={item.id}>{item.name}</Option>
                    ))
                }
            </Select>
        )}
    </Form.Item>
    <Form.Item label="菜单类型">
        {getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择菜单类型' }],
            initialValue: formData.type || 0
        })(
            <Radio.Group>
                <Radio value={0}>目录</Radio>
                <Radio value={1}>菜单</Radio>
            </Radio.Group>
        )}
    </Form.Item>
    <Form.Item label="客户端类别">
        {getFieldDecorator('clientType', {
            rules: [{ required: true, message: '请选择客户端类别' },
                {validator:checkClientType}],
            initialValue: formData.id?formData.clientType : undefined
        })(
            <Select allowClear showSearch optionFilterProp='children' placeholder = '请选择客户端类型'>
                <Option value={0}>pc端</Option>
                <Option value={1}>微信小程序</Option>
                <Option value={2}>钉钉小程序</Option>
                <Option value={3}>工控机</Option>
                <Option value={4}>手持扫码器</Option>
                <Option value={5}>阿里物联网平台</Option>
            </Select>
        )}
    </Form.Item>
    <Form.Item label="菜单名称">
        {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入菜单名称' }],
            initialValue: formData.name || ''
        })(
            <Input placeholder="请输入菜单名称" />
        )}
    </Form.Item>
    <Form.Item label="链接地址">
        {getFieldDecorator('url', {
            rules: [{ required: false, message: '请输入链接地址' }],
            initialValue: formData.url || ''
        })(
            <Input placeholder="请输入链接地址" />
        )}
    </Form.Item>
    <Form.Item label="权限标识">
        {getFieldDecorator('perms', {
            rules: [{ required: false, message: '请输入权限标识' }],
            initialValue: formData.perms || ''
        })(
            <Input placeholder="请输入权限标识" />
        )}
    </Form.Item>
    <Form.Item label="排序号">
        {getFieldDecorator('orderNum', {
            rules: [{ required: false, message: '请输入排序号' }],
            initialValue: formData.orderNum || ''
        })(
            <Input placeholder="请输入排序号" />
        )}
    </Form.Item>

    <Form.Item label="图标">
        {getFieldDecorator('icon', {
            rules: [{ required: false, message: '请输入图标' }],
            initialValue: formData.icon || ''
        })(
            <Input placeholder="请输入图标" />
        )}
    </Form.Item>
</Form>
}
// 小程序编辑form
export function setXcxFormColumns({
    formData, handleSubmit, getFieldDecorator
}){
    const formLabelCol = { span: 6 }
    const formWrapperCol = { span: 18 }
    return <Form onSubmit={handleSubmit} layout='horizontal' labelCol={formLabelCol} wrapperCol={formWrapperCol}>
    <Form.Item label="菜单名称">
        {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入菜单名称' }],
            initialValue: formData.name || ''
        })(
            <Input placeholder="请输入菜单名称" />
        )}
    </Form.Item>
</Form>
}
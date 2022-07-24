import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Input, Radio, Tree } from 'antd';
import { Tabs } from 'components/BLComps'
import GlobalModal from 'Components/GlobalModal';
import { isEmpty,uniq } from 'lodash'
const { TreeNode } = Tree;

@inject('SystemStore')
@observer
class Company extends Component {
    state = {
        activeKey:'0',
    }
    render() {
        const { modalVisible, formData,treeData } = toJS(this.props.SystemStore)
        const { activeKey } = this.state
        const formLabelCol = { span: 4 }
        const formWrapperCol = { span: 18 }
        const { getFieldDecorator } = this.props.form;
        const TabsList = [
            {tab:'pc菜单',key:'0'},
            {tab:'小程序菜单',key:'1'},]
            // {tab:'钉钉菜单',key:'2'}
            // {tab:'工控机菜单',key:'3'}
            // {tab:'PDA菜单',key:'4'}
            // {tab:'阿里物联网菜单',key:'5'}]
        return (
            <div>
                {
                    modalVisible && <GlobalModal
                        title={formData.id ? '编辑' : '新增'}
                        visible={modalVisible}
                        onOk={this.handleSubmit}
                        onCancel={e => this.props.SystemStore.modalChange(0)}
                        children={
                            <div>
                                <Form onSubmit={this.handleSubmit} layout='horizontal' labelCol={formLabelCol} wrapperCol={formWrapperCol}>
                                    <Form.Item label="公司名称">
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入公司名称' }],
                                            initialValue: formData.name || ''
                                        })(
                                            <Input placeholder="请输入公司名称" />
                                        )}
                                    </Form.Item>
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
                                    <Form.Item label="公司地址">
                                        {getFieldDecorator('address', {
                                            rules: [{ required: true, message: '请输入公司地址' }],
                                            initialValue: formData.address || ''
                                        })(
                                            <Input placeholder="请输入公司地址" />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="用户名称">
                                        {getFieldDecorator('username', {
                                            rules: [{ required: false, message: '请输入用户名称' }],
                                            initialValue: formData.username || ''
                                        })(
                                            <Input placeholder="请输入用户名称" />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="手机号">
                                        {getFieldDecorator('phone', {
                                            rules: [{ required: true, 
                                                message: '请输入合法手机号',
                                                pattern:/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|19[9]|17[0|1|3|7|6|8]|16[1|6|3|7])\d{8}$/ 
                                            }],
                                            initialValue: formData.phone || undefined
                                        })(
                                            <Input disabled={!!formData.id} placeholder="请输入手机号" />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="菜单权限">
                                        {getFieldDecorator('menuIds', {
                                            rules: [{ required: false, message: '请选择状态' }],
                                            initialValue: formData.menuMap || []
                                        })(
                                            <div>
                                                <Radio.Group onChange={this.changeTab} value={activeKey}>
                                                    {TabsList.map(item=>{
                                                        return <Radio.Button value={item.key}>{item.tab}</Radio.Button>
                                                    })}
                                                </Radio.Group>
                                                <div style={{ height: 450, overflowY: 'auto' }}>
                                                    <Tree
                                                        checkable
                                                        onExpand={this.onExpand}
                                                        onCheck={(checkedKeys, info) => this.onCheck(activeKey, checkedKeys, info)}
                                                        //checkedKeys={formData.menuMap && formData.menuMap[activeKey]?formData.menuMap[activeKey]:[]}                             // Antd3.X
                                                        checkedKeys={formData.menuMap && formData.menuMap[activeKey]?formData.menuMap[activeKey].map(item => item.toString()):[]}  // Antd4.X
                                                    >
                                                        {this.renderTreeNodes(treeData[activeKey])}
                                                    </Tree>
                                                </div>
                                            </div>
                                        )}
                                    </Form.Item>
                                </Form>
                            </div>
                        }
                    />
                }
            </div>
        );
    }
    // 树形控件子节点
    renderTreeNodes = data =>{
        return data && data.map(item => {
            if (item.childMenu) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.childMenu)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }
    // 树形控件选中
    onCheck = (type, checkedKeys, info) => {
        this.props.SystemStore.formData.menuMap[type]= checkedKeys
    };
    // 切换tab
    changeTab = (tab) => {
        if(!this.props.SystemStore.treeData[tab.target.value]){
            this.props.SystemStore.getTreeData({id:'',clientType:tab.target.value})
        }
        this.setState({activeKey: tab.target.value})
    }
    //提交表单
    getTreeParentIds = (treeData,data,ids)=>{
        for(const lv of treeData){
            if( !isEmpty(lv.childMenu) ){
                this.getTreeParentIds(lv.childMenu,data,ids)
            }else{
                for(const id of data){
                    if(id.toString() === lv.id.toString()){
                        ids.push((lv.parentId).toString())
                    }
                }
            }
        }
        return uniq(ids)
    }
    handleSubmit = e => {
        e.preventDefault();
        const { getCompanyData, modalChange, addCompany, formData, PageInfo,treeData } = this.props.SystemStore
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let ids = []
                for(var item in formData.menuMap){
                    if(!treeData[item]){
                        this.props.SystemStore.getTreeData({id:'',clientType:item}).then(()=>{
                            let parentIds = this.getTreeParentIds(treeData[item],formData.menuMap[item],[])
                            ids = ids.concat(formData.menuMap[item],parentIds)
                        })
                    }
                    else{
                        let parentIds = this.getTreeParentIds(treeData[item],formData.menuMap[item],[])
                        ids = ids.concat(formData.menuMap[item],parentIds)
                    }
                }
                values.menuIds = ids
                if (formData.id) {
                    addCompany({ ...formData, ...values }).then(res => {
                        if (res) {
                            message.success('更新成功')
                            modalChange(0)
                            getCompanyData({ pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
                        }
                    })
                } else {
                    // values.parentId = values.parentId === '总部门' ? 0 : ''
                    values.parentId = 0
                    addCompany( values ).then(res => {
                        if(res){
                            message.success('添加成功')
                            modalChange(0)
                            getCompanyData({ pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })

                        }
                    })
                }

            }
        });
    };
    componentDidMount() {
        const formData = this.props.SystemStore.formData
        if(!formData.id){
            formData.menuMap = {}
        }
    }
}
const CompanyForm = Form.create({ name: 'define' })(Company);
export default CompanyForm;
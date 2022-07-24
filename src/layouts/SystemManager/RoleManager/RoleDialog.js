import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Input, Spin, Tree, Radio } from 'antd';
import GlobalModal from 'Components/GlobalModal';
import { toJS } from 'mobx';
import { isEmpty,uniq } from 'lodash'
const { TreeNode } = Tree;
@inject('SystemStore')
@observer
class RoleDialog extends Component {
    state = {
        activeKey:'0'
    }
    renderTreeNodes = data =>
        data && data.map(item => {
            if (item.childMenu) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.childMenu)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    render() {
        const { modalVisible, formData, treeData, } = this.props.SystemStore
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
        return <div>
            {
                modalVisible && <GlobalModal
                    title={!formData.id ? '新增' : '编辑'}
                    visible={modalVisible}
                    width={'50%'}
                    onOk={this.handleSubmit}
                    onCancel={e => this.props.SystemStore.modalChange(0)}
                    children={
                        <div>
                            <Form onSubmit={this.handleSubmit} layout='horizontal' labelCol={formLabelCol} wrapperCol={formWrapperCol}>
                                <Form.Item label="角色名">
                                    {getFieldDecorator('roleName', {
                                        rules: [{ required: true, message: '请输入角色名称' }],
                                        initialValue: formData.roleName || ''
                                    })(
                                        <Input placeholder="请输入角色名称" />
                                    )}
                                </Form.Item>
                                <Form.Item label="备注">
                                    {getFieldDecorator('remark', {
                                        initialValue: formData.remark || ''
                                    })(
                                        <Input placeholder="请输入备注" />
                                    )}
                                </Form.Item>
                                <Form.Item label="菜单权限">
                                    {getFieldDecorator('ids', {
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
                                                <Tree checkable
                                                    onCheck={(checkedKeys, info) => this.onCheck(activeKey, checkedKeys, info)}
                                                    //checkedKeys={formData.menuMap && formData.menuMap[activeKey]?formData.menuMap[activeKey]:[]}
                                                    checkedKeys={formData.menuMap && formData.menuMap[activeKey]?formData.menuMap[activeKey].map(item => item.toString()):[]}
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
        </div>;
    }
    // 切换tab
    changeTab = (tab) => {
        if(!this.props.SystemStore.treeData[tab.target.value]){
            this.props.SystemStore.getTreeData({id:'',clientType:tab.target.value})
        }
        this.setState({activeKey: tab.target.value})
    }
    // 树形控件选中
    onCheck = (type, checkedKeys,info) => {
        this.props.SystemStore.formData.menuMap[type]= checkedKeys
    };
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
        const { getData, modalChange, addNewRole, formData, PageInfo,treeData } = this.props.SystemStore
        this.props.form.validateFields((err, values) => {
            if(!err){
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
                values.ids = ids
                if (!err) {
                    if (formData.id) {
                        addNewRole(0, { ...formData, ...values }).then(res => {
                            if(res){
                                message.success('更新成功')
                                modalChange(0)
                                getData(2, { pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
                            }
                        })
                    } else {
                        addNewRole(1, { ...formData, ...values }).then(res => {
                            if(res){
                                message.success('添加成功')
                                modalChange(0)
                                getData(2, { pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
                            }
                        })
                    }
                }
            }
        });
    };
    componentDidMount() {
        const { formData } = this.props.SystemStore
        if(!formData.id){
            formData.menuMap = {}
        }
    }
}
const RoleDialogForm = Form.create({ name: 'define' })(RoleDialog);
export default RoleDialogForm;
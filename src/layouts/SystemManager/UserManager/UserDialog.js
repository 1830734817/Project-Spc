import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Input, Radio, Select, Checkbox } from 'antd';
import GlobalModal from 'Components/GlobalModal';
import { setEditFormColumns, setPasswordFormColums } from './methods'
@inject('SystemStore')
@observer
class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roleIds: [],
        }
    }
    render() {
        const { modalVisible, formData,roleList, DepList, tab, workshopList} = toJS(this.props.SystemStore)
        const { getFieldDecorator } = this.props.form;
        return <div>
            {
                modalVisible && <div>
                    <GlobalModal
                        title={tab === '2'?'重置密码':formData.id ? '编辑' : '新增'}
                        visible={modalVisible}
                        onOk={tab === '2'?this.resetPassword:this.handleSubmit}
                        width={'50%'}
                        onCancel={this.onClose}
                        children={
                            tab === '2'?setPasswordFormColums({
                                formData, handleSubmit:this.resetPassword, getFieldDecorator
                            }):setEditFormColumns({
                                formData, DepList, roleList, workshopList, handleSubmit:this.handleSubmit, getFieldDecorator
                            })
                        }
                    />
                </div>
            }
        </div>;
    }
    onClose = ()=> {
        this.props.SystemStore.tab = ''
        this.props.SystemStore.modalChange(0)
    }
    //编辑提交表单
    handleSubmit = e => {
        e.preventDefault();
        const { getData, modalChange, addNewUser, formData, userPageInfo, name, deptId } = this.props.SystemStore
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (formData.id) {
                    addNewUser(0, { ...formData, ...values }).then(res => {
                        if(res){
                            message.success('更新成功')
                            modalChange(0)
                            getData(3, { pageIndex: userPageInfo.pageIndex, pageSize: userPageInfo.pageSize, name, deptId })
                        }
                    })
                } else {
                    values.deptId = values.deptId ? values.deptId : 0
                    addNewUser(1, values).then(res => {
                        if(res){
                            message.success('添加成功')
                            modalChange(0)
                            getData(3, { pageIndex: userPageInfo.pageIndex, pageSize: userPageInfo.pageSize, name, deptId })
                        }
                    })
                }
            }
        });
    };
    //重置密码
    resetPassword = e => {
        e.preventDefault();
        const { getData, resetPassword, formData, userPageInfo, name, deptId, modalChange } = this.props.SystemStore
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const userId = formData.id
                const password = values.password
                resetPassword({ id: userId, password: password }).then(res => {
                    if(res){
                        message.success('重置成功')
                        modalChange(0)
                        getData(3, { pageIndex: userPageInfo.pageIndex, pageSize: userPageInfo.pageSize, name, deptId })
                    }
                })
            }
        });
    };
    componentDidMount(){
        this.props.SystemStore.getWorkshopList()
    }
}
const UserDialogForm = Form.create({ name: 'user' })(UserDialog);
export default UserDialogForm;
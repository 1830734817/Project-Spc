import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message } from 'antd';
import GlobalModal from 'Components/GlobalModal';
import { setPcFormColumns, setXcxFormColumns} from './methods'
@inject('SystemStore')
@observer
class MenuDialog extends Component {
    render() {
        const { modalVisible, formData, arr, tab } = toJS(this.props.SystemStore)
        const { getFieldDecorator } = this.props.form;
        return <div>
            {
                modalVisible && <div>
                    <GlobalModal
                        title={formData.id ? '编辑' : '新增'}
                        visible={modalVisible}
                        onOk={this.handleSubmit}
                        width={'50%'}
                        onCancel={e => this.props.SystemStore.modalChange(0)}
                        children={
                            <div>
                                {setPcFormColumns({
                                    formData, arr, checkClientType: this.checkClientType, handleSubmit: this.handleSubmit, getFieldDecorator
                                })}
                            </div>
                        }
                    />

                    {/*innerModalVisible && <GlobalModal
                        title='选择图标'
                        visible={innerModalVisible}
                        onOk={this.handleSubmit}
                        width={'50%'}
                        onCancel={e => this.props.SystemStore.modalChange(0)}
                        children={
                            <div></div>
                        } />*/}
                </div>
            }
        </div>;
    }
    // 校验客户端类型
    checkClientType = (rule, value, callback) => {
        let result = true;
        let parentId = this.props.form.getFieldValue('parentId');
        let clientType = this.props.form.getFieldValue('clientType');
        if(parentId != 5 && parentId != '根目录'){
            result = this.props.SystemStore.formData.clientType === clientType
        }
		if (!result) {
			callback('客户端类型请与上级菜单一致！');
		} else {
			callback();
		}
	};
    //提交表单
    handleSubmit = e => {
        e.preventDefault();
        const { getMenuData, modalChange, addNewMenu, formData, PageInfo, tab } = this.props.SystemStore
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.parentId = values.parentId === '根目录' ? 5 : values.parentId
                if (formData.id) {
                    addNewMenu(0, { ...formData, ...values }).then(res => {
                        if (res) {
                            message.success('更新成功')
                            modalChange(0)
                            getMenuData({id:'', clientType: tab})
                        }
                    })
                } else {
                    addNewMenu(1, values).then(res => {
                        if (res) {
                            message.success('添加成功')
                            modalChange(0)
                            getMenuData({id:'', clientType: tab})
                        }
                    })
                }
            }
        });
    };
}
const MenuDialogForm = Form.create({ name: 'define' })(MenuDialog);
export default MenuDialogForm;
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Input } from 'antd';
import GlobalModal from 'Components/GlobalModal';
@inject('SystemStore')
@observer
class PasswordSetting extends React.Component {
	render() {
        const { visible, onClose } = this.props;
	    const { getFieldDecorator } = this.props.form;
		return <GlobalModal
            title='重置密码'
            visible={visible}
            onOk={this.handleSubmit}
            width={400}
            onCancel={onClose}
            children={
            <Form onSubmit={this.handleSubmit} layout='horizontal'>
                <Form.Item label="密码">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                        initialValue: ''
                    })(
                        <Input placeholder="请输入密码" type='password' />
                    )}
                </Form.Item>
            </Form>
        } />
    }
    //提交表单
    handleSubmit = e => {
        e.preventDefault();
        const { resetPassword } = this.props.SystemStore
        this.props.form.validateFields((err, values) => {
            // return
            if (!err) {
                const password = values.password
                resetPassword({ password: password }).then(res => {
                    if(res){
                        message.success('重置成功')
                        this.props.onClose()
                    }
                })
            }
        });
    }; 
}

const Password = Form.create({})(PasswordSetting);
export default Password;

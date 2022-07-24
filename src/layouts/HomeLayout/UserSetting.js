import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, message, Input, Select, Tabs } from 'antd';
const { Option } = Select
const { TabPane } = Tabs
class UserSetting extends React.Component {
	state = {
    confirmDirty: false,
    tab : '1'
	};
	render() {
    const { visible, onClose } = this.props;
		const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>,
    );
    const basicComps = [<Form.Item label='工厂名称'>
        {getFieldDecorator('companyName')(<Input />)}
      </Form.Item>,
      <Form.Item label='员工工号'>
        {getFieldDecorator('employId')(<Input />)}
      </Form.Item>,
      <Form.Item label='员工姓名'>
        {getFieldDecorator('employName')(<Input />)}
      </Form.Item>,
      <Form.Item label='员工职务'>
        {getFieldDecorator('employPosition')(<Input />)}
      </Form.Item>,
      <Form.Item label='联系方式'>
        {getFieldDecorator('phone', {
          rules: [
            { required: false, message: '必填' }
          ]
        })(
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        )}
      </Form.Item>,
      <Form.Item label='资质信息'>
        {getFieldDecorator('techInfo', {
          rules: [
            { required: false, message: '必填' }
          ]
        })(
          <Input style={{ width: '100%' }} />
        )}
      </Form.Item>,
    ]
    const PassWordComps = [
      <Form.Item label='旧密码' hasFeedback>
        {getFieldDecorator('pwdOld', {
          rules: [
            {
              required: true,
              message: '请输入原密码'
            },
            {
              validator: this.validateToNextPassword
            }
          ]
        })(<Input.Password />)}
      </Form.Item>,
      <Form.Item label='新密码' hasFeedback>
        {getFieldDecorator('pwdNew', {
          rules: [
            {
              required: true,
              message: '请输入新密码'
            },
            {
              validator: this.validateToNextPassword
            }
          ]
        })(<Input.Password />)}
      </Form.Item>,
      <Form.Item label='确认密码' hasFeedback>
        {getFieldDecorator('confirm_password', {
          rules: [
            {
              required: true,
              message: '请确认输入密码'
            },
            {
              validator: this.compareToFirstPassword
            }
          ]
        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
      </Form.Item>
    ]
		return (
			<Modal
        title = '个人设置'
				visible={visible}
				onCancel={onClose}
				onOk={this.onSubmit}
				okText='确定'
				cancelText='取消'
				maskClosable={false}

			>
        <Tabs type='card' onChange={this.onTabChagne}>
          <TabPane tab='个人资料' key='1'></TabPane>
          <TabPane tab='修改密码' key='2'></TabPane>
        </Tabs>
				<Form {...formItemLayout} className='user_setting_layout'>
          {
            this.state.tab === '1' && basicComps
          }
          {
            this.state.tab === '2' && PassWordComps
          }
				</Form>
			</Modal>
		);
  }
  onTabChagne = (tab) =>{
    this.setState({tab})
  }
	onSubmit = () => {
		this.props.form.validateFieldsAndScroll((err, values) => {
      if (this.state.tab === '2') {
        if(!values.pwdOld || !values.pwdNew || !values.confirm_password){
          return
        }else{
          this.props.onSubmit(this.state.tab,values)
          this.props.onClose()
        }
			}else{
        this.props.onSubmit(this.state.tab,values)
        this.props.onClose()
      }
		});
	};
	handleConfirmBlur = e => {
		const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};

	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('pwdNew')) {
			callback('两次输入的密码不相同！');
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm_password'], { force: true });
		}
		callback();
	};
}

const WrapperUser = Form.create({})(UserSetting);
export default WrapperUser;

import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Checkbox, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { setCookie, getCookie, clearCookie } from 'utils/dataTools';
import classnames from 'classnames';
import './purple.less';
import mainlogo from 'assets/logo-yunqizhizao1.png';
import bllogo from 'assets/logo-public.png';
import logoTitle from 'assets/login-title2.png';
import loginbkg from 'assets/loginRight.png';
import ios from 'assets/ios.png'
import android from 'assets/android.png'
@withRouter
@inject('HomeStore')
@observer
class LoginPage extends React.Component {
	state = {
		inputHover: {
			user: false,
			pwd: false
		}
	};
	onInputFocus = (key, value, e) => {
		this.setState({
			inputHover: {
				...this.state.inputHover,
				[key]: value
			}
		});
	};
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className='login_container'>
				<div className='leftBg'>
					<div className='leftAll'>
						<div className='logo_yunqi1'>
							<img style={{ width: 210 }} src={mainlogo} alt='云栖智造' />
						</div>
						<Form onSubmit={this.handleSubmit} className='login-form2'>
							<Form.Item
								label={
									<span
										className={classnames({
											loginInputLabel: true,
											loginInputHover: this.state.inputHover.user
										})}
									>
										请输入用户名
									</span>
								}
							>
								{getFieldDecorator('username', {
									rules: [{ required: false, message: '请输入您的用户名！' }]
								})(
									<Input
										onFocus={this.onInputFocus.bind(this, 'user', true)}
										onBlur={this.onInputFocus.bind(this, 'user', false)}
										size='large'
										placeholder='用户名'
										style={{ maxWidth: 400,  height: 50, border: 0 }}
									/>
								)}
							</Form.Item>
							<Form.Item
								label={
									<span
										className={classnames({
											loginInputLabel: true,
											loginInputHover: this.state.inputHover.pwd
										})}
									>
										请输入密码
									</span>
								}
							>
								{getFieldDecorator('password', {
									rules: [{ required: false, message: '请输入您的密码!' }]
								})(
									<Input
										size='large'
										type='password'
										onFocus={this.onInputFocus.bind(this, 'pwd', true)}
										onBlur={this.onInputFocus.bind(this, 'pwd', false)}
										placeholder='密码'
										style={{ maxWidth: 400, height: 50 }}
									/>
								)}
							</Form.Item>
							<Form.Item>
								{getFieldDecorator('remember', {
									valuePropName: 'checked',
									initialValue: true
								})(<Checkbox>记住密码</Checkbox>)}
								<div className='login-btn2'>
									<Button
										type='primary'
										style={{
											padding: '8px 0',
											marginTop: 30,
											fontSize: 16,
                      maxWidth: 400,
										}}
										htmlType='submit'
										className='login-form-button2'
									>
										登录
									</Button>
								</div>
							</Form.Item>
						</Form>
					</div>
          {/* <div className="code-all">
            <div className="android">
              <img src={android} width={15} height={18} />
              <span>ios下载</span>
            </div>
            <div className="android">
              <img src={ios} width={15} height={18} />
              <span>安卓下载</span>
            </div>
          </div> */}
					<div className='logo_public'>
						<img style={{ width: 142 }} src={bllogo} alt='博拉科技荣誉出品' />
					</div>
				</div>
				<div className='rightBg'>
					<div className='rightBkgImg'>
						<img src={loginbkg} width='100%' height='100%' alt='bl' />
					</div>
					<div
						className='logo_yunqi'
						style={{ marginBottom: 20, width: '36%' }}
					>
						<img
							style={{ width: '100%' }}
							src={logoTitle}
							alt='数字化智能工厂SaaS + 解决方案'
						/>
					</div>
				</div>
			</div>
		);
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
        if(!values.username){
          message.warn('请填写用户名')
          return
        }
        if(!values.password){
          message.warn('请填写密码')
          return
        }
				if (values.remember) {
					for (let name in values) {
						setCookie(name, values[name]);
					}
				} else {
					for (let name in values) {
						clearCookie(name);
					}
				}
				// 请求登陆接口
				this.props.HomeStore.setLogin(
					{
						username: values.username,
						password: values.password
					},
					result => {
						const { success, token } = result;
						if (success) {
							localStorage.setItem('selfToken', token); // 设置前局登陆token
							sessionStorage.setItem('username', values.username); // 设置登录用户名
							this.props.history.push({
								pathname: '/basic/device',
								state: {
									username: values.username,
									password: values.password,
									selfToken: token
								}
							});
						}
					}
				);
			}
		});
	};
	componentDidMount() {
		this.props.form.setFieldsValue({ username: getCookie('username') || '' });
		this.props.form.setFieldsValue({ password: getCookie('password') || '' });
		this.props.form.setFieldsValue({ remember: getCookie('remember') || '' });
	}
}
const WrappedLoginForm = Form.create({ name: 'login' })(LoginPage);
export default WrappedLoginForm;

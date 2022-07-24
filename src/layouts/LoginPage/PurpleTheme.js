import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Checkbox, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { setCookie, getCookie, clearCookie } from 'utils/dataTools';
import './purple.less';
import mainlogo from 'assets/logo-yunqizhizao1.png';
import bllogo from 'assets/logo-public.png';
import logoTitle from 'assets/logo-title2.png';
import loginbkg from 'assets/iiot_background.png';
@withRouter
@inject('HomeStore')
@observer
class LoginPage extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;

    //
    return <div className='login_container2' style={{backgroundImage:'url('+loginbkg+')'}}>
      <div className='login_form2'>
        <div className='basic_login2'>
          {/*  */}
          <div className='logo_yunqi' style={{ marginBottom: 40 }}>
            <img style={{width:210}} src={mainlogo} alt='云栖智造' />
          </div>

          {/*  */}
          <div className='logo_yunqi' style={{ marginBottom: 20,width:'44%' }} >
            <img style={{ width: '100%' }} src={logoTitle} alt='数字化智能工厂SaaS + 解决方案' />
          </div>

          {/*  */}
          <div className='logo_yunqi' style={{ width: 45, height: 4, background: 'rgba(98,54,255,1)', marginBottom: 60 }}>
          </div>

          {/*  */}
          <Form onSubmit={this.handleSubmit} className="login-form2">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入您的用户名！' }],
              })(
                <Input
                  size="large"
                  prefix={<i className='iconfont iconuser' style={{ color: '#9D9D9D',marginRight:18,width:24,height:24 }} ></i>}
                  placeholder="用户名"
                  style={{ maxWidth: 290,height:50 }}
                />,
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入您的密码!' }],
              })(
                <Input
                  size="large"
                  prefix={<i className='iconfont iconpassword' style={{ color: '#9D9D9D',marginRight:18 }}></i>}
                  type="password"
                  placeholder="密码"
                  style={{ maxWidth: 290,height:50 }}
                />,
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住密码</Checkbox>)}
              <div className='login-btn2'>
                <Button type="primary" style={{ maxWidth: 290,padding:'8px 0', marginTop: 30,fontSize:16 }} htmlType="submit" className="login-form-button2">
                  登录
                </Button>
              </div>
            </Form.Item>
          </Form>

          {/*  */}
          <div className='logo_public' style={{ /*position:'absolute',bottom:70*/}} >
            <img style={{width:142}} src={bllogo} alt='博拉科技荣誉出品' />
          </div>

        </div>
      </div>

    </div>;
  }

  //
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 
        if (values.remember) {
          for (let name in values) {
            setCookie(name, values[name]);
          }
        } 
        else {
          for (let name in values) {
            clearCookie(name);
          }
        }

        // 请求登陆接口
        this.props.HomeStore.setLogin({
          username: values.username,
          password: values.password
        }, (result) => {
          const { success, token, accessToken, refreshToken, tenantId } = result;
          if (success) {
            sessionStorage.setItem('selfToken', token); // 设置前局登陆token
            // 退出登录需要
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken);
            sessionStorage.setItem('tenantId', tenantId);
            sessionStorage.setItem('username', values.username); // 设置登录用户名

            // 登录后跳转
            this.props.history.push({
              pathname: '/',
              state: { username: values.username, password: values.password, selfToken: token }
            });
          }
        })
        
      }
    });
  };

  //
  componentDidMount() {
    this.props.form.setFieldsValue({ 'username': getCookie('username') || '' });
    this.props.form.setFieldsValue({ 'password': getCookie('password') || '' });
    this.props.form.setFieldsValue({ 'remember': getCookie('remember') || '' });
  }

}
const WrappedLoginForm = Form.create({ name: 'login' })(LoginPage);
export default WrappedLoginForm;
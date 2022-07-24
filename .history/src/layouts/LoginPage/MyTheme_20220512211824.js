import React from 'react';
import '@ant-design/compatible/assets/index.css';
import { Form, Input, Checkbox, Button,Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { setCookie, getCookie, clearCookie } from '../../utils/dataTools';
import mainLogo from 'assets/mainLogo.png'
import loginAdvertisement from 'assets/loginAdvertisement.png'
import './myTheme.less';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

@withRouter
@inject('HomeStore')
@observer
class LoginPage extends React.Component {
  formRef = React.createRef();

  render() {
    return (
      <div className='login_container'>

        <div className='mainLogoContainer'>
          <img style={{width:'160px'}} src={mainLogo}/>
        </div>

        <div className='login_innerContainer'>

          <div className='loginAdContainer'>
            <img style={{width:'360px'}}src={loginAdvertisement}/>
          </div>

          <div className='login_formContainer'>
            {/* 用户名 & 密码 */}
            <Form name="basic"
                  className="login-form"
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                  ref={this.formRef}
            >  

              <Tabs style={{}}  size="large" centered tabBarGutter="20px"  >
                {/* 1.账号登录 */}
                <TabPane tab="账号登录" key="1">
                  <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true, 
                      message: '请输入您的用户名！' 
                    },
                  ]}
                  >
                    <Input
                      size="large"
                      prefix={<i className='iconfont iconuser' style={{ color: '#9D9D9D',marginRight:18,width:24,height:24 }} ></i>}
                      placeholder="用户名"
                      style={{ maxWidth: 360,height:50,marginLeft:20,marginTop: 30 }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true, 
                        message: '请输入您的密码！' 
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={<i className='iconfont iconpassword' style={{ color: '#9D9D9D',marginRight:18 }}></i>}
                      type="password"
                      placeholder="密码"
                      style={{ maxWidth: 360,height:50,marginLeft:20,marginTop: 30 }}
                    />
                  </Form.Item>

                  <Form.Item name="remember" valuePropName="checked" initialValue="true">
                    <Checkbox style={{marginLeft:20}}>记住密码</Checkbox>
                  </Form.Item>

                  <Form.Item>
                      <Button type="primary" 
                              style={{ width: 360, height:50, padding:'8px 0', marginTop: 30,fontSize:16,marginLeft:20 }} 
                              htmlType="submit" >          
                        登录
                      </Button>
                  </Form.Item>
                </TabPane>

                {/* 2.手机登录 */}
                <TabPane tab="手机登录" key="2" >
                  
                </TabPane>
              </Tabs>
 
            </Form> 
          </div>
        </div>
      </div>
    )
  }

  /**
   * 
   */
  onFinish = (values) => {
    console.log('Success:', values);

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
        //用于默认页面验证登录是否成功
        sessionStorage.setItem('loginSuccess',success);

        // 设置全局登陆token
        sessionStorage.setItem('selfToken', token);          

        // 退出登录需要
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('tenantId', tenantId);
        sessionStorage.setItem('username', values.username); 

        // 登录后跳转
        this.props.history.push({
          pathname: '/',
          state: { username: values.username, password: values.password, selfToken: token }
        });
      }
    })
  };

  /**
   * 
   */
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  /**
   * 登录页面加载时根据是否自动登录来决定是否自动显示输入框中内容
   */
  componentDidMount() {    
    this.formRef.current.setFieldsValue({ 'username': getCookie('username') || '' });
    this.formRef.current.setFieldsValue({ 'password': getCookie('password') || '' });
    this.formRef.current.setFieldsValue({ 'remember': getCookie('remember') || '' });
  }
}

export default LoginPage;
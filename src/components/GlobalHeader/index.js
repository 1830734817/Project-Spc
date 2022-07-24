/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-12-14 22:32:08
 * @LastEditors: shoen
 * @LastEditTime: 2021-05-06 19:35:27
 */
import React,{Component} from 'react';
import './index.less';
// import MobileLogo from '../../assets/logo-mini.png';
// import GlobalCrumbs from '../GlobalCrumbs';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Layout, Dropdown, Menu, Tag, message, Button } from 'antd';
import { inject,observer } from 'mobx-react'
import MyHookController from './MyHookController';
import ProductionStore from '../../stores/ProductionStore'
const { Header } = Layout;
const { CheckableTag } = Tag;

@inject('HomeStore')
@inject('ProductionStore')
@observer
class HeaderLayout extends Component{
  render(){
    const menu = (
      <Menu selectedKeys={[]} style={{marginTop:'-12px'}} onClick={this.onMenuClick}>
        <Menu.Item key="userInfo">
          <UserOutlined />
          {sessionStorage.getItem('username')}
        </Menu.Item>
        
        <Menu.Divider />
        
        <Menu.Item key="password">
          <SettingOutlined />
          重置密码
        </Menu.Item>
        
        {/* <Menu.Item key="userCenter">
          <Icon type="setting" />
          个人设置
        </Menu.Item> */}

        <Menu.Divider />

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );

    const isMobile = this.props.mobile === 'true';
    const isShow = (isMobile ? false : this.props.sizetype === 'l_size');

    return (
      <Header className='header_layout'>
        {/* （1）面包屑 && */}
        <div>
          {/* （1.1）MobileLogo */}
          { 
            !isShow && this.props.sizetype === 's_size' && <span style={{
              display: 'inline-block',
              width: '30px',
              height: '30px',
              marginLeft: '13px'
            }}>
              {/* <img width='100%' src={MobileLogo} alt='mobile-logo' /> */}
            </span>
          }

          {/* （1.2） */}
          {
            this.props.ishome && 
            <span style={{
              display:'inline-block', position:'relative', top: -8,left: 20,
              fontSize: 20,fontWeight: 600
            }}>
              APS
            </span>
          }

          {/* （1.3）缩进图标 */}
          {/* {
            !this.props.ishome && <LegacyIcon
              className="trigger"
              type={this.props.visible ? 'menu-unfold' : 'menu-fold'}
              onClick={()=>this.props.toggle()}
            />
          } */}

          {/* （1.4）面包屑 */}
          {/* {!this.props.ishome && 
            <GlobalCrumbs
              sizetype={this.props.sizetype}
              mobile={isMobile}
              dataSource={this.props.crumbsList} 
            />
          } */}
        </div>


        {/* hook + mobX 样例
        <div className='tool_bar'><Button id='ok' onClick={() => this.enterLoading('OK0')}>hook click；inject store; store++</Button></div>
        <div className='tool_bar'><Button id='ok1' onClick={() => this.enterLoading('OK1')}>hook click；import store; store++</Button></div>
        <div className='tool_bar'><Button id='ok2' onClick={() => this.enterLoading2('OK2')}>ok2</Button></div>
        <div className='tool_bar'><Button id='ok3' onClick={() => this.enterLoading2('OK3')}>ok3</Button></div>
        <div className='tool_bar'><MyHookController></MyHookController></div> */}

        {/* （2）弹出菜单 */}
        <div className='global_header_right'>
          <Dropdown overlay={menu}>
            <span style={{cursor:'pointer'}}><UserOutlined /> </span>
          </Dropdown>

          {/*  */}
          {/* <Dropdown 
            // className={'noticePanel'}
            overlay={<NoticePanel
              className='noticePanel'
              loading={false} 
            />} trigger={['click']}>
            <div style={{display:'inline-block',marginRight:'20px'}}>
              <Badge count={5}>
                <span><Icon type="bell" /></span>
              </Badge>
            </div>
          </Dropdown> */}
        </div>
      </Header>
    );
  }
  
  /**
   * 
   */
  onMenuClick = ({item, key,}) =>{
    this.props.onMenuClick({item,key})
  }

  enterLoading = index => {
    // 需要 @inject('ProductionStore')
    if (index==='OK0') {
      this.props.ProductionStore.hooktest++;
    }
    // 需要 import ProductionStore from '../../stores/ProductionStore'
    else if (index === 'OK1') {
       ProductionStore.hooktest++;
    }
    else if (index === 'OK2') {
      alert(index);
    }

    console.log(index);
  }

  enterLoading2 = index => {
    this.props.onClickFunction(index)
  }

}
export default HeaderLayout;
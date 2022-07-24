import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Menu,Dropdown} from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './index.less'

const { SubMenu } = Menu;

@withRouter
@inject('HomeStore', 'SystemStore')
@observer
class SideMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
		this.store = this.props.HomeStore;
	}

  render() {
    const {sideMenuObj} = this.store;
    const testMenu = (
      <Menu mode="vertical">
        <SubMenu key="1" title="基本资料">
          <Menu.Item key="11">
            层次类型定义
          </Menu.Item>
          
          <Menu.Item key="12">
            检测项目定义
          </Menu.Item>
        </SubMenu>

        <SubMenu key="2" title="缺陷资料">
          <Menu.Item key="21">
            不良定义
          </Menu.Item>
          
          <Menu.Item key="22">
            不良分组
          </Menu.Item>
        </SubMenu>
        
        <SubMenu key="3" title="串口相关">
          <Menu.Item key="31">
            COM端口设置
          </Menu.Item>
        </SubMenu>
        
        <SubMenu key="4" title="图表设置">
          <Menu.Item key="41">
            控制图设置
          </Menu.Item>
          
          <Menu.Item key="42">
            批量控制图设置
          </Menu.Item>
        </SubMenu>
      </Menu>
    );

    return (
      <Menu
        onClick={this.onSiderMenuClick}
        style={{
          width: 280,
          background:'no-repeat'
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        className='sideMenu'
      >
        {
          sideMenuObj.map(firstItem =>
            firstItem.childMenu && firstItem.childMenu.length > 0 ? (
              //第一层子菜单存在
                <SubMenu key={firstItem.id} title={firstItem.name} icon={<SettingOutlined />}>
                  {
                    firstItem.childMenu.map(secondItem =>
                      secondItem.childMenu && secondItem.childMenu.length > 0 ? (
                        //第二层子菜单存在
                        <SubMenu key={secondItem.id} title={secondItem.name} icon={<SettingOutlined />}>
                          {
                            secondItem.childMenu.map(ele =>
                              <Menu.Item key={ele.id} icon={<SettingOutlined />}>{ele.name}</Menu.Item>
                            )
                          }
                        </SubMenu>
                      ):(
                        //第二层子菜单不存在
                        <Menu.Item key={secondItem.id} >
                          {secondItem.name}
                          <Dropdown overlay={testMenu}>
                            <span><SettingOutlined /> </span>
                          </Dropdown>
                        </Menu.Item>
                      )
                    )
                  }
                </SubMenu>
            ):(
            //第一层子菜单不存在
              <Menu.Item key={firstItem.id} >
                {firstItem.name}
                <Dropdown overlay={testMenu}>
                  <span><SettingOutlined /> </span>
                </Dropdown>
              </Menu.Item>
            )
          )
        }
      </Menu>
    )
  }

	onSiderMenuClick = ({ item, key })=>{
		this.props.HomeStore.toggleSideMenu(
			{ actionItem: item, actionId: key},
			url => {
				if (url) {
          this.props.HomeStore.setCurrentPath(url);
					this.props.history.push(url);
				} else {
					alert('false');
				}
			}
		);
	}

}
export default SideMenu;

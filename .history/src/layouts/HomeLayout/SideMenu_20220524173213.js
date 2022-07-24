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
    const lv1_subMenu = (
      <Menu>
        <Menu.Item>
          新建表单
        </Menu.Item>
        <Menu.Item>
          新建分组
        </Menu.Item>
        <Menu.Item>
          重命名
        </Menu.Item>
        <Menu.Item style={{color:'#E23B50'}}>
          删除
        </Menu.Item>
      </Menu>
    ),
    lv2_subMenu = (
      <Menu>
        <Menu.Item>
          新建表单
        </Menu.Item>
        <Menu.Item>
          重命名
        </Menu.Item>
        <Menu.Item style={{color:'#E23B50'}}>
          删除
        </Menu.Item>
      </Menu>
    ),
    item_Menu = (
      <Menu>
        <Menu.Item>
          重命名
        </Menu.Item>
        <Menu.Item style={{color:'#E23B50'}}>
          删除
        </Menu.Item>
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
                <SubMenu key={firstItem.id} title={firstItem.name} 
                         icon={<Dropdown overlay={testMenu}>
                                  <span><SettingOutlined /> </span>
                              </Dropdown>}
                >
                  {
                    firstItem.childMenu.map(secondItem =>
                      secondItem.childMenu && secondItem.childMenu.length > 0 ? (
                        //第二层子菜单存在
                        <SubMenu key={secondItem.id} title={secondItem.name}
                                 icon={<Dropdown overlay={testMenu}>
                                          <span><SettingOutlined /> </span>
                                        </Dropdown>}
                        >
                          {
                            secondItem.childMenu.map(ele =>
                              <Menu.Item key={ele.id}
                                         icon={<Dropdown overlay={testMenu}>
                                                  <span><SettingOutlined /> </span>
                                                </Dropdown>}
                              >
                                {ele.name}
                              </Menu.Item>
                            )
                          }
                        </SubMenu>
                      ):(
                        //第二层子菜单不存在
                        <Menu.Item key={secondItem.id} 
                                   icon={<Dropdown overlay={testMenu}>
                                          <span><SettingOutlined /> </span>
                                         </Dropdown>}
                        >
                          {secondItem.name}
                        </Menu.Item>
                      )
                    )
                  }
                </SubMenu>
            ):(
            //第一层子菜单不存在
              <Menu.Item key={firstItem.id} 
                         icon={<Dropdown overlay={testMenu}>
                                <span><SettingOutlined /> </span>
                                </Dropdown>}
              >
                {firstItem.name}
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

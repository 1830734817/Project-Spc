import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Menu,Dropdown} from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './index.less'

const { SubMenu } = Menu;

@withRouter
@inject('HomeStore')
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

    return (
      <Menu
        onClick={this.onSiderMenuClick}
        style={{
          width: 280,
          background:'no-repeat'
        }}
        mode="inline"
        theme="dark"
        className='sideMenu'
      >
        {
          sideMenuObj.map(firstItem =>
            firstItem.childMenu && firstItem.childMenu.length > 0 ? (
              //第一层子菜单存在
                <SubMenu key={firstItem.id} title={firstItem.name} 
                         icon={<Dropdown overlay={this.lv1_subMenu} overlayClassName='baga'>
                                  <span><SettingOutlined /> </span>
                              </Dropdown>}
                >
                  {
                    firstItem.childMenu.map(secondItem =>
                      secondItem.childMenu && secondItem.childMenu.length > 0 ? (
                        //第二层子菜单存在
                        <SubMenu key={secondItem.id} title={secondItem.name}
                                 icon={<Dropdown overlay={this.lv2_subMenu}>
                                          <span><SettingOutlined /> </span>
                                        </Dropdown>}
                        >
                          {
                            secondItem.childMenu.map(ele =>
                              <Menu.Item key={ele.id}
                                         icon={<Dropdown overlay={this.item_menu}>
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
                                   icon={<Dropdown overlay={this.item_menu}>
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
                         icon={<Dropdown overlay={this.item_menu}>
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
			(url,uuid) => {
				if (url&&uuid) {
          this.props.HomeStore.setCurrentUuid(uuid);
          this.props.HomeStore.setCurrentPath(url);
					this.props.history.push(url);
				} else {
					alert('false');
				}
			}
		);
	}

  lv1_click = ({item,key})=>{
    if(key === "createTable"){
      console.log(item.props.parentMenu.props.className,item)
      this.store.setCreateVis(true);
    }
  }

  lv2_click = ({item,key})=>{
    if(key === "createTable"){
      this.store.setCreateVis(true);
    }
  }

  lv1_subMenu = (
    <Menu onClick={this.lv1_click}>
      <Menu.Item key="createTable">
        新建表单
      </Menu.Item>
      <Menu.Item key="2">
        新建分组
      </Menu.Item>
      <Menu.Item key="3">
        重命名
      </Menu.Item>
      <Menu.Item style={{color:'#E23B50'}} key="4">
        删除
      </Menu.Item>
    </Menu>
  );
  lv2_subMenu = (
    <Menu onClick={this.lv2_click}>
      <Menu.Item key="createTable">
        新建表单
      </Menu.Item>
      <Menu.Item key="2">
        重命名
      </Menu.Item>
      <Menu.Item style={{color:'#E23B50'}} key="3">
        删除
      </Menu.Item>
    </Menu>
  );
  item_menu = (
    <Menu>
      <Menu.Item>
        重命名
      </Menu.Item>
      <Menu.Item style={{color:'#E23B50'}}>
        删除
      </Menu.Item>
    </Menu>
  );

}
export default SideMenu;

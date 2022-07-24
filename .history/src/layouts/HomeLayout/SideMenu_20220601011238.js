import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
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
        onOpenChange={this.onSiderMenuOpen}
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
            firstItem.childMenu ? (
              //第一层子菜单存在
              firstItem.childMenu.length > 0 ? (
                //第一层子菜单存在且不为空
                <SubMenu key={firstItem.id} title={firstItem.name} 
                         icon={<Dropdown overlay={this.lv1_subMenu}>
                                  <span><SettingOutlined /> </span>
                              </Dropdown>}
                >
                  {
                    firstItem.childMenu.map(secondItem =>
                      secondItem.childMenu ? (
                        //第二层子菜单存在
                        secondItem.childMenu.length > 0 ? (
                          //第二层子菜单存在且不为空
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
                          //第二层子菜单存在但为空
                          <SubMenu key={secondItem.id} title={secondItem.name}
                                  icon={<Dropdown overlay={this.lv2_subMenu}>
                                            <span><SettingOutlined /> </span>
                                          </Dropdown>}
                          ></SubMenu>
                        )
                        
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
                //第一层子菜单存在但为空
                <SubMenu key={firstItem.id} title={firstItem.name} 
                         icon={<Dropdown overlay={this.lv1_subMenu}>
                                    <span><SettingOutlined /> </span>
                                </Dropdown>}
                ></SubMenu>
              )
   
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
    this.store.setSelectedItemKey(key);
		this.store.toggleSideMenu(
			{ actionItem: item, actionId: key},
			(url,uuid) => {
				if (url&&uuid) {
          this.store.setCurrentUuid(uuid);
          this.store.setCurrentPath(url);
					this.props.history.push(url);
				} else {
					alert('false');
				}
			}
		);
	}

  onSiderMenuOpen = (keys)=>{
    let tempKeys = toJS(this.store.prevSubKeys);
    //取差集
    let diff = keys.length < tempKeys.length ?
      tempKeys.filter((val) => {return keys.indexOf(val) === -1}):
      keys.filter((val) => {return tempKeys.indexOf(val) === -1})
    
    this.store.setPrevSubKeys(keys);
    this.store.setOpenedSubKey(diff[0]);
  }

  lv1_click = ({item,key})=>{
    if(key === "createTable"){
      this.store.setCreateVis(true);
    }
    else if(key === "createClass"){
			this.store.setCreateVis(true);
			this.store.setIsClass(true);
		}
    else if(key === "rename"){
      this.store.setUpdateVis(true);
      let tempKey = this.store.openedSubKey;
      this.store.setNewNameKey(tempKey);
    }
  }

  lv2_click = ({item,key})=>{
    if(key === "createTable"){
      this.store.setCreateVis(true);
    }
    else if(key === "rename"){
      this.store.setUpdateVis(true);
      let tempKey = this.store.openedSubKey;
      this.store.setNewNameKey(tempKey);
    }
  }

  lv3_click = ({item,key})=>{
    if(key === "rename"){
      this.store.setUpdateVis(true);
      let tempKey = this.store.setSelectedItemKey
      this.store.setNewNameKey(tempKey);
    }
  }

  lv1_subMenu = (
    <Menu onClick={this.lv1_click}>
      <Menu.Item key="createTable">
        新建表格
      </Menu.Item>
      <Menu.Item key="createClass">
        新建分组
      </Menu.Item>
      <Menu.Item key="rename">
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
        新建表格
      </Menu.Item>
      <Menu.Item key="rename">
        重命名
      </Menu.Item>
      <Menu.Item style={{color:'#E23B50'}} key="3">
        删除
      </Menu.Item>
    </Menu>
  );
  item_menu = (
    <Menu onClick={this.lv3_click}>
      <Menu.Item key="rename">
        重命名
      </Menu.Item>
      <Menu.Item style={{color:'#E23B50'}} key="2">
        删除
      </Menu.Item>
    </Menu>
  );

}
export default SideMenu;

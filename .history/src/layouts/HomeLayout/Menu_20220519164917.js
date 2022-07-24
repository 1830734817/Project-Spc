/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-12-16 00:00:03
 * @LastEditors: shoen
 * @LastEditTime: 2021-05-06 20:38:35
 */

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { configKey } from 'constants/theme_config';
// import partUrl from '../../assets/min_logo.png';
import classnames from 'classnames';
import './index.less';
import { Menu, Layout,Dropdown} from 'antd';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { toJS } from 'mobx';
import {
	 LogoutOutlined,
	 UserOutlined,
	 QuestionCircleOutlined, 
	 SettingOutlined,
	 SnippetsOutlined
} from '@ant-design/icons';
const { Sider,Header} = Layout;
const SubMenu = Menu.SubMenu;

@withRouter
@inject('HomeStore', 'SystemStore')
@observer
class MenuLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			sizetype: '',
			pathname: '',
			isPath: false
		};
		this.store = this.props.HomeStore;
	}

	//
	render() {
		const isMobile = this.props.mobile === 'true';
		// const { menulogo, menubkg } = this.props.SystemStore;
		const { menuObj, isSwitchTheme } = this.store;

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
				<LegacyIcon type="setting" />
				个人设置
			  </Menu.Item> */}
	  
			  <Menu.Divider />
	  
			  <Menu.Item key="logout">
				<LogoutOutlined />
				退出登录
			  </Menu.Item>
			</Menu>
		  );
	  
		return (
			// <Sider
			// 	trigger={null}
			// 	collapsible
			// 	collapsed={
			// 		this.props.sizetype === 's_size' ? false : this.state.collapsed
			// 	}
			// 	className={classnames({                                                // 样式有效：条件为真则样式有效
			// 		'ant-sider-menu-content': true,
			// 		'ant-sider-menu-none': isMobile
			// 	})}
			// 	style={{
			// 		overflowY: 'auto',
			// 		height: this.props.sizetype === 's_size' && '100%'
			// 	}}
			// >
			<Header>
				<div className='global_header_right'>
					<Dropdown overlay={menu}>
						<span style={{borderRadius:'50%',border:'1px solid #9d9d9d'}}><UserOutlined /> </span>
					</Dropdown>
					<Dropdown overlay={menu}>
						<span><QuestionCircleOutlined /> </span>
					</Dropdown>
					<Dropdown overlay={menu}>
						<span><SettingOutlined /> </span>
					</Dropdown>
					<Dropdown overlay={menu}>
						<span><SnippetsOutlined /> </span>
					</Dropdown>
				</div>
				{/* menu_container: 通过 #menu_container 描述样式 */}
				<div id='menu_container'>  
					<Menu
						theme='dark'
						// defaultOpenKeys={toJS(this.store.openKeys)}
						// openKeys={toJS(this.store.openKeys)}
						// selectedKeys={toJS(this.store.selectedKeys)}
						// mode={'inline'}
						mode="horizontal"
						onClick={this.handleMenu}
						// onOpenChange={this.onOpenChange}
						// onSelect={this.onMenuSelect}
						className={classnames({
							isThemePurple: isSwitchTheme.isPurple,
							isThemeBlue: isSwitchTheme.isBlue,
							isThemeGreen: isSwitchTheme.isGreen
						})}
            			// style={{
              			// 	position:'relative'
            			// }}
					>
						{/* 菜单LOGO */}
						{/* <div className='menu_logo'>
							{this.props.sizetype !== 's_size' && this.state.collapsed ? (
								<img
									style={{
										paddingLeft: '7px'
									}}
									alt='logo'
									src={partUrl}
									width='55%'
									height='50%'
								/>
							) : (
								<img alt='logo' src={menulogo} width='60%' height='55%' />
							)}
						</div> */}

						{/* 菜单背景 */}
						{/* <div style={{
							position:'fixed',
							bottom:'0%',
							width: this.props.sizetype !== 's_size' && this.state.collapsed ? 80 :200,
							height:'30%'
						}}>
         			  	  	<img alt='bkg' src={menubkg} width='100%' height='100%' /> 
            			</div> */}

                        {/* 菜单项 */}
						{menuObj.map(leaf =>
							!leaf.displayNone ? (
								// 菜单
								leaf.leafMenuModels && leaf.leafMenuModels.length > 0 ? (
										// （1）子菜单存在
										// 父菜单
										<SubMenu
											key={leaf.id}
											title={leaf.name}
											// title={
											// 	<span>
											// 		<span>
											// 			<i
											// 				style={{ marginRight: 10 }}
											// 				className={`iconfont icon${leaf.icon}`}
											// 			/>
											// 		</span>
											// 		<span
											// 			style={{ display: this.state.collapsed && 'none' }}
											// 		>
											// 			{leaf.name}
											// 		</span>
											// 	</span>
											// }
										>
											{/* 子菜单 */}
											{leaf.leafMenuModels &&
											leaf.leafMenuModels.length > 0 &&
											leaf.leafMenuModels.map(
												ele =>
													!ele.displayNone && (
														<Menu.Item key={ele.id}>{ele.name}</Menu.Item>
													)
											)}
										</SubMenu>
								) : (
										// 子菜单不存在
										<Menu.Item key={leaf.id}>
											{leaf.name}
											{/* <span>
												<span>
													<i
														style={{ marginRight: 10 }}
														className={`iconfont icon${leaf.icon}`}
													/>
												</span>
												<span style={{ display: this.state.collapsed && 'none' }}>
													{leaf.name}
												</span>
											</span>  */}
										</Menu.Item>
								)
							) : null
						)}
					</Menu>
				</div>
			</Header>
		);
	}

	onMenuSelect = ({ selectedKeys }) => {
		this.store.selectedKeys = selectedKeys;
	};

	onOpenChange = openKeys => {
		if (openKeys.length > 1) {
			openKeys.splice(openKeys.length - 2, 1);
		}
		this.store.openKeys = openKeys;
	};

	handleMenu = ({ item, key }) => {
		this.props.HomeStore.toggleMenu(
			{ actionItem: item, actionId: key, from: 'menu-click' },
			url => {
				if (url) {
					this.props.history.push(url);
				} else {
					alert('false');
				}
			}
		);
	};

	componentDidMount() {
		/* 初始化判断是否显示 */
		if (this.props.sizetype !== 'l_size') {
			this.state.collapsed = true;
		} else {
			this.state.collapsed = false;
		}
		this.setState({});

		/* 获取图片链接 */
		// this.props.SystemStore.getConfigList({}, [
		// 	configKey['menubkg'],
		// 	configKey['menulogo']
		// ]);
	}

	static getDerivedStateFromProps(props, state) {
		let newState = { ...state };
		if (props.sizetype === 'l_size') {
			if (props.HomeStore.isClickCollapsed) {
				if (props.sizetype !== state.sizetype) {
					props.HomeStore.changeValue('collapsed', false);
				}
				Object.assign(newState, {
					sizetype: props.sizetype,
					collapsed: props.HomeStore.collapsed,
					pathname: props.location.pathname
				});
			} else {
				Object.assign(newState, {
					sizetype: props.sizetype,
					collapsed: false,
					pathname: props.location.pathname
				});
			}
		} else {
			if (props.HomeStore.isClickCollapsed) {
				if (props.sizetype !== state.sizetype) {
					props.HomeStore.changeValue('collapsed', true);
				}
				Object.assign(newState, {
					sizetype: props.sizetype,
					collapsed: props.HomeStore.collapsed,
					pathname: props.location.pathname
				});
			} else {
				Object.assign(newState, {
					sizetype: props.sizetype,
					collapsed: true,
					pathname: props.location.pathname
				});
			}
		}
		if (props.location.pathname !== state.pathname) {
			Object.assign(newState, {
				isPath: true
			});
		} else {
			Object.assign(newState, {
				isPath: false
			});
		}
		return newState;
	}

	onMenuClick = ({item, key,}) =>{
		this.props.onMenuClick({item,key})
	}

	componentDidUpdate() {
		if (this.state.isPath) {
			this.props.HomeStore.initMenu(this.state.pathname);
		}
	}
	
	componentWillUnmount() {
		this.props.SystemStore.clearConfigData();
	}
}
export default MenuLayout;

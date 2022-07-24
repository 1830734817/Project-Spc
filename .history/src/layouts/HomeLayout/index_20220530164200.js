/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-12-16 00:00:03
 * @LastEditors: shoen
 * @LastEditTime: 2021-11-22 15:48:02
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { isEmpty } from 'lodash';
import { ContainerQuery } from 'react-container-query';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import MenuLayout from './Menu';
import SideMenu from './SideMenu';
import GlobalHeader from 'components/GlobalHeader';
import UserSetting from './UserSetting';
import PasswordSetting from './PasswordSetting'
import Context from './AllContext';
import { Media_Query, s_size, m_size, l_size } from 'constants/configs';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Layout, Drawer, Empty, Button,Menu, message,Input,Dropdown} from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined,PlusOutlined,SearchOutlined } from '@ant-design/icons';
import { judgeIsMobile } from 'utils/dataTools';
import './index.less';
import TipDrawer from './TipDrawer';
import { initSearchQuery } from 'utils/dataTools'
import CreateModal from './CreateModal'

const { Content,Sider } = Layout;

@withRouter
@inject('HomeStore')
@observer
class HomeLayout extends Component {
	constructor(props) {
		super(props);

		//未登录时以登录界面为默认页面
		//todo:后续应使用cookie，使关掉页面再打开时也能判断是否已登录
		if(sessionStorage.getItem('loginSuccess') === 'false' || sessionStorage.getItem('loginSuccess') === null){
			return (this.props.history.push('/login'));
		}

		this.state = {
			collapsed: false,
			firstMount: false,
			visible: false,     //个人设置
			setPassword: false, //重置密码
		};
		
		// （1）请求菜单：this.props.location.pathname === '/' or 'plan/task' (登录后刷新)
		// （2）回调：设置默认访问的首页
		// this.props.HomeStore.getMenuList(this.props.location.pathname).then(() => {
		// 	let menuObj = toJS(this.props.HomeStore.menuObj);     // 静态菜单：已经经过动态筛选
		// 	let currentIndex = -1;                                // 
		// 	let current = [];                                     // 能访问的所有菜单项
		// 	let level = 0;
		// 	let path;                                             // 默认访问首页

		// 	// 找到第一个可显示的菜单项
		// 	for(let item of menuObj){
		// 		// 第一个可显示的二级菜单项
		// 		if (item.displayNone === false && item.leafMenuModels){
		// 			level = 2;
		// 			currentIndex = item.leafMenuModels.findIndex(menu=>menu.displayNone === false)          // 第一个能访问的子菜单，如果没有符合条件的元素返回 -1
		// 			current = current.concat(item.leafMenuModels.filter(menu=>menu.displayNone === false))  // 能访问的所有子菜单
		// 			if (currentIndex>=0) break;
		// 		}
		// 		// 第一个可显示的一级菜单项
		// 		else if (item.displayNone === false) {
		// 			level = 1;
		// 			currentIndex = menuObj.findIndex(menu => menu.displayNone === false)
		// 			if (currentIndex>=0) break;
		// 		}
		// 	}

		// 	// 有显示的菜单
		// 	if(currentIndex > -1){
		// 		if(level === 1){
		// 			path = menuObj[currentIndex].path
		// 		}

		// 		if(level === 2){
		// 			path = current[0].path
		// 		}

		// 		// currentIndex = 0
		// 		// this.props.location.pathname = /plan/task
		// 		// path = /plan/task
		// 		console.log("start:",current,currentIndex,this.props.location.pathname,path,"end.")

		// 		// 默认首页
		// 		this.props.history.replace(path)                     // 重要：回不到上一级 适用于登录后，不需要重新回到登页面
		// 		this.props.HomeStore.initMenu(path);                 // 重要：path设置为“默认”打开和选择的菜单
		// 	}
		// });

		//请求侧边菜单
		this.props.HomeStore.getSideMenuList().then(() => {
			let sideMenuObj = toJS(this.props.HomeStore.sideMenuObj);     
			let path;                                             // 默认访问首页

			//找到第一个菜单
			if (sideMenuObj){
				if(sideMenuObj[0].childMenu){
					if(sideMenuObj[0].childMenu[0].childMenu){
						path='/spcData/'+sideMenuObj[0].childMenu[0].childMenu[0].uuid;
						this.props.HomeStore.setCurrentUuid(sideMenuObj[0].childMenu[0].childMenu[0].uuid);
					}
					else{
						path='/spcData/'+sideMenuObj[0].childMenu[0].uuid;
						this.props.HomeStore.setCurrentUuid(sideMenuObj[0].childMenu[0].uuid);

					}
				}
				else{
					path='/spcData/'+sideMenuObj[0].uuid;
					this.props.HomeStore.setCurrentUuid(sideMenuObj[0].uuid);
				}
			}		
			// 默认首页
			this.props.HomeStore.setCurrentPath(path);
			this.props.history.replace(path);                     // 重要：回不到上一级 适用于登录后，不需要重新回到登页面
				
		});
	}

	render() {
		const isHome = window.location.pathname === '/index';
		const isMobile = judgeIsMobile(this.props.type).toString();
		const { size_class, menuObj,sideMenuObj, emptyDesc } = toJS(this.props.HomeStore);

		const mainWindowsLayout = (
			<Layout className='home_layout'>
				{/* (1.1.1) 主菜单 */}
				{!isHome &&
					(size_class === 's_size' ? (
							// (1.1.1.1) 移动端主菜单
							<Drawer
								visible={
									this.state.firstMount ? false : !this.props.HomeStore.collapsed
								}
								placement='left'
								onClose={this.toggle}
								width='200px'
								style={{
									padding: 0,
									height: '100vh'
								}}
								bodyStyle={{
									height: '100%',
									padding: '0'
								}}
							>
								<MenuLayout sizetype={size_class} mobile={isMobile} />
							</Drawer>
						) 
					: 	(
							// (1.1.1.2) PC端主菜单
							<MenuLayout sizetype={size_class} mobile={isMobile} onMenuClick={this.onMenuClick}/>
						)
					)
				}

				{/* (1.1.2) 主工作区  */}
				<Layout>
					{/* （1.1.2.1）用户名；重置密码；退出登录 */}
					{/* <GlobalHeader
						sizetype={size_class}
						mobile={isMobile}
						ishome={isHome}
						onMenuClick={this.onMenuClick}
						crumbsList={toJS(this.props.HomeStore.crumbsList)}
						visible={this.props.HomeStore.collapsed}
						toggle={this.toggle}
						onClickFunction={this.onClickFunction}
					>
					</GlobalHeader> */}

					{/* 1.1.2.1 左侧菜单 */}
					<Sider width="280" style={{overflow: 'auto'}}>
						{/* 顶部操作栏 */}
						<div>
							{/* 搜索框 */}
							<Input placeholder="输入名称" prefix={<SearchOutlined />}
								   size='small' 
								   style={{width:'150px',margin:'10px 10px',borderRadius:'20px'}}
							/>
							{/* 新建按钮 */}
							<Dropdown overlay={this.addMenu}>
								{/* <Button type="primary" size="small" icon={<PlusOutlined />}
										style={{border:'none', margin: '10px 8px', verticalAlign: 'middle'}}
								> */}
									新建&nbsp;&nbsp;
								{/* </Button> */}
							</Dropdown>
						</div>
						{/* 左侧菜单 */}
						<SideMenu/>
					</Sider>
					
					{/* （1.1.2.2）表格区域 */}
					<Content
						style={{
							margin: '8px',
							padding: 10,
							minHeight: 280,
							position: 'relative',
							// height: window.innerHeight - 55 - 16 + 'px'
						}}
						id='home_content'
						mobile={isMobile}
					>
						<div style={{ overflowY: 'auto', height: '100%' }}>
							{this.props.children}
						</div>
					</Content>
				</Layout>
			</Layout>
		);

		const hideLayout = (
			!isHome && (
				<TipDrawer
					lastMenuList={this.getLastMenu()}
					menuList={toJS(this.props.HomeStore.customMenu)}
					toggleMenu={this.toggleMenu}
					actionKey={this.props.HomeStore.toggledActionId}
				>
				</TipDrawer>		
			)
		);

		return (
            <div id='Assets'>
				{/* {menuObj.length > 0 ? ( */}
				{sideMenuObj.length > 0 ? (
					// （1）有菜单情况
					//     条件样式（ContainerQuery）：根据窗口大小，return <Context.Provider/> 
					//     {/* 1. 条件样式：条件符合时，某个样式有效  */}
					<ContainerQuery query={Media_Query}>                               
						{params => {                                                    /* 2. 条件样式：params 会根据窗口大小自动返回一个json，即含某个有效样式  */
							this.getMediaQuery(params);                                 /* 3. 条件样式：有效样式放入store; homeStore.size_class = l_size */
							return (
								// <Context.Provider value={this.getContext()}>
									<div className={classnames(params)}>               {/* 4. 条件样式：classnames(params) 返回有效样式  <div class="screen-sm"/> */}
										{/* （1.1）主窗口区域 */}
										{mainWindowsLayout}

										{/* （1.2）隐藏区域 */}
										{hideLayout}
									</div>
								// </Context.Provider>
							);
						}}
					</ContainerQuery>
				) : (
					// （2）无菜单情况
					<React.Fragment>
						<Button
							icon={<LegacyIcon type={'rollback'} />}
							type='primary'
							style={{
								float: 'left',
								marginTop: '2%',
								marginLeft: '2%'
							}}
							onClick={() => this.props.history.push('/login')}
						>
							退出登录
						</Button>
						<Empty description={emptyDesc} />
					</React.Fragment>
				)}

                {/* 用户设置modal */}
				{this.state.visible && (
					<UserSetting
						visible={this.state.visible}
						onClose={this.onClose}
						onSubmit={this.onSubmit}
					/>
				)}
				
				{/* 重置密码modal */}
				{this.state.setPassword && (
					<PasswordSetting visible={this.state.setPassword} onClose={this.onClose}/>
				)}

				{/* 新建表单/分组modal */}
				{this.props.HomeStore.createVis && <CreateModal />}

				{/* 重命名modal */}

				{/* 删除表单/分组 */}

			</div>
        );
	}

	/**
	 * 弹出菜单响应时间：用户 & 重置密码 & 退出
	 */
	onMenuClick = ({ item, key }) => {
		if (key === 'logout') {
			let params = {
				accessToken: sessionStorage.getItem('accessToken'),
                refreshToken: sessionStorage.getItem('refreshToken'),
			}
			sessionStorage.setItem('loginSuccess',false);
			this.props.history.push('/login');
			this.props.HomeStore.setLogout(params)
		} 
		else if (key === 'userCenter') {
			this.setState({
				visible: true
			});
		}
		else if (key === 'password') {
			this.setState({
				setPassword: true
			});
		}
	};

	onClickFunction = index => {
		alert(index);
		console.log(index);
	}

	/* 左侧菜单点击事件 */
	onSiderMenuClick = ()=>{

	}

	onSubmit = (type, params) => {
		const { savePassword, saveBasicInfo } = this.props.HomeStore;
		if (type === '1') {
			savePassword(params);
		} else {
			saveBasicInfo(params);
		}
	};

	onClose = () => {
		this.setState({
			visible: false,
			setPassword: false
		});
	};

	/**
	 * params：会根据窗口大小自动返回一个json，即含某个有效样式，例如
	 *  {
	 	  screen-lg: false
	  	  screen-md: false
	  	  screen-sm: true
	  	  screen-xl: false
	   	  screen-xs: false
	  	  screen-xxl: false
	 *  }
	 */
	getMediaQuery = params => {
		let current;
		for (let key in params) {
			if (params[key]) {            // params['screen-sm']==true
				current = key;            // current=screen-sm
			}
		}
		if (s_size.includes(current)) {
			this.props.HomeStore.changeValue('size_class', 's_size');
		} 
		else if (m_size.includes(current)) {
			this.props.HomeStore.changeValue('size_class', 'm_size');
		} 
		else if (l_size.includes(current)) {
			this.props.HomeStore.changeValue('size_class', 'l_size');
		}
	};

	/**
	 * this.props：
	 * 
	 * HomeStore: Home {setLastMenuHistory: ƒ, …}
     * children: {$$typeof: Symbol(react.element), type: Symbol(react.fragment), key: null, ref: null, props: {…}, …}
	 * history: {length: 50, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
     * location: {pathname: "/plan/task", search: "", hash: "", state: undefined, key: "iuftp5"}
     * match: {path: "/", url: "/", isExact: false, params: {…}}
     * staticContext: undefined
     * type: "pc"
	 * 
	 */
	getContext = () => {
		// const { location, breadcrumbNameMap } = this.props;
		// return {
		// 	location,
		// 	breadcrumbNameMap,
		// 	...this.props
		// };
	};

	getLastMenu = () => {
		let list = sessionStorage.getItem('menu') || [];
		if (!isEmpty(list)) list = JSON.parse(list).reverse();
		return list || [];
	};

	/**
	 * 
	 */
	toggle = () => {
		this.props.HomeStore.changeValue('collapsed',!this.props.HomeStore.collapsed);
		this.props.HomeStore.changeValue('isClickCollapsed', true);
	};

	toggleMenu = actionId => {
		this.props.HomeStore.toggleMenu({ actionId }, url => {
			if (url) {
				this.props.history.push(url);
			} else {
				alert('false');
			}
		});
	};

	/* 左侧表格新增按钮 */
	addMenu = (
		<Menu onClick={this.addMenuClick}>
			<Menu.Item key="createTable">
			新建表格
			</Menu.Item>
			<Menu.Item key="2">
			新建分组
			</Menu.Item>
		</Menu>
	); 
	
	addMenuClick = ({item,key}) =>{
		console.log('aaaaaaaaaaaaaaaaa')
		if(key === "createTable"){
			this.props.HomeStore.setCreateVis(true);
			console.log(this.props.HomeStore.createVis)
		}
	}

	static getDerivedStateFromProps(props, state) {
		return {
			firstMount: false
		};
	}

	componentDidMount() {
		this.setState({
			firstMount: true
		});
		message.config({
			top: 24,
			maxCount: 1
		});
	}

}
export default HomeLayout;

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CheckCircleFilled } from '@ant-design/icons';
import { message, Upload, Button, Spin } from 'antd';
import { Tabs } from 'components/BLComps'
import './index.less';

const regEn = /[`~!@#$%^&*()_+<>?:"{},\/;'[\]]/im
const regZh = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
const tabsData = [
	{ tab:'logo配置',key:1 },
	{ tab:'主题配置',key:2 },
]
@inject('SystemStore','HomeStore')
@observer
class ConfigPage extends Component {
	store = this.props.SystemStore
	state = {
		tab:1
	}
	
	beforeUpload = (file,fileList,e) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		let isSpecialName = true;
		
		if (!isJpgOrPng) {
			message.error('请上传图片!');
		}
		const isLt1M = file.size / 1024 / 1024 < 1;
		if (!isLt1M) {
			message.error('图片不得大于 1MB!');
		}
		if(regEn.test(file.name) || regZh.test(file.name)){
			isSpecialName = false
			message.error('图片名不得含有特殊字符!');
		}
		// let filereader = new FileReader(),width = 280,height = 380, result;
		// filereader.onload = e => {
		// 	let src = e.target.result;
		// 	const image = new Image();
		// 	image.onload = function() {
		// 		if (width && this.width / this.height !== width / height) {
		// 			// debugger
    //       result = false
		// 			message.error(`请上传宽高为 ${width}x${height} 的图片`);
		// 		} else if (height && this.height !== height) {
    //       result = false
		// 			message.error(`请上传宽高为 ${width}x${height} 的图片`);
    //     } 
    //     console.log(result)
		// 	};
		// 	image.src = src;
		// };
    // filereader.readAsDataURL(file);
		// console.log(isJpgOrPng && isLt1M && isSpecialName && result,result)
		return isJpgOrPng && isLt1M && isSpecialName ;
	};

	render() {
		const { urlList,themeList } = this.store
		const uploadProps = (id)=>{
			return {
				action: '/iiot/resource/upload',
				listType: 'picture',
				accept: '.png,.jpg,.jpeg,.gif',
				data: {
					businessType: id,
					resourceType:0
				},
				method: 'POST',
				showUploadList:false,
				headers: {
					Authorization: sessionStorage.getItem('token') || null
				},
			}
		};
		return (
            <div className='config_container'>
				<Tabs
					dataSource={tabsData}
					onChange={this.handleTabs}
					type='card'
				/>
				{
					this.state.tab === 1 && <ul>
						{urlList.map(url => {
							return (
								url && (
									<li key={url.id}>
										<h3>{url.type}</h3>
										<Spin spinning={this.store.uploadLoading[url.id]}>
											<img src={url.default ? url.defaultUrl : url.url} alt='logo1' />
										</Spin>
										<Upload
											{...uploadProps(url.id)}
											onChange={info => {
												if(info.file.status === 'uploading'){
													this.store.uploadLoading[url.id] = true
												}
												console.log(info)
												if (info.file.status === 'done') {
													message.success('上传成功');
													this.store.getConfigList({},[url.id])
													this.store.uploadLoading[url.id] = false
												} else if (info.file.status === 'error') {
													this.store.uploadLoading[url.id] = false
													if (info.file.response.message == '资源文件名重复') {
														message.warn('请勿上传相同文件名的文件');
													} else {
														message.warn('上传失败');
													}
												} 
											}}
											beforeUpload={this.beforeUpload} 
										>
											<Button type='primary'>更换图片文件</Button>
										</Upload>
									</li>
								)
							);
						})}
					</ul>
				}
				{
					this.state.tab === 2 && [
						<div className='theme-title'>
							<p>云栖主题</p>
						</div>,<ul className='theme-config' >
							{themeList.map(url => {
								return url && (
                                    <li key={url.id} onClick={this.onSwitchTheme.bind(this,url)}>
                                        <div>
                                            <img src={url.url} />
                                        </div>
                                        <h3>
                                            {url.type}
                                            {this.state.currentTheme === url.color && <CheckCircleFilled />}
                                        </h3>
                                    </li>
                                );
							})}
						</ul>
					]
				}
			</div>
        );
	}
	/* 点击切换主题操作 */
  onSwitchTheme = (tag,checked) =>{
		this.props.HomeStore.isSwitchTheme = tag
		this.setState({
			currentTheme:tag.color
		})
		sessionStorage.setItem('ownTheme',tag.color)
    window.less.modifyVars(
      {
        '@primary-color': tag.color,
        '@menu-dark-item-active-bg':tag.color,
        '@link-color': tag.color,
        '@text-color':tag.color,
        '@btn-primary-bg': tag.color,
        '@layout-header-background':tag.color === '#6236FF' ? 'linear-gradient(137deg, #674dc5 0%, #150f23 100%)' : 
          '#001529',
        '@menu-dark-submenu-bg':'transparent',
      }
    )
    .then(() => { 
      message.success('主题切换成功')
    })
    .catch(error => {
      message.error(`主题切换失败`);
      console.log(error)
    });
  }
	handleTabs = tab =>{
		this.setState({
			tab:parseInt(tab)
		})
	}
	componentWillMount() {
		this.store.getConfigList({},[1004,1005])
		if(sessionStorage.getItem('ownTheme').toString() !== 'undefined'){
			this.setState({
				currentTheme:sessionStorage.getItem('ownTheme')
			})
		}
	}
	componentWillUnmount(){
		this.store.clearConfigData()
	}
}
export default ConfigPage;

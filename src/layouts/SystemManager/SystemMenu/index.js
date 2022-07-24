import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { initSearchQuery } from 'utils/dataTools';
import { Row, } from 'antd';
import { Button, Tabs } from 'components/BLComps'
import MenuTable from './MenuTable'
import MenuDialog from './MenuDialog'
import '../index.less'

@inject('SystemStore')
@observer
class SystemMenu extends Component {
    render() {
        const { modalVisible, modalChange, tab } = this.props.SystemStore
        const TabsList = [
            {tab:'pc系统管理',key:'0'},
            {tab:'小程序系统管理',key:'1'},]
        return <div>
            <Tabs dataSource={TabsList} onChange={this.onTabChange} type="card" activeKey={tab}/>
            <div className='tabs_container'>
                <Row>
                    <Button icon='plus' onClick={e => modalChange(0)} type='default'>新增</Button>
                </Row>
                <MenuTable />
                {modalVisible && <MenuDialog />}
            </div>
        </div>;
    }
    // 切换tab
    onTabChange = tab =>{
		this.props.history.replace('/system/menu?tab='+tab)
        this.props.SystemStore.tab = tab
        this.props.SystemStore.getMenuData({id:'', clientType: tab});
    }
    componentDidMount(){
		let location=this.props.location
		let params=location.search?initSearchQuery(location.search):{tab:'0'}
		this.props.history.replace('/system/menu?tab='+params.tab)
        this.props.SystemStore.tab = params.tab
        this.props.SystemStore.getMenuData({id:'', clientType: params.tab});
	}

    componentWillUnmount() {
        this.props.SystemStore.clearData()

    }
}

export default SystemMenu;
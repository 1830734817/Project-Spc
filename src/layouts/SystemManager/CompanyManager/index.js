import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Input } from 'antd';
import { Button } from 'components/BLComps'
import CompanyTable from './CompanyTable';
import CompanyDialog from './CompanyDialog';
import '../index.less'

@inject('SystemStore')
@observer
class CompanyManager extends Component {
    render() {
        const { modalVisible, modalChange } = this.props.SystemStore
        return <div className='tabs_container'>
            <Row>
                <Input.Search style={{ width: 250 }} enterButton='查询' onSearch={this.search} placeholder='请输入公司名称'/>
                {/* <Button type='primary' style={{ marginLeft: 10 }} onClick={this.search}>查询</Button> */}
                <Button  style={{ marginLeft: 10 }} onClick={this.add}>新增</Button>
            </Row>
            <CompanyTable />
            {modalVisible && <CompanyDialog />}
        </div>;
    }
    changeName = (e) => {
        this.props.SystemStore.name = e.target.value
    }
    // 新增
    add = () => {
        this.props.SystemStore.getTreeData({id:'',clientType:0}).then(()=>{
            this.props.SystemStore.modalChange(0)
        })
    }
    search = (value) => {
        const { getCompanyData, PageInfo, name } = this.props.SystemStore
        this.props.SystemStore.name = value
        getCompanyData({ pageIndex: 1, pageSize: PageInfo.pageSize, name: value})
    }
    componentWillUnmount() {
        this.props.SystemStore.companyData = []
        this.props.SystemStore.name = ''
        this.props.SystemStore.PageInfo = { pageIndex: 1, pageSize: 10 }
        this.props.SystemStore.clearData()
    }
}
export default CompanyManager;
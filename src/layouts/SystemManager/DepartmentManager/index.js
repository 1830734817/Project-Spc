import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Input } from 'antd';
import { Button } from 'components/BLComps'
import DepartmentTable from './DepartmentTable';
import DepartmentDialog from './DepartmentDialog';
import '../index.less'

@inject('SystemStore')
@observer
class DepartmentManager extends Component {
    render() {
        const { modalVisible, modalChange } = this.props.SystemStore
        return <div className='tabs_container'>
            <Row>
                <Input.Search style={{ width: 250 }} enterButton='查询' onSearch={this.search} placeholder='请输入部门名称'/>
                {/* <Button type='primary' style={{ marginLeft: 10 }} onClick={this.search}>查询</Button> */}
                <Button  style={{ marginLeft: 10 }} onClick={e => modalChange(0)}>新增</Button>
            </Row>
            <DepartmentTable />
            {modalVisible && <DepartmentDialog />}
        </div>;
    }
    changeName = (e) => {
        this.props.SystemStore.name = e.target.value
    }
    search = (value) => {
        const { getData, PageInfo, name } = this.props.SystemStore
        this.props.SystemStore.name = value
        // getData(1, { name: value })
        getData(1, { pageIndex: 1, pageSize: PageInfo.pageSize, name: value})
    }
    componentWillUnmount() {
        this.props.SystemStore.tableData = []
        this.props.SystemStore.name = ''
        this.props.SystemStore.PageInfo = { pageIndex: 1, pageSize: 10 }
        this.props.SystemStore.clearData()

    }
}
export default DepartmentManager;
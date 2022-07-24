import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Input, Modal, message } from 'antd';
import { Button } from 'components/BLComps';
import RoleTable from './RoleTable';
import RoleDialog from './RoleDialog';
import '../index.less'

@inject('SystemStore')
@observer
class RoleManager extends Component {
    render() {
        const { modalVisible, modalChange } = this.props.SystemStore
        return <div className='tabs_container'>
            <Row>
                <Input.Search style={{ width: 270 }} enterButton='查询' onSearch={this.search} placeholder='请输入角色名称'/>
                {/* <Button type='primary' style={{ marginLeft: 10 }} onClick={this.search}>查询</Button> */}
                <Button style={{ marginLeft: 10 }} onClick={this.add}>新增</Button>
                {/* <Button type='linear' style={{ marginLeft: 10 }} onClick={this.batchRemove}>批量删除</Button> */}
            </Row>
            <RoleTable />
            {modalVisible && <RoleDialog />}
        </div>;
    }
    batchRemove = () => {
        const { deleteRole, getData, PageInfo, selectedRows } = this.props.SystemStore
        if (selectedRows.length === 0) {
            message.warning('请至少选择一条数据')
            return
        }
        Modal.confirm({
            title: '提示',
            content: `是否确认删除该${selectedRows.length}条数据？`,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                let arr = []
                for (let item of selectedRows) {
                    arr.push(item.id)
                }
                deleteRole(0, { ids: arr }).then(res => {
                    message.success('删除成功')
                    getData(2, { pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
                })
            },
        });
    }
    // 新增
    add = () => {
        this.props.SystemStore.getTreeData({id:'',clientType:0}).then(()=>{
            this.props.SystemStore.modalChange(0)
        })
    }
    search = (value) => {
        const { getData, PageInfo, name } = this.props.SystemStore
        this.props.SystemStore.name = value
        getData(2, { pageIndex: 1, pageSize: PageInfo.pageSize, name: value})
    }
    componentWillUnmount() {
        this.props.SystemStore.tableData = []
        this.props.SystemStore.name = ''
        this.props.SystemStore.PageInfo = { pageIndex: 1, pageSize: 10 }
        this.props.SystemStore.clearData()

    }
}
export default RoleManager;
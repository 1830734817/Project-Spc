import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Divider, Modal, message, Tag, Input } from 'antd';
import TableLayout from 'Components/TableLayout'
import GlobalModal from 'Components/GlobalModal';
import { setColumns } from './methods'
import { toJS } from 'mobx';


@inject('SystemStore')
@observer
class UserTable extends Component {
    render() {
        const { tableData, userPageInfo, isLoading, formData } = toJS(this.props.SystemStore)
        //定义表头
        const columns = setColumns({
            editUser: this.editUser, 
            deleteUser: this.delete, resetPassword: this.resetPassword})
        // 选中表格选项
        // const rowSelection = {
        //     onSelect: (record, selected, selectedRows) => {
        //         console.log('selectedRows:',selectedRows)
        //         this.props.SystemStore.selectedRows = selectedRows
        //     },
        //     onSelectAll: (selected, selectedRows, changeRows) => {
        //         this.props.SystemStore.selectedRows = selectedRows
        //     }
        // };
        return <div style={{ marginTopi: 20 }}>
            <TableLayout rowKey="id" onChange={this.changePage} loading={isLoading} columns={columns} dataSource={tableData} pagination={userPageInfo} />
        </div>;
    }
    changePage = (e) => {
        this.props.SystemStore.userPageInfo = e
        this.props.SystemStore.userPageInfo.pageIndex = e.current
        const { getData, userPageInfo, deptId, name } = this.props.SystemStore
        getData(3, { pageIndex: userPageInfo.pageIndex, pageSize: userPageInfo.pageSize, name, deptId })
    }
    // 重置密码
    resetPassword = (record) => {
        this.props.SystemStore.formData = record
        this.props.SystemStore.modalChange(1, { ...record })
        this.props.SystemStore.tab = '2'
    }
    // 编辑
    editUser = (record) => {
        this.props.SystemStore.getRoleIds({ id: record.id }).then(() => {
            this.props.SystemStore.modalChange(1, { ...record, roleIds: this.props.SystemStore.roleIds })
            this.props.SystemStore.tab = '1'
        })
    }
    // 删除
    delete = (record, ) => {
        const { deleteUser, getData, userPageInfo, deptId, name } = this.props.SystemStore
        Modal.confirm({
            title: '提示',
            content: '是否确认删除该条数据？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                deleteUser(1, { id: record.id }).then(res => {
                    message.success('删除成功')
                    getData(3, { pageIndex: userPageInfo.pageIndex, pageSize: userPageInfo.pageSize, name, deptId })
                })
            },
        });
    }
    componentDidMount() {
        const { getData, userPageInfo } = this.props.SystemStore
        getData(3, { pageIndex: userPageInfo.pageIndex, pageSize: userPageInfo.pageSize})
    }
}
export default UserTable;
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TableLayout from 'Components/TableLayout'
import { Divider, Modal, message } from 'antd';
import { toJS } from 'mobx';
@inject('SystemStore')
@observer
class DepartmentTable extends Component {
    render() {
        const { tableData, PageInfo, isLoading, getData } = toJS(this.props.SystemStore)
        //定义表头
        const columns = [
            {
                title: '角色名',
                dataIndex: 'roleName',
                key: 'roleName',
            },
            {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
            },
            {
                title: '操作',
                key: 'x',
                align: 'right',
                render: (text, record) => (
                    <span>
                        <a onClick={e => this.editRole(record)}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={e => this.delete(record)}>删除</a>
                    </span>
                )

            }
        ];
        // 选中表格选项
        return <div style={{ marginTop: 20 }}>
            <TableLayout size='middle' rowKey="id" loading={isLoading} 
                columns={columns} dataSource={tableData} pagination={{
                    ...PageInfo,
                    onChange:this.changePage
                }} />
        </div>;
    }

    editRole = (record) => {
        this.props.SystemStore.formData=record
        this.props.SystemStore.getTreeData({id:'',clientType:0}).then(()=>{
            this.props.SystemStore.getMenuIdsByRole({ id: record.id }).then(()=>{
                this.props.SystemStore.modalVisible = true
            })
        })
    }
    changePage = (pageIndex,pageSize) => {
        this.props.SystemStore.PageInfo = {pageIndex,pageSize}
        const { getData, PageInfo,} = this.props.SystemStore
        getData(2, { pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize,})
    }
    delete = (record) => {
        const { deleteRole, getData, PageInfo } = this.props.SystemStore
        Modal.confirm({
            title: '提示',
            content: '是否确认删除该条数据？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                deleteRole(1, { id: record.id }).then(res => {
                    message.success('删除成功')
                    getData(2, { pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
                })
            },
        });
    }
    componentDidMount() {
        const { getData, PageInfo } = this.props.SystemStore
        getData(2, { pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
    }
}
export default DepartmentTable;
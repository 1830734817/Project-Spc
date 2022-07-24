import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, message, Table } from 'antd';
import { toJS } from 'mobx';
import { setPcColumns, setXcxColumns } from './methods';


@inject('SystemStore')
@observer
class MenuTable extends Component {
    render() {
        const { tableData, isLoading, tab } = toJS(this.props.SystemStore)
        //定义表头
        const columns = setPcColumns({
            modalChange: this.props.SystemStore.modalChange,
            deletePc: this.delete,
            addLower: this.addLower})

        return <div style={{ marginTop: 20 }}>
            <Table size='middle' rowKey="id" loading={isLoading} columns={columns} dataSource={tableData} />
        </div>;
    }
    addLower = (record) => {
        this.props.SystemStore.formData = { parentId: record.id, clientType: record.clientType}
        this.props.SystemStore.modalVisible = true
    }
    delete = (record) => {
        const { deleteMenu, getMenuData, tab} = this.props.SystemStore
        Modal.confirm({
            title: '提示',
            content: '是否确认删除该条数据？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                deleteMenu({ id: record.id }).then(res => {
                    message.success('删除成功')
                    getMenuData({id:'', clientType: tab})
                })
            },
        });

    }
}
export default MenuTable;
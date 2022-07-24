import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Divider, Modal, message } from 'antd';
import { toJS } from 'mobx';
import TableLayout from 'Components/TableLayout';


@inject('DictionaryStore')
@observer
class DeviceListTable extends Component {
    render() {
        const { tableData, PageInfo, isLoading } = toJS(this.props.DictionaryStore)
        //定义表头
        const columns = [
            {
                title: '标签名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '数据值',
                dataIndex: 'value',
                key: 'value',
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: '操作',
                key: 'x',
                align: 'right',
                render: (text, record) => (
                    <span>
                        <a onClick={e => this.props.DictionaryStore.modalChange(1, record)}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={e => this.delete(record)}>删除</a>
                        <Divider type="vertical" />
                        <a onClick={e => this.props.DictionaryStore.modalChange(1, { type: record.type, description: record.description })}>添加</a>
                    </span>
                )

            }
        ];
        // 选中表格选项
        const rowSelection = {
            onSelect: (record, selected, selectedRows) => {
                this.props.DictionaryStore.selectedRows = selectedRows
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                this.props.DictionaryStore.selectedRows = selectedRows
            }
        };

        return <div style={{ marginTop: 20 }}>
            <TableLayout rowKey="id" onChange={this.changePage} rowSelection={rowSelection} loading={isLoading} columns={columns} dataSource={tableData} pagination={PageInfo} />
        </div>;
    }
    delete = (record) => {
        const { deleteDict, getData, PageInfo, type } = this.props.DictionaryStore
        Modal.confirm({
            title: '提示',
            content: '是否确认删除该条数据？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                deleteDict(1, { id: record.id }).then(res => {
                    message.success('删除成功')
                    getData({ description: type, pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
                })
            }
        });
    }
    changePage = (e) => {
        this.props.DictionaryStore.PageInfo = e
        this.props.DictionaryStore.PageInfo.pageIndex = e.current
        const { type, PageInfo } = this.props.DictionaryStore
        this.props.DictionaryStore.getData({ description: type, pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
    }
    componentDidMount() {
        const { type, PageInfo } = this.props.DictionaryStore
        this.props.DictionaryStore.getData({ description: type, pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
    }
}
export default DeviceListTable;
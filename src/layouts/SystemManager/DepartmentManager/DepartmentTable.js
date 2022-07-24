import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Divider, Modal, message, } from 'antd';
import TableLayout from 'Components/TableLayout'

@inject('SystemStore')
@observer
class DepartmentTable extends Component {
    render() {
        const { tableData, PageInfo, isLoading, getData } = this.props.SystemStore
        //定义表头
        const columns = [
            {
                title: '部门名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '部门ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '所属工厂',
                dataIndex: 'factoryName',
                key: 'factoryName',
            },
            {
                title: '操作',
                key: 'x',
                align: 'right',
                render: (text, record) => (
                    <span>
                        <a onClick={e => this.props.SystemStore.modalChange(1, record)}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={e => this.delete(record)}>删除</a>
                    </span>
                )

            }
        ];

        return <div style={{ marginTop: 20 }}>
            <TableLayout rowKey="id" loading={isLoading} columns={columns} dataSource={tableData} 
                pagination={{
                    ...PageInfo,
                    onChange:(pageIndex,pageSize)=>{
                        getData(1, { pageIndex, pageSize })
                    }
                }}

            />
        </div>;
    }
    delete = (record, ) => {
        const { deleteCol, getData, PageInfo } = this.props.SystemStore
        Modal.confirm({
            title: '提示',
            content: '是否确认删除该条数据？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                deleteCol({ id: record.id }).then(res => {
                    if (res) {
                        message.success('删除成功')
                    }
                    getData(1, { pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize})
                })
            },
        });

    }
    componentDidMount() {
        const { getData, PageInfo } = this.props.SystemStore
        getData(1, { pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
    }
}
export default DepartmentTable;
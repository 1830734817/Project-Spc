import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Divider, Modal, message, Tag, Table } from 'antd';
import { toJS } from 'mobx';


@inject('SystemStore')
@observer
class CompanyTable extends Component {
    render() {
        const { companyData, PageInfo,getCompanyInfo, isLoading } = this.props.SystemStore
        //定义表头
        const columns = [
            {
                title: '公司名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '用户名称',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => (
                    <div>
                        {text ? <Tag color='#32C5FF' >启用</Tag> : <Tag color='#FF2A8E' >禁用</Tag>}
                    </div>
                )
            },
            {
                title:'公司id',
                dataIndex:'id',
                key:'id',
            },
            {
                title:'公司地址',
                dataIndex:'address',
                key:'address'
            },
            {
                title: '操作',
                key: 'x',
                align: 'right',
                render: (text, record) => (
                    <span>
                        <a onClick={() => this.edit(record)}>编辑</a>
                        <Divider type="vertical" />
                        {/*<a>增加下级</a>
                        <Divider type="vertical" />*/}
                        <a onClick={e => this.delete(record)}>删除</a>
                    </span>
                )

            }
        ];

        return <div style={{ marginTop: 20 }}>
            <Table pagination={{
                ...PageInfo,
                onChange:(pageIndex,pageSize)=>{
                    this.props.SystemStore.PageInfo = {
                        pageIndex,pageSize
                    }
                    this.props.SystemStore.getCompanyData({ pageIndex, pageSize })

                }
            }} size='middle' rowKey="id" loading={isLoading} columns={columns} dataSource={companyData} />
        </div>;
    }
    // 编辑
    edit = (record) => {
        this.props.SystemStore.formData=record
        this.props.SystemStore.getTreeData({id:'',clientType:0}).then(()=>{
            this.props.SystemStore.getCompanyInfo({id:record.id}).then(()=>{
                this.props.SystemStore.modalVisible = true
            })
        })
    }
    delete = (record, ) => {
        const { deleteCompany, getCompanyData, PageInfo } = this.props.SystemStore
        Modal.confirm({
            title: '提示',
            content: '是否确认删除该条数据？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                deleteCompany({ id: record.id }).then(res => {
                    if (res) {
                        message.success('删除成功')
                    }
                    getCompanyData({ pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
                })
            },
        });

    }
    componentDidMount() {
        const { getCompanyData, PageInfo,getTreeData } = this.props.SystemStore
        getCompanyData({ pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
    }
}
export default CompanyTable;
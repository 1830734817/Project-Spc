import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Modal, message, Button, Input } from 'antd';
import DictionaryTable from './DictionaryTable'
import DictionaryDialog from './DictionaryDialog'
@inject('DictionaryStore')
@observer
class Dictionary extends Component {
    render() {
        const { modalVisible, } = this.props.DictionaryStore
        return <div>
            <Row>
                <Input.Search placeholder='请输入描述内容' enterButton='查询' allowClear style={{ width: 270 }} onSearch={this.onSearchData} />
                {/* <Button type='primary' style={{ marginLeft: 10 }} onClick={this.onSearchData}>查询</Button> */}
                <Button style={{ marginLeft: 10 }} onClick={e => this.props.DictionaryStore.modalChange(0)}>新增</Button>
                <Button style={{ marginLeft: 10 }} onClick={this.batchDelete}>批量删除</Button>
            </Row>
            <DictionaryTable />
            {modalVisible && <DictionaryDialog />}
        </div>;
    }
    batchDelete = () => {
        const { deleteDict, selectedRows, getData, PageInfo, type } = this.props.DictionaryStore
        if (selectedRows.length === 0) {
            message.warning('请选择至少一条数据')
        } else {
            Modal.confirm({
                title: '提示',
                content: `是否确认删除该${selectedRows.length}条数据？`,
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    let ids = []
                    for (let key in selectedRows) {
                        ids.push(selectedRows[key].id)
                    }
                    deleteDict(0, { ids: ids }).then(res => {
                        message.success('删除成功')
                        getData({ description: type, pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
                    })
                }
            });
        }

    }

    //查询
    onSearchData = (value) => {
        const { type, PageInfo } = this.props.DictionaryStore
        this.props.DictionaryStore.type = value
        this.props.DictionaryStore.getData({ description: value, pageIndex: 1, pageSize: PageInfo.pageSize })
    }
    componentDidMount() {
        // this.props.DictionaryStore.getTypeList()

    }
}
export default Dictionary;
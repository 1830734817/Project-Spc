import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Input, Modal, message, Upload } from 'antd';
import { Button } from 'components/BLComps'
import Category from 'Components/Category'
import UserTable from './UserTable'
import UserDialog from './UserDialog'
import '../index.less'
import { toJS } from 'mobx';

@inject('SystemStore')
@observer
class SystemMenu extends Component {
    state = {
        url: 1, // 1新增 0修改
    }
    render() {
        const { modalVisible, modalChange, DepList, getData, PageInfo, deptId, name } = this.props.SystemStore
        // 上传props
        const props = {
            name: 'file',
            action: this.state.url ? '/iiot/ipc/user/importInsert' : '/iiot/ipc/user/importUpdate',
            data: {
                tenantId: sessionStorage.getItem('tenantId')
            },
            headers: {
                Authorization: sessionStorage.getItem('token') || null,
            },
            showUploadList: false,
            onChange: (info) => {
                if (info.file && info.file.status && info.file.status === 'done') {
                    if (info.file && info.file.response) {
                        if (info.file.response.code == 0) {
                            message.success('上传成功')
                            getData(3,{ pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize, deptId, name })
                        }
                        else {
                            message.warn(info.file.response.msg || '上传失败')
                        }
                    }
                }
            },
        };
        return <div className='tabs_container'>
            <Row style={{ marginBottom: 10 }}>
                <Input.Search style={{ width: 250 }} enterButton='查询' onSearch={this.search} placeholder='请输入用户姓名'></Input.Search>
                {/* <Button type='primary' style={{ marginLeft: 10 }} onClick={this.search}>查询</Button> */}
                <Button style={{ marginLeft: 10 }} onClick={e => { this.props.SystemStore.tab = '1'; modalChange(0) }}>新增</Button>
                <Button type='default' style={{ marginLeft: 10 }} onClick={this.downLoad}>下载模板</Button>
                <Button type='default' style={{ marginLeft: 10 }} onClick={this.export}>导出</Button>
                <Upload {...props}>
                    <Button type='default' style={{ marginLeft: 10 }} onClick={() => this.upLoad('add')}>导入新增</Button>
                    {/* <Button type='default' style={{ marginLeft: 10 }} onClick={() => this.upLoad('edit')}>导入修改</Button> */}
                </Upload>
                {/* <Button type='linear' style={{ marginLeft: 10 }} onClick={this.batchRemove}>批量删除</Button> */}
                
            </Row>
            {DepList.length > 0 && <Category
                title='选择部门'
                content={[{ deptId: '', name: '全部' }, ...toJS(DepList)]}
                keyName='name'
                defaultActiveKey={{ deptId: '', name: '全部' }}
                onClick={this.handelClick} />}
            <UserTable goTo={this.goTo} />
            {modalVisible && <UserDialog />}
        </div>;
    }
    // 导出数据
    export = e => {
        let query = ['tenantId=' + sessionStorage.getItem('tenantId')]
        window.open(`//${window.location.host}/iiot/ipc/config/exportUser?${query.join('&')}`)
    }
    // 下载模板
    downLoad = () => {
        let query = ['tenantId=' + sessionStorage.getItem('tenantId')]
        window.open(`//${window.location.host}/iiot/ipc/user/template?${query.join('&')}`)
    }
    // 导入数据
    upLoad = (type) => {
        this.setState({
            url:type === 'add'?1:0
        })
    }
    handelClick = (e) => {
        this.props.SystemStore.deptId = e.id
        const { getData, PageInfo, deptId, name } = this.props.SystemStore
        getData(3, { pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize, deptId, name })
    }
    batchRemove = () => {
        const { deleteUser, getData, PageInfo, selectedRows, id, } = this.props.SystemStore
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
                deleteUser(0, { ids: arr }).then(res => {
                    message.success('删除成功')
                    getData(3, { pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize, })
                })
            },
        });
    }
    search = (value) => {
        this.props.SystemStore.name = value
        const { getData, PageInfo, id, name } = this.props.SystemStore
        getData(3, { pageIndex: 1, pageSize: PageInfo.pageSize, name: value })
    }
    // 转跳页面
    goTo = (url) => {
        this.props.history.push(url)
    }
    componentDidMount() {
        this.props.SystemStore.getRoleList({ pageIndex: 1, pageSize: 10000000 })
        this.props.SystemStore.getDepList({ pageIndex: 1, pageSize: 1000000 })
        this.props.SystemStore.getCompanyList({ pageIndex: 1, pageSize: 1000000 })
    }
    componentWillUnmount() {
        // this.props.SystemStore.clearData()
    }
}
export default SystemMenu;
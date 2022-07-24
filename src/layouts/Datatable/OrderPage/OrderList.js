/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:03:18
 * @LastEditors: shoen
 * @LastEditTime: 2021-11-29 00:02:32
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, message, Input, Select, Spin, DatePicker } from 'antd'; 
import { Button } from 'components/BLComps'
import './index.less';
import OrderTable from './OrderTable';
import OrderModal from './OrderModal';
import { isEmpty, debounce } from 'lodash';

@inject('MyOrderStore')
@observer
class OrderList extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.MyOrderStore;  
    }

    render() {
        return (
            <div className='task_container'>
                {/* （1）检索条件 */}
                <div className='search_bar'>
                    {/* 最终物料 */}
                    {/* <Input placeholder='请输入订单代码' 
                           allowClear
                           style={{ width: 250, verticalAlign: 'middle', marginRight: 10, marginBottom: 10 }}
                           onChange={e => this.onChangeInput('code', e)}
                    /> */}
                    
                    {/* 查询 */}
                    {/* <Button style={{ marginRight: 10, marginBottom: 10,verticalAlign: 'middle' }} 
                            type='primary' 
                            onClick={this.onSearch}
                    >
                        查询
                    </Button> */}
                    
                    {/* 新增 */}
                    <Button style={{ margin: '0 10px 10px 0', verticalAlign: 'middle'}} type='default'
                            onClick={() => {
                                this.store.orderStatus = 'add';
                                this.store.showModal(true);
                        }}
                    >
                        新增
                    </Button>

                    {/* 删除 */}
                    <Button style={{ margin: '0 10px 10px 0', verticalAlign: 'middle'}} type='default'
                            onClick={() => {
                                this.onDelete(this.store.selectedIdsList);
                        }}
                    >
                        删除
                    </Button>

                    {/* 删除 */}
                    <Button style={{ margin: '0 10px 10px 0', verticalAlign: 'middle'}} type='default'
                            onClick={() => {
                                this.onClear(this.store.selectedIdsList);
                        }}
                    >
                        清除检索
                    </Button>

                </div>
                
                {/* （2）列表 */}
                <OrderTable checkStatus={this.props.checkStatus} />

                {/* （3）模式对话框 */}
                {
                    this.store.orderModalVis && <OrderModal visible={this.store.orderModalVis} />
                }
            </div>);
    }

    /**
     * <Input/>
     */
    onChangeInput = (key, e) => {
        this.store.searchOptions[key] = e.target.value
    }

    /**
     * 查询按钮
     */
    onSearch = () => {
        this.store.getOrderList({
            ...this.store.searchOptions,
            pageSize: 10,
            pageIndex: 1,
        });
    }

    /**
	 * 删除
	 */
	onDelete = (selectedIdsList)=>{
        if (this.store.selectedIdsList.length>0) {
            Modal.confirm({
                title:'批量删除',
                content:'确定要删除选中的记录？',
                okText:'确定',
                cancelText:'取消',
                onOk:()=>{
                    this.store.deleteOrder({
                        ids:selectedIdsList
                    },'single');

                    // 删除->数据库恢复->翻页->原来选中删除的标记不出现
                    this.store.selectedIdsList=[];
                }
            })
        }
        else {
            Modal.warning({
                title: '批量删除',
                content: '请选择需要批量删除的记录！',
              });
        }
    };
    
    onClear = ()=> {
        
    }

    componentDidMount() {
    }
}

export default OrderList;

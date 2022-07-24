import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import {Table,Tooltip} from 'antd'
import './index.less';

const columns = [
    {
      title: '编号',
      dataIndex: 'Id',
      key: 'Id',
      width: 110,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '检测项目',
      dataIndex: 'checkProject',
      key: 'checkProject',
      width: 140,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '图类',
      dataIndex: 'chartType',
      key: 'chartType',
      width: 140,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '样本容量',
      dataIndex: 'sampleSize',
      key: 'sampleSize',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '产品型号',
      dataIndex: 'model',
      key: 'model',
      width: 110,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '产线',
      dataIndex: 'productLine',
      key: 'productLine',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '班次',
      dataIndex: 'class',
      key: 'class',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '设备',
      dataIndex: 'equipment',
      key: 'equipment',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
      key: 'supplier',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '客户',
      dataIndex: 'customer',
      key: 'customer',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '批次',
      dataIndex: 'batch',
      key: 'batch',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '工单编号',
      dataIndex: 'workId',
      key: 'workId',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '规格上限',
      dataIndex: 'upLimit',
      key: 'upLimit',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '目标值',
      dataIndex: 'target',
      key: 'target',
      width: 110,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '规格下限',
      dataIndex: 'downLimit',
      key: 'downLimit',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
      title: '判异规则',
      dataIndex: 'errorRule',
      key: 'errorRule',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      )
    },
    {
        title: '更新用户',
        dataIndex: 'updater',
        key: 'updater',
        width: 120,
        ellipsis: {
          showTitle: false,
        },
        render: address => (
          <Tooltip placement="topLeft" title={address}>
            {address}
          </Tooltip>
        )
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 120,
        ellipsis: {
          showTitle: false,
        },
        render: address => (
          <Tooltip placement="topLeft" title={address}>
            {address}
          </Tooltip>
        )
      }
  ]

  const data = [
    {
      key: '1',
      Id: '11221321441253241421',
      checkProject: '参数A',
      chartType: 'XR',
      sampleSize: 5,
      model: '产品型号-2',
      productName: '产品-01',
      productLine: '产线#01',
      class: '甲班',
      equipment: 'N/A',
      supplier: 'N/A',
      customer: 'N/A',
      batch: 'N/A',
      workId: 'N/A',
      upLimit: 1,
      target: 0.9,
      downLimit: 0.8,
      errorRule: 'R0,R1-1-3',
      updater: 'admin',
      updateTime: '2022/5/17 19:47:50'
    },
    {
        key: '2',
        Id: '11221321441253241421',
        checkProject: '参数A',
        chartType: 'XR',
        sampleSize: 5,
        model: '产品型号-2',
        productName: '产品-01',
        productLine: '产线#01',
        class: '甲班',
        equipment: 'N/A',
        supplier: 'N/A',
        customer: 'N/A',
        batch: 'N/A',
        workId: 'N/A',
        upLimit: 1,
        target: 0.9,
        downLimit: 0.8,
        errorRule: 'R0,R1-1-3',
        updater: 'admin',
        updateTime: '2022/5/17 19:47:50'
      },
      {
        key: '3',
        Id: '11221321441253241421',
        checkProject: '参数A',
        chartType: 'XR',
        sampleSize: 5,
        model: '产品型号-2',
        productName: '产品-01',
        productLine: '产线#01',
        class: '甲班',
        equipment: 'N/A',
        supplier: 'N/A',
        customer: 'N/A',
        batch: 'N/A',
        workId: 'N/A',
        upLimit: 1,
        target: 0.9,
        downLimit: 0.8,
        errorRule: 'R0,R1-1-3',
        updater: 'admin',
        updateTime: '2022/5/17 19:47:50'
      },
      {
        key: '4',
        Id: '11221321441253241421',
        checkProject: '参数A',
        chartType: 'XR',
        sampleSize: 5,
        model: '产品型号-2',
        productName: '产品-01',
        productLine: '产线#01',
        class: '甲班',
        equipment: 'N/A',
        supplier: 'N/A',
        customer: 'N/A',
        batch: 'N/A',
        workId: 'N/A',
        upLimit: 1,
        target: 0.9,
        downLimit: 0.8,
        errorRule: 'R0,R1-1-3',
        updater: 'admin',
        updateTime: '2022/5/17 19:47:50'
      },
      {
        key: '5',
        Id: '11221321441253241421',
        checkProject: '参数A',
        chartType: 'XR',
        sampleSize: 5,
        model: '产品型号-2',
        productName: '产品-01',
        productLine: '产线#01',
        class: '甲班',
        equipment: 'N/A',
        supplier: 'N/A',
        customer: 'N/A',
        batch: 'N/A',
        workId: 'N/A',
        upLimit: 1,
        target: 0.9,
        downLimit: 0.8,
        errorRule: 'R0,R1-1-3',
        updater: 'admin',
        updateTime: '2022/5/17 19:47:50'
      },
      {
        key: '6',
        Id: '11221321441253241421',
        checkProject: '参数A',
        chartType: 'XR',
        sampleSize: 5,
        model: '产品型号-2',
        productName: '产品-01',
        productLine: '产线#01',
        class: '甲班',
        equipment: 'N/A',
        supplier: 'N/A',
        customer: 'N/A',
        batch: 'N/A',
        workId: 'N/A',
        upLimit: 1,
        target: 0.9,
        downLimit: 0.8,
        errorRule: 'R0,R1-1-3',
        updater: 'admin',
        updateTime: '2022/5/17 19:47:50'
      },
      {
        key: '7',
        Id: '11221321441253241421',
        checkProject: '参数A',
        chartType: 'XR',
        sampleSize: 5,
        model: '产品型号-2',
        productName: '产品-01',
        productLine: '产线#01',
        class: '甲班',
        equipment: 'N/A',
        supplier: 'N/A',
        customer: 'N/A',
        batch: 'N/A',
        workId: 'N/A',
        upLimit: 1,
        target: 0.9,
        downLimit: 0.8,
        errorRule: 'R0,R1-1-3',
        updater: 'admin',
        updateTime: '2022/5/17 19:47:50'
      },
      {
        key: '8',
        Id: '11221321441253241421',
        checkProject: '参数A',
        chartType: 'XR',
        sampleSize: 5,
        model: '产品型号-2',
        productName: '产品-01',
        productLine: '产线#01',
        class: '甲班',
        equipment: 'N/A',
        supplier: 'N/A',
        customer: 'N/A',
        batch: 'N/A',
        workId: 'N/A',
        upLimit: 1,
        target: 0.9,
        downLimit: 0.8,
        errorRule: 'R0,R1-1-3',
        updater: 'admin',
        updateTime: '2022/5/17 19:47:50'
      },
      {
        key: '9',
        Id: '11221321441253241421',
        checkProject: '参数A',
        chartType: 'XR',
        sampleSize: 5,
        model: '产品型号-2',
        productName: '产品-01',
        productLine: '产线#01',
        class: '甲班',
        equipment: 'N/A',
        supplier: 'N/A',
        customer: 'N/A',
        batch: 'N/A',
        workId: 'N/A',
        upLimit: 1,
        target: 0.9,
        downLimit: 0.8,
        errorRule: 'R0,R1-1-3',
        updater: 'admin',
        updateTime: '2022/5/17 19:47:50'
      },
      {
        key: '10',
        Id: '11221321441253241421',
        checkProject: '参数A',
        chartType: 'XR',
        sampleSize: 5,
        model: '产品型号-2',
        productName: '产品-01',
        productLine: '产线#01',
        class: '甲班',
        equipment: 'N/A',
        supplier: 'N/A',
        customer: 'N/A',
        batch: 'N/A',
        workId: 'N/A',
        upLimit: 1,
        target: 0.9,
        downLimit: 0.8,
        errorRule: 'R0,R1-1-3',
        updater: 'admin',
        updateTime: '2022/5/17 19:47:50'
      },
      {
        key: '11',
        Id: '11221321441253241421',
        checkProject: '参数A',
        chartType: 'XR',
        sampleSize: 5,
        model: '产品型号-2',
        productName: '产品-01',
        productLine: '产线#01',
        class: '甲班',
        equipment: 'N/A',
        supplier: 'N/A',
        customer: 'N/A',
        batch: 'N/A',
        workId: 'N/A',
        upLimit: 1,
        target: 0.9,
        downLimit: 0.8,
        errorRule: 'R0,R1-1-3',
        updater: 'admin',
        updateTime: '2022/5/17 19:47:50'
      }
  ]

@inject('SpcStore')
@observer
class TableContent extends Component {
  render() {
    const {spcTableContent} = toJS(this.store);

    return (
        <div className='dataTable'>        
            <Table  
            rowSelection={{     
                type: 'checkbox',
                ...this.rowSelection,
            }} 
            columns={columns} 
            dataSource={spcTableContent}
            bordered
            scroll={{ x: 1300 ,y:420}}
            onRow={(key,record) => {
                return {
                onClick: event => {

                }, // 点击行
                };
            }}
            />
        </div>
    )
  }

  componentDidMount() {
      this.props.SpcStoregetSpcTableContent();
  }

  /* 表格第一列选择框事件 */
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
  };
}

export default TableContent;

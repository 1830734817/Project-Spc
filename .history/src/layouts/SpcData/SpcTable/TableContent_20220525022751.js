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

@inject('SpcStore')
@observer
class TableContent extends Component {
  render() {
    const {spcTableContent} = toJS(this.props.SpcStore);
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
    this.props.SpcStore.getSpcTableContent();
  }

  /* 表格第一列选择框事件 */
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
  };
}

export default TableContent;

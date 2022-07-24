import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import {Table,Tooltip} from 'antd'
import './index.less';

const columns_1 = [
  {
    title: '编号',
    dataIndex: 'Id',
    key: 'Id',
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
    title: '检测项目',
    dataIndex: 'checkProject',
    key: 'checkProject',
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
    title: '图类',
    dataIndex: 'chartType',
    key: 'chartType',
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
  }
]

const columns_2 = [
  {
    title: '规格上限',
    dataIndex: 'upLimit',
    key: 'upLimit',
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
    title: '目标值',
    dataIndex: 'target',
    key: 'target',
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
    title: '规格下限',
    dataIndex: 'downLimit',
    key: 'downLimit',
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
      width: 140,
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

  constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
	};

  render() {
    const {spcTableContent,colInfo} = toJS(this.store);
    /* 合并固定列和用户定义的列 */
    let tempColumns = [];
    tempColumns = tempColumns.concat(columns_1);

    colInfo.map((col)=>{
      let colSample = {
        title: '',
        dataIndex: '',
        key: '',
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

      colSample.title = col.colName;
      colSample.dataIndex = col.colName;
      colSample.key = col.colName;

      tempColumns.push(colSample);
    })

    tempColumns = tempColumns.concat(columns_2);

    return (
        <div className='dataTable'>        
            <Table  
              rowSelection={{     
                  type: 'checkbox',
                  ...this.rowSelection,
              }} 
              columns={tempColumns} 
              dataSource={spcTableContent}
              bordered
              scroll={{ x: 1300 ,y:420}}
              onRow={(key,record) => {
                  return {
                    onClick: event => {
                      return <Link to={`${this.store.currentPath}/chart`}/>
                    }, // 点击行
                  };
              }}
            />
        </div>
    )
  }

  componentDidMount() {
    //获取所选菜单对应表格内容
    this.store.getSpcTableContent();
  }

  /* 表格第一列选择框事件 */
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.store.setModalEditData(selectedRows);
      this.store.setSelectedIdsList(selectedRowKeys);
    },
  };
}

export default TableContent;

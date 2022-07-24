/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 15:22:43
 * @LastEditors: zhihao
 * @LastEditTime: 2022-04-18 20:31:11
 */

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import {Table} from 'antd'
import './index.less';

export default class DataTable extends Component {
  render() {

    const columns = [
			{
				title: '保养工单',
				dataIndex: 'maintenanceId',
				key: 'maintenanceId',
				width: 100,
			},
      {
				title: '设备编号-主键',
				dataIndex: 'equipmentMainId',
				key: 'equipmentMainId',
				width: 100,
			},
      {
				title: '设备编号',
				dataIndex: 'equipmentId',
				key: 'equipmentId',
				width: 100,
			},
      {
				title: '设备名称',
				dataIndex: 'equipmentName',
				key: 'equipmentName',
				width: 100,
			},
      {
				title: '保养负责人',
				dataIndex: 'principal',
				key: 'principal',
				width: 100,
			},
      {
				title: '保养等级',
				dataIndex: 'level',
				key: 'level',
				width: 100,
			},
      {
				title: '保养频次',
				dataIndex: 'frequency',
				key: 'frequency',
				width: 100,
			},
      {
				title: '间隔天数',
				dataIndex: 'interval',
				key: 'interval',
				width: 100,
			},
      {
				title: '本次保养时间',
				dataIndex: 'currentDate',
				key: 'currentDate',
				width: 100,
			},
      {
				title: '下次保养时间',
				dataIndex: 'nextDate',
				key: 'nextDate',
				width: 100,
			},
      {
				title: '保养内容及要求',
				dataIndex: 'requirement',
				key: 'requirement',
				width: 100,
			},
      {
				title: '设备拍照',
				dataIndex: 'photo',
				key: 'photo',
				width: 100,
			},
      {
				title: '设备状态',
				dataIndex: 'state',
				key: 'state',
				width: 100,
			},
      {
				title: '保养信息记录',
				dataIndex: 'record',
				key: 'record',
				width: 100,
			},
      {
				title: '提交人',
				dataIndex: 'submitter',
				key: 'submitter',
				width: 100,
			},
      {
				title: '提交时间',
				dataIndex: 'submitTime',
				key: 'submitTime',
				width: 100,
			},
      {
				title: '更新时间',
				dataIndex: 'updateTime',
				key: 'updateTime',
				width: 100,
			}
    ]
    return (
      <div className='planTable'>        
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

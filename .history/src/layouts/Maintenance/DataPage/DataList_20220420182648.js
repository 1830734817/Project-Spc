/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 15:22:43
 * @LastEditors: zhihao
 * @LastEditTime: 2022-04-18 20:31:11
 */

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import {Button,Dropdown,Menu,message} from 'antd'
import { 
  DownOutlined,
  SortDescendingOutlined,
  FullscreenOutlined,
  FilterOutlined,
  EyeOutlined,
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import './index.less'
import DataTable from './DataTable'
import DataModal from './DataModal'

/* 导出菜单点击事件 */
const handleExportMenuClick = (e)=>{
  message.info('Click on menu item.');
}

/* 删除菜单点击事件 */
const handleDeletMenuClick = (e)=>{
  message.info('Click on menu item.');
}

/* "导出"下拉框菜单 */
const exportMenu = (
  <Menu onClick={handleExportMenuClick}>
    <Menu.Item key="1" disabled="true">
      筛选后的数据
    </Menu.Item>
    <Menu.Item key="2">
      全部数据
    </Menu.Item>
  </Menu>
); 

/* "删除"下拉框菜单 */
const deleteMenu = (
  <Menu onClick={handleDeletMenuClick}>
    <Menu.Item key="1" disabled="true">
      筛选后的数据
    </Menu.Item>
    <Menu.Item key="2">
      全部数据
    </Menu.Item>
  </Menu>
); 

@inject('MaintenanceStore')
@inject('HomeStore')
@observer
class DataList extends Component {

  render() {

    return (
      <div className='container'>
        {/* 1.顶部操作栏 */}
        <div className='search_bar'>

          {/* 添加 */}
          <Button type="primary" icon={<PlusOutlined />}
            style={{ margin: '0 10px 10px 0', padding:'0 20px', verticalAlign: 'middle'}}
          >
            添加
          </Button>

          {/* 导出 */}
          <Dropdown overlay={exportMenu} placement="bottomLeft" >
            <Button icon={<UploadOutlined />} style={{ margin: '0 10px 10px 0', verticalAlign: 'middle'}}>
              导出<DownOutlined />
            </Button>
          </Dropdown>

          {/* 删除 */}
          <Dropdown overlay={deleteMenu} placement="bottomLeft" >
            <Button icon={<DeleteOutlined />} style={{ margin: '0 850px 10px 0', verticalAlign: 'middle'}}>
              删除<DownOutlined />
            </Button>
          </Dropdown>

          {/* 筛选条件 */}
          <Button icon={<FilterOutlined />} style={{margin: '0 10px 10px 0', verticalAlign: 'middle'}}>
            筛选条件
          </Button>

          {/* 排序 */}
          <Button icon={<SortDescendingOutlined />} style={{border:'none', margin: '0 10px 10px 0', verticalAlign: 'middle'}}/>

          {/* 显示字段 */}
          <Button icon={<EyeOutlined />} style={{ margin: '0 10px 10px 0', verticalAlign: 'middle'}}/>|&nbsp;

          {/* 全屏 */}
          <Button icon={<FullscreenOutlined />} style={{ margin: '0 10px 10px 10px', verticalAlign: 'middle'}}/>

        </div>

        {/* 2.表格 */}
        <DataTable/>

        {/* 3.对话框 */}
        {
          false&&<DataModal/>
        }

      </div>
    )
  }

}

export default DataList;

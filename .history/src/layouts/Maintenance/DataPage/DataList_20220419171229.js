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
import { DownOutlined } from '@ant-design/icons';
import './index.less'


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
  <Menu
    onClick={handleExportMenuClick}
    items={[
      {
        label: '筛选后的数据',
        key: '1',
      },
      {
        label: '全部数据',
        key: '2',
      },
    ]}
  />
); 

/* "删除"下拉框菜单 */
const deleteMenu = (
  <Menu
    onClick={handleDeletMenuClick}
    items={[
      {
        label: '筛选后的数据',
        key: '1',
      },
      {
        label: '全部数据',
        key: '2',
      },
    ]}
  />
); 

export default class DataList extends Component {

  render() {

    return (
      <div className='container'>
        {/* 1.顶部操作栏 */}
        <div className='search_bar'>

          {/* 添加 */}
          <Button type="primary" style={{ margin: '0 10px 10px 0', verticalAlign: 'middle'}}
          >
            添加
          </Button>

          {/* 导出 */}
          <Dropdown overlay={exportMenu} placement="bottomLeft" >
            <Button style={{ margin: '0 10px 10px 0', verticalAlign: 'middle'}}>
              导出<DownOutlined />
            </Button>
          </Dropdown>

          {/* 删除 */}
          <Dropdown overlay={deleteMenu} placement="bottomLeft" >
            <Button style={{ margin: '0 10px 10px 0', verticalAlign: 'middle'}}>
              删除<DownOutlined />
            </Button>
          </Dropdown>

        </div>

      </div>
    )
  }

}

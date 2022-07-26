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
import {Button,Dropdown,Menu,message,Modal} from 'antd'
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



@inject('MaintenanceStore')
@inject('HomeStore')
@observer
class DataList extends Component {

  constructor(props) {
    super(props);
    this.store = this.props.MaintenanceStore;    
  }

  render() {
  
    return (
      <div className='container'>
        {/* 1.顶部操作栏 */}
        <div className='search_bar'>

          {/* 添加 */}
          <Button type="primary" icon={<PlusOutlined />}
            style={{ margin: '0 10px 10px 0', padding:'0 20px', verticalAlign: 'middle'}}
            onClick={() => {
              this.store.setDataPageModalVis(true);
            }}
          >
            添加
          </Button>

          {/* 导出 */}
          <Dropdown overlay={this.exportMenu} placement="bottomLeft" >
            <Button icon={<UploadOutlined />} style={{border:'none', margin: '0 10px 10px 0', verticalAlign: 'middle'}}>
              导出<DownOutlined />
            </Button>
          </Dropdown>

          {/* 删除 */}
          <Dropdown overlay={this.deleteMenu} placement="bottomLeft" >
            <Button icon={<DeleteOutlined />} style={{border:'none', margin: '0 850px 10px 0', verticalAlign: 'middle'}}>
              删除<DownOutlined />
            </Button>
          </Dropdown>

          {/* 筛选条件 */}
          <Button icon={<FilterOutlined />} style={{border:'none',margin: '0 10px 10px 0', verticalAlign: 'middle'}}>
            筛选条件
          </Button>

          {/* 排序 */}
          <Button icon={<SortDescendingOutlined />} style={{border:'none', margin: '0 10px 10px 0', verticalAlign: 'middle'}}/>

          {/* 显示字段 */}
          <Button icon={<EyeOutlined />} style={{border:'none', margin: '0 10px 10px 0', verticalAlign: 'middle'}}/>
          
          <span style={{verticalAlign: 'middle',color:'#c2c2c2'}}>|</span>&nbsp;

          {/* 全屏 */}
          <Button icon={<FullscreenOutlined />} style={{border:'none', margin: '0 10px 10px 10px', verticalAlign: 'middle'}}/>

        </div>

        {/* 2.表格 */}
        <DataTable/>

        {/* 3.对话框 */}
        {
          this.store.dataPageModalVis && <DataModal visible={this.store.dataPageModalVis} />
        }

      </div>
    )
  }


  /* 导出菜单点击事件 */
  handleExportMenuClick = (e)=>{
    this.downLoad()
  }

  /* 删除菜单点击事件 */
  handleDeletMenuClick = (e)=>{
    if(e.key === "1")
      this.onDelete(this.store.selectedIdsList,1);
    else
      this.onDelete(this.store.allSelectedIdsList,2);
  }

  /* "导出"下拉框菜单 */
  exportMenu = (
    <Menu onClick={this.handleExportMenuClick}>
      <Menu.Item key="1">
        筛选后的数据
      </Menu.Item>
      <Menu.Item key="2">
        全部数据
      </Menu.Item>
    </Menu>
  ); 

  /* "删除"下拉框菜单 */
  deleteMenu = (
    <Menu onClick={this.handleDeletMenuClick}>
      <Menu.Item key="1">
        筛选后的数据
      </Menu.Item>
      <Menu.Item key="2">
        全部数据
      </Menu.Item>
    </Menu>
  ); 

  /* 删除方法 */
  onDelete = (selectedIdsList,type)=>{
    if(type === 1){
      if (selectedIdsList.length>0) {
          Modal.confirm({
              title:'筛选删除',
              content:'确定要删除选中的记录？',
              okText:'确定',
              cancelText:'取消',
              onOk:()=>{
                  this.store.deleteDataPage({
                      ids:selectedIdsList
                  });

                  // 删除->数据库恢复->翻页->原来选中删除的标记不出现
                  this.store.selectedIdsList=[];
              }
          })
      }
      else {
          Modal.warning({
              title: '筛选删除',
              content: '请选择需要删除的记录！',
            });
      }
    }
    else{
      Modal.confirm({
        title:'全部删除',
        content:'确定要删除所有的记录？',
        okText:'确定',
        cancelText:'取消',
        onOk:()=>{
            this.store.deleteDataPage({
                ids:selectedIdsList
            });
        }
      })
    }
  };

  /* 导出 */
  downLoad =() => {
    fetch(`//${window.location.host}/iiot/maintenance/data/export`, {
        headers:{
            Authorization:sessionStorage.getItem('token') || null
          }
    }).then(res => res.blob().then(blob => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(new Blob([blob], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));   // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
        a.href = url;
        a.download = "维护保养";  //定义导出的文件名
        a.click();
        window.URL.revokeObjectURL(url);
    })).catch(err => message.error("导出失败！"))
}
}

export default DataList;

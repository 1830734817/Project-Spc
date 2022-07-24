import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Button,Dropdown,Menu} from 'antd'
import { 
  DownOutlined,
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import './index.less';
import TableContent from './TableContent';

const { SubMenu } = Menu;


@inject('SpcStore')
@observer
class TableList extends Component {
  render() {

    //设置选中item的对应表格的uuid
    this.props.SpcStore.setCurrentUuid(this.props.uuid);

    return (
      <div className='container'>
        {/* 1.顶部操作栏 */}
        <div className='search_bar'>

          {/* 添加 */}
          <Button type="primary" icon={<PlusOutlined />}
            style={{ margin: '0 10px 10px 0', padding:'0 20px', verticalAlign: 'middle'}}
            onClick={() => {
              
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
            <Button icon={<DeleteOutlined />} style={{border:'none', margin: '0 520px 10px 0', verticalAlign: 'middle'}}>
              删除<DownOutlined />
            </Button>
          </Dropdown>

          {/* 基础设置 */}
          <Dropdown overlay={this.settingsMenu} placement="bottomRight" >
            <Button type="primary" style={{border:'none', margin: '0 10px 10px 0', verticalAlign: 'middle'}}>
              基础设置<DownOutlined />
            </Button>
          </Dropdown>

          {/* 数据操作 */}
          <Dropdown overlay={this.operationsMenu} placement="bottomRight" >
            <Button type="primary"  style={{border:'none', margin: '0 10px 10px 0', verticalAlign: 'middle'}}>
              数据操作<DownOutlined />
            </Button>
          </Dropdown>

          {/* 统计图表 */}
          <Dropdown overlay={this.chartsMenu} placement="bottomRight" >
            <Button type="primary" style={{border:'none', margin: '0 10px 10px 0', verticalAlign: 'middle'}}>
              统计图表<DownOutlined />
            </Button>
          </Dropdown>
          
        </div>

        {/* 2.表格 */}
        <TableContent/>

        {/* 3.对话框 */}
        {
          
        }

      </div>
    )
  }

    /* "导出"下拉框菜单 */
    exportMenu = (
      <Menu >
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

    /* "基础设置"下拉框菜单 */
    settingsMenu = (
      <Menu mode="vertical">
        <SubMenu key="1" title="基本资料">
          <Menu.Item key="11">
            层次类型定义
          </Menu.Item>
          
          <Menu.Item key="12">
            检测项目定义
          </Menu.Item>
        </SubMenu>

        <SubMenu key="2" title="缺陷资料">
          <Menu.Item key="21">
            不良定义
          </Menu.Item>
          
          <Menu.Item key="22">
            不良分组
          </Menu.Item>
        </SubMenu>
        
        <SubMenu key="3" title="串口相关">
          <Menu.Item key="31">
            COM端口设置
          </Menu.Item>
        </SubMenu>
        
        <SubMenu key="4" title="图表设置">
          <Menu.Item key="41">
            控制图设置
          </Menu.Item>
          
          <Menu.Item key="42">
            批量控制图设置
          </Menu.Item>
        </SubMenu>
      </Menu>
    ); 

    /* "数据操作"下拉框菜单 */
    operationsMenu = (
      <Menu mode="vertical">
        <SubMenu key="1" title="控制组">
          <Menu.Item key="11">
            刷新列表
          </Menu.Item>
        </SubMenu>

        <SubMenu key="2" title="控制图">
          <Menu.Item key="21">
            单项目输入
          </Menu.Item>
          
          <Menu.Item key="22">
            多项目输入
          </Menu.Item>
                    
          <Menu.Item key="23">
            添加到选中栏
          </Menu.Item>
                    
          <Menu.Item key="24">
            失控处理审核
          </Menu.Item>
                    
          <Menu.Item key="25">
            图列表过滤器
          </Menu.Item>
        </SubMenu>
      </Menu>
    )

    /* "统计图表"下拉框菜单 */
    chartsMenu = (
      <Menu mode="vertical">
        <SubMenu key="1" title="单图查看">
          <Menu.Item key="11">
            查看控制图
          </Menu.Item>

          <Menu.Item key="12">
            CPK分析图
          </Menu.Item>
          
          <Menu.Item key="13">
            柏拉图
          </Menu.Item>
                    
          <Menu.Item key="14">
            样本运行图
          </Menu.Item>
                    
          <Menu.Item key="15">
            均值运行图
          </Menu.Item>
                    
          <Menu.Item key="16">
            正态检验
          </Menu.Item>
                              
          <Menu.Item key="17">
            CPK趋势图
          </Menu.Item>
                                        
          <Menu.Item key="18">
            合格率趋势图
          </Menu.Item>
                                                  
          <Menu.Item key="19">
            六图模式
          </Menu.Item>
        </SubMenu>

        <SubMenu key="2" title="多图查看">
          <Menu.Item key="21">
            查看比较
          </Menu.Item>

          <Menu.Item key="22">
            实时监控
          </Menu.Item>

          <Menu.Item key="23">
            合并查看
          </Menu.Item>

          <Menu.Item key="24">
            多参数对比图
          </Menu.Item>

          <Menu.Item key="25">
            相关性分析图
          </Menu.Item>
          
          <Menu.Item key="26">
            箱线图
          </Menu.Item>
        </SubMenu>
        <SubMenu key='3' title='属性'>
          <Menu.Item key='31'>
            控制图属性
          </Menu.Item>
        </SubMenu>
      </Menu>
    )

}

export default TableList;

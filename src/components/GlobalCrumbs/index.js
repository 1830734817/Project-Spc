/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:02:56
 * @LastEditors: shoen
 * @LastEditTime: 2020-12-19 00:55:44
 */
/** 
 * @author zyn on 0516 
 * @description 全局crumbs设置
 * @param {Array} dataSource - 面包屑的数据源数组
 * @param {String} mobile - 判断是否是移动端
 */

import React,{Component} from 'react';
import { Breadcrumb } from 'antd';
import './index.less';
const BreadcrumbItem = Breadcrumb.Item;

class GlobalCrumbs extends Component{
  render(){
    const { dataSource, mobile } = this.props;
    const isShow = mobile === 'true' ? false : true;

    return isShow && 
      <Breadcrumb className='crumb_layout'>
        {/* 首页 */}
        <BreadcrumbItem>
          <a style={{color:'var(--PC)',cursor:'pointer'}} 
             href={`//${window.location.host}`}>
              首页
          </a>
        </BreadcrumbItem>

        {/* 当前菜单路径 */}
        {
          dataSource && dataSource.map(crumb=>{
            return (
              <BreadcrumbItem key={crumb.id}>
                <a>{crumb.name}</a>
              </BreadcrumbItem>
            )
          })
        }
      </Breadcrumb>
  }
}

export default GlobalCrumbs;
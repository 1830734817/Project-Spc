import React,{PureComponent} from 'react';
import { Table } from 'antd';
import { omit,isEmpty } from 'lodash';

export default class TableLayout extends PureComponent {
  render(){
    const { pagination,loading,isLoading,...otherProps} = this.props;
    return <Table
      // 表格大小
      size='middle'

      // rowKey & loading & dataSource & columns
      {...otherProps}

      // 默认文案设置
      locale = {{
        emptyText: '暂无数据'
      }}

      // 页面是否加载中
      loading={loading || isLoading}

      // 分页器
      pagination={
        !isEmpty(pagination) ? 
          pagination.total > 10 && {
            ...omit(pagination,'pageIndex'),               // pageSize: 每页条数 & onChange: 分页、排序、筛选变化时触发; omit排除pagination中pageIndex，剩下pageSize
                                                           // onChange: this.onPageChange                                                       
            current:pagination.pageIndex,                  // current：当前页数
            showTotal:(total,range)=>{                     // showTotal：用于显示数据总量和当前数据顺序
              return <div style={{lineHeight:'26px'}}>
                总共{total}条，每页10条
              </div>
            }
          }
        : false
      }
      
    />
  }
}

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import TableList from './TableList'

@inject('HomeStore')
@observer
class SpcTable extends Component {
  
  render() {
    //获取侧边菜单选中item的uuid和当前路径
    const currentUuid = this.props.HomeStore.currentUuid;
    const currentPath = this.props.HomeStore.currentPath;
    return (
      <TableList uuid={currentUuid} path={currentPath}/>
    )
  }
}

export default SpcTable;
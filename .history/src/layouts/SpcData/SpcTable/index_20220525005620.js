import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import TableList from './TableList'

@inject('HomeStore')
@observer
class SpcTable extends Component {
  
  render() {
    //获取侧边菜单选中item的uuid
    const currentUuid = this.props.HomeStore.currentUuid;
    return (
      <TableList uuid={currentUuid}/>
    )
  }
}

export default SpcTable;
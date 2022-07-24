import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import TableList from './TableList'

@inject('HomeStore')
@observer
class SpcTable extends Component {
  
  render() {
    const currentUuid = this.props.HomeStore.currentUuid;
    return (
      <TableList uuid={currentUuid}/>
    )
  }
}

export default SpcTable;
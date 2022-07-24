import React, { Component } from 'react'
import TableList from './TableList'

class SpcTable extends Component {
  render() {
    console.log(this.props.uuid);
    return (
      <TableList/>
    )
  }
}

export default SpcTable;
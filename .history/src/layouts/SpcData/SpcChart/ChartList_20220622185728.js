import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';

@inject('SpcStore')
@observer
class ChartList extends Component {
  render() {
    return (
      <div>ChartList</div>
    )
  }
}

export default ChartList;

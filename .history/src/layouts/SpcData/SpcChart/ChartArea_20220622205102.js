import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';

@inject('SpcStore')
@observer
class ChartArea extends Component {
  render() {
    return (
      <div>ChartArea</div>
    )
  }
}

export default ChartArea;

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';

@inject('SpcStore')
@observer
export default class ChartArea extends Component {
  render() {
    return (
      <div>ChartArea</div>
    )
  }
}

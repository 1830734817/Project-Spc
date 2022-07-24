import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';

@inject('SpcStore')
@observer
class ChartArea extends Component {
  render() {
    return (
      <React.Fragment>
        {/* todo，图表放在tab里 */}
      </React.Fragment>
    )
  }
}

export default ChartArea;

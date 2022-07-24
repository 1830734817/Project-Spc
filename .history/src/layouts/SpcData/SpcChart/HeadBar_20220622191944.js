import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';

@inject('SpcStore')
@observer
class HeadBar extends Component {
  render() {
    return (
      <div>HeadBar</div>
    )
  }
}

export default HeadBar;
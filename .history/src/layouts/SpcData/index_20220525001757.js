import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@withRouter
@inject('HomeStore')
@observer
class SpcData extends Component {
  render() {
    return (
      this.props.children
    )
  }
}

export default SpcData

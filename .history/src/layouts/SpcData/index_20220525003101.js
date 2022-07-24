import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

@withRouter
@inject('SpcStore')
@observer
class SpcData extends Component {
  constructor(props) {
		super(props);
    
    this.props.SpcStore.getSpcTableList().then(() => {
      // console.log(toJS(this.props.SpcStore.spcTableList));
    })
  }

  render() {
    return (
      this.props.children
    )
  }
}

export default SpcData

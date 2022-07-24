import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

@inject('HomeStore')
@inject('SpcStore')
@observer
class SpcData extends Component {
  constructor(props) {
		super(props);
    //获取所有spc表格数据
    this.props.SpcStore.getSpcTableList().then(() => {
      // console.log(toJS(this.props.SpcStore.spcTableList));
      //第一次加载时获取对应表格数据
      this.props.SpcStore.getSpcTableContent(this.props.HomeStore.currentUuid);
    })
  }

  render() {
    return (
      this.props.children
    )
  }
}

export default SpcData

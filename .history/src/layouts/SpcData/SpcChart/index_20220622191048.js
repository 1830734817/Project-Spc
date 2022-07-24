import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import {Button} from 'antd';
import ChartList from './ChartList';

class SpcChart extends Component {
  render() {
    return (
      <React.Fragment>
        {/* 返回按钮测试 */}
        {/* <Button onClick={()=>{
					this.props.history.goBack();//返回表格页面
        }}>
          返回
        </Button> */}
        <ChartList/>
      </React.Fragment>
    )
  }
}

export default SpcChart;

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import {Button} from 'antd';

class SpcChart extends Component {
  render() {
    return (
      <div>
        {/* 返回按钮测试 */}
        <Button>
          返回
        </Button>
      </div>
    )
  }
}

export default SpcChart;
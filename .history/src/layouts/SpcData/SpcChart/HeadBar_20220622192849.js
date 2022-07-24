import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Button,

} from 'antd';
import {LeftOutlined} from '@ant-design/icons';

@inject('SpcStore')
@observer
class HeadBar extends Component {
  render() {
    return (
      <React.Fragment>
         {/* 返回按钮 */}
        <Button icon={<LeftOutlined />} size="small"
                onClick={()=>{
                  this.props.history.goBack();
                }}
        >
          返回
        </Button>
        
      </React.Fragment>
    )
  }
}

export default HeadBar;
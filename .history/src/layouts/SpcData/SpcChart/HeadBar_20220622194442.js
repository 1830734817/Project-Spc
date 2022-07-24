import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Button,
          Select,
          DatePicker, 
          TimePicker
} from 'antd';
import {LeftOutlined} from '@ant-design/icons';

@withRouter
@inject('SpcStore')
@observer
class HeadBar extends Component {
  render() {
    return (
      <React.Fragment>
         {/* 返回按钮 */}
        <Button icon={<LeftOutlined />} size="small" type='primary'
                onClick={()=>{
                  this.props.history.goBack();
                }}
        >
          返回
        </Button>
        {/* 时间筛选 */}
        <p>显示范围</p>
        <Select size='small'>
          <Option>录入时间</Option>
          <Option>抽检时间</Option>
        </Select>
        <p>从</p>
        <DatePicker size='small'/>
        <TimePicker size='small' defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
        <p>到</p>
        <DatePicker size='small'/>
        <TimePicker size='small' defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
        <Button size='small'>确认</Button>

      </React.Fragment>
    )
  }
}

export default HeadBar;
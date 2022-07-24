import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Button,
          Select,
          DatePicker, 
          TimePicker
} from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import moment from 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Option } = Select;

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
                style={{marginLeft:'20px'}}
        >
          返回
        </Button>
        {/* 时间筛选 */}
        <span>显示范围:</span>
        <Select size='small' defaultValue="录入时间">
          <Option value="录入时间">录入时间</Option>
          <Option value="抽检时间">抽检时间</Option>
        </Select>
        <span>从</span>
        <DatePicker size='small' locale={locale}/>
        <TimePicker size='small' locale={locale} defaultValue={moment('00:00:00', 'HH:mm:ss')} />
        <span>到</span>
        <DatePicker size='small' locale={locale}/>
        <TimePicker size='small' locale={locale} defaultValue={moment('00:00:00', 'HH:mm:ss')} />
        <Button size='small'
                style={{marginLeft:'20px'}}
        >
          确认
        </Button>

      </React.Fragment>
    )
  }
}

export default HeadBar;
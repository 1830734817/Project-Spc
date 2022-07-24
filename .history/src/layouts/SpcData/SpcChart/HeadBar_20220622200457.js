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
                style={{marginRight:'20px'}}
        >
          返回
        </Button>
        {/* 操作按钮 */}
        <Button size='small'
                style={{marginLeft:'200x'}}
        >
          分类汇总
        </Button>
        <Button size='small'
                style={{marginLeft:'200x'}}
        >
          属性
        </Button>
        <Button size='small'
                style={{marginLeft:'20x'}}
        >
          过滤
        </Button>
        <Button size='small'
                style={{marginLeft:'20x'}}
        >
          设置
        </Button>
        <Button size='small'
                style={{marginLeft:'20x'}}
        >
          导出
        </Button>

        <br/>

        {/* 时间筛选 */}
        <span>显示范围:</span>
        <Select size='small' defaultValue="录入时间">
          <Option value="录入时间">录入时间</Option>
          <Option value="抽检时间">抽检时间</Option>
        </Select>
        <span>从</span>
        <DatePicker size='small' locale={locale}/>
        <TimePicker size='small' locale={locale}  />
        <span>到</span>
        <DatePicker size='small' locale={locale}/>
        <TimePicker size='small' locale={locale}  />
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
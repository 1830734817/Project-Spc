import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Button,
          Select,
          DatePicker, 
          TimePicker,
} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Option } = Select;

@inject('SpcStore')
@observer
class TableArea extends Component {
  render() {
    return (
      <React.Fragment>
          {/* 时间筛选 */}
        <div>
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
        </div>
          
      </React.Fragment>
    )
  }
}

export default TableArea;

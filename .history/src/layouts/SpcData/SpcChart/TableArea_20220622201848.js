import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Button,
          Select,
          DatePicker, 
          TimePicker,
          Space
} from 'antd';
import moment from 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Option } = Select;

class TableArea extends Component {
  render() {
    return (
      <div>TableArea</div>
    )
  }
}

export default TableArea;

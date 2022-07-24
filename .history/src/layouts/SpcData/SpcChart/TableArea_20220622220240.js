import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Button,
          Select,
          DatePicker, 
          TimePicker,
          Table,
} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Option } = Select;

const columns = [
  {
    title: '抽检时间',
    dataIndex: '抽检时间',
    key: '抽检时间'
  },
  {
    title: '录入时间',
    dataIndex: '录入时间',
    key: '录入时间',
  },
  {
    title: '批次',
    dataIndex: '批次',
    key: '批次',
  },
  {
    title: '抽检数',
    dataIndex: '抽检数',
    key: '抽检数',
  },
  {
    title: 'C1不良项',
    dataIndex: 'C1不良项',
    key: 'C1不良项',
  },
  {
    title: 'D1不良项',
    dataIndex: 'D1不良项',
    key: 'D1不良项',
  },
  {
    title: '状态',
    dataIndex: '状态',
    key: '状态',
  },
  {
    title: '良品率',
    dataIndex: '良品率',
    key: '良品率',
  },
  {
    title: '录入用户',
    dataIndex: '录入用户',
    key: '录入用户',
  },
];
const data = [
  {
    key:1,
    抽检时间: '2018-08-28 15:34:13',
    录入时间: '2018-08-28 15:34:13',
    批次:'',
    抽检数:7834,
    C1不良项:3,
    D1不良项:3,
    状态:'正常',
    良品率:99.2,
    录入用户:'13857107228'
  },
  {
    key:2,
    抽检时间: '2018-08-28 15:34:13',
    录入时间: '2018-08-28 15:34:13',
    批次:'',
    抽检数:7834,
    C1不良项:3,
    D1不良项:3,
    状态:'正常',
    良品率:99.2,
    录入用户:'13857107228'
  },
  {
    key:3,
    抽检时间: '2018-08-28 15:34:13',
    录入时间: '2018-08-28 15:34:13',
    批次:'',
    抽检数:7834,
    C1不良项:3,
    D1不良项:3,
    状态:'正常',
    良品率:99.2,
    录入用户:'13857107228'
  },
  {
    key:4,
    抽检时间: '2018-08-28 15:34:13',
    录入时间: '2018-08-28 15:34:13',
    批次:'',
    抽检数:7834,
    C1不良项:3,
    D1不良项:3,
    状态:'正常',
    良品率:99.2,
    录入用户:'13857107228'
  },
  {
    key:5,
    抽检时间: '2018-08-28 15:34:13',
    录入时间: '2018-08-28 15:34:13',
    批次:'',
    抽检数:7834,
    C1不良项:3,
    D1不良项:3,
    状态:'正常',
    良品率:99.2,
    录入用户:'13857107228'
  },
  {
    key:6,
    抽检时间: '2018-08-28 15:34:13',
    录入时间: '2018-08-28 15:34:13',
    批次:'',
    抽检数:7834,
    C1不良项:3,
    D1不良项:3,
    状态:'正常',
    良品率:99.2,
    录入用户:'13857107228'
  },
  {
    key:7,
    抽检时间: '2018-08-28 15:34:13',
    录入时间: '2018-08-28 15:34:13',
    批次:'',
    抽检数:7834,
    C1不良项:3,
    D1不良项:3,
    状态:'正常',
    良品率:99.2,
    录入用户:'13857107228'
  },

];

@inject('SpcStore')
@observer
class TableArea extends Component {
  render() {
    return (
      <React.Fragment>
          {/* 时间筛选 */}
        <div style={{padding:'2px'}}>
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
        
        {/* 表格 */}
        <Table columns={columns} dataSource={data} pagination={false} style={{height:'95%',overflow: 'scroll'}}/>
          
      </React.Fragment>
    )
  }
}

export default TableArea;

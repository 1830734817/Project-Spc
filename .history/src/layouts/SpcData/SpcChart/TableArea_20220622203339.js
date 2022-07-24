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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

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
        
        {/* 表格 */}
        <Table columns={columns} dataSource={data} />
          
      </React.Fragment>
    )
  }
}

export default TableArea;

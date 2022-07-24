import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Button,
          Space
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
                style={{marginRight:'800px'}}
        >
          返回
        </Button>
        {/* 操作按钮 */}
        <Space>
          <Button size='small' 
          >
            分类汇总
          </Button>
          <Button size='small' 
          >
            属性
          </Button>
          <Button size='small' 
          >
            过滤
          </Button>
          <Button size='small' 
          >
            设置
          </Button>
          <Button size='small'
          >
            导出
          </Button>
        </Space>

      </React.Fragment>
    )
  }
}

export default HeadBar;
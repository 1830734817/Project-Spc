import './index.less';
import React from 'react';
import { Empty } from 'antd'

export default ({ isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="component-loading">
        <Empty description='页面加载中' />
      </div>
    )
  } 
  else if (error) {
    return (
      <div className="component-loading">
        <p className="wrong-msg">出错了，请刷新页面重试，或者确认地址是否正确</p>
      </div>
    )
  } 
  else {
    return null;
  }
};
import React,{Component} from 'react';
import {Spin,Tabs} from 'antd';
import List from './NoticeList.js';
const { TabPane } = Tabs;

export default class NoticePanel extends Component {
  render(){
    const { className, loading, } = this.props;
    const panes = ['提醒','通知','待办'].map(tab => {
      return (
        <TabPane tab={tab} key={tab}>
          <List />
        </TabPane>
      );
    });
    return <React.Fragment >
      <div className={className}>
        <Spin spinning={loading} delay={0}>
          <Tabs onChange={this.onTabChange}>
            {panes}
          </Tabs>
        </Spin>
      </div>
      
    </React.Fragment>;
  }
  onTabChange=(tabType)=>{
    console.log(tabType)
  }
}
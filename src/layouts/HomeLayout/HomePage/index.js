/**
 * 首页豆腐块配置 连接到主页面
 */
import React from 'react';
import './index.less';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Button } from 'components/BLComps'
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { withRouter } from 'react-router-dom';
import LineChart from './PieCharts'
import LineCharts from './LineCharts'
import AreaChart from './AreaChart'
import { TitleTags } from './methods'
@withRouter
@inject('HomeStore')
@observer
class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      lineData: [],
      areaData: [],
    };
    this.store = this.props.HomeStore
  }

  render() {
    const { isLoading, } = this.store;

    // 
    return (
      <div>home_page</div>
      // <div className='home_page'>
      //   {/* test btn */}
      //   <Spin spinning={isLoading}>
      //     <div className='soul_menu'>
      //       <Button type='primary' onClick={() => this.props.history.push('/plan')}><ArrowRightOutlined />进入系统</Button>
      //     </div>
      //     {this.store.AnalysisData.length > 0 && TitleTags({
      //       dataSource: toJS(this.store.AnalysisData)
      //     })}
      //     {this.store.AnalysisData.length > 0 && [<ul className='analysis_page'>
      //       <li>
      //         <h3>生产产量统计</h3>
      //         <AreaChart data={this.state.areaData} />
      //       </li>
      //       <li>
      //         <h3>每月发生异常项比例</h3>
      //         <LineChart data={this.state.lineData} />
      //       </li>
      //     </ul>,
      //     <div className='bottom'>
      //       <h3>每月设备运行信息</h3>
      //       <LineCharts />
      //     </div>]}
      //   </Spin>
      // </div>
    );
  }

  openMenu = (path) => {
    this.props.history.push(path);
  }
 
  onVisibleChange = () => {
    this.setState({
      isShow: !this.state.isShow
    });
  }

  resetPieData = () => {
    let data = []
    let list = ["缺料", "直流系统异常", "油压异常", "切割异常", "压铸异常", "清洗异常", "其他"]
    for (let i = 0; i < list.length; i++) {
      data.push({
        item: list[i],
        count: Math.round(Math.random() * 30),
      })
    }
    return data
  }

  resetData = (k1, k2, k3, value1, value2) => {
    let data = []
    for (let i = 0; i < 12; i++) {
      data.push({
        [k1]: value1,
        [k2]: `${i + 1}`,
        [k3]: Math.round(Math.random() * 30),
      })
      if (value2) {
        data.push({
          [k1]: value2,
          [k2]: `${i + 1}`,
          [k3]: Math.round(Math.random() * 30),
        })
      }
    }
    return data
  }
  
  componentDidMount() {
    const { pathname } = this.props.location;
    this.props.HomeStore.getMenuList({ pathname });
    this.store.getAllStaticCount().then(() => {
      let areaData = this.resetData('country', 'month', 'value', '生产产量')
      let lineData = this.resetPieData()
      this.setState({
        loading: false,
        lineData,
        areaData,
      })
    });
  }
}

export default HomePage;



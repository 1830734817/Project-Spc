/**
 * @description 甘特图组件
 * @author zyn on 0523
 * @param {Object} dataSource - 甘特图数据源  类似下面格式
 * {
      data: [
          { id: 1, equipName: '压铸机', capacity: 500, text:500,start_date:'2019-04-21',open:true },
          { id: 2, equipName: '压铸机02', capacity: 500, duration: 2,start_date:'2019-04-25',text:300, progress: 0.4 },
          { id:101, equipName:"压铸机 #1", capacity:200,text:200,process:0.5, start_date:"2019-04-21", duration:2,parent:1}
      ],
      links: [
          { id: 1, source: 1, target: 2, type: '0' }
      ]
    }
 * @param {String} className - 类名
 * @param {Array} dataSource - 数据源
 * @param {String} type - 类型 判断当前是联合排程还是标准排程
 * @param {String} status - 查看类型 通过判断当前的状态确定是否查看或者编辑
 * @param {Array} titleList - 基本信息的列表数据元 
 * @param {Object} Params - 基础参数{ 内置了当前页面是否需要返回的配置（goback\\back）, } 
 * @param {Func} onSubmit - 提交方法
 */

import React from 'react';
import { Button } from 'components/BLComps'
import { uniq } from 'lodash'
import Gantt from './GanttPro';
import GanttMulti from './GanttMulti'
import GanttTitle from './Titles'
import Toolbar from './Toolbar';

class GlobalGantt extends React.Component{
  state = {
    currentZoom:'Days',
    currentZoomZH:'天',
    mouldList:[]
  }
  render(){
    const { dataSource,params,titleList,type,...otherProps } = this.props;
    const { currentZoomZH,currentZoom } = this.state;
    const { back,goback,componentcode } = this.props.params
    return <div className='gantt-div' >
      <div className="zoom-bar">
        {back && <Button size='small' icon='rollback' onClick={goback} >返回</Button>}
        <Toolbar zoom={currentZoomZH} onZoomChange={this.handleZoomChange} /> 
      </div>
      {
        titleList && <div style={{marginBottom:20}}>
          <GanttTitle dataSource={titleList} />
        </div>
      }
      <div className='gantt-content'>
        {this.props.params.status === 'analysis' ? 
          <GanttMulti
            // tasks={data} 
            tasks={dataSource}
            zoom={currentZoom} 
            params = {params}
            {...otherProps} />
        : <Gantt
            type={type}
            scaleData={titleList}
            tasks={dataSource}
            zoom={currentZoom} 
            params = {params}
            goback={goback}
            {...otherProps} />}
          
      </div>
    </div>
  }
  handleZoomChange = (zoom) => {
    let current = '';
    switch(zoom){
      case '小时':current = 'Hours';
        break;
      case '天':current = 'Days';
        break;
      case '周':current = 'Weeks';
        break;
      default :current = 'Months';
        break;
    }
    this.setState({
      currentZoom: current,
      currentZoomZH:zoom
    });
  }
  componentDidMount(){
    let mouldList = []
    console.log('gantt didmount')
    for(let item of this.props.dataSource.data){
      if(item.needMould){
        mouldList.push(item.procedureName)
      }
    }
    mouldList = uniq(mouldList)
    this.setState({
      mouldList
    })
  }
}

export default GlobalGantt;
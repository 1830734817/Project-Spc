import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from 'bizcharts';

class AreaCharts extends React.Component {
  state = {
    data : []
  }
  render() {
    const cols = {
      year: {
        tickCount: 10, // 定义坐标轴刻度线的条数，默认为 5
        ticks: ['1', '2','3','4', '5','6', '7','8','9','10','11','12'], // 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
        type: 'linear',
        tickInterval: 6,
      },
    };
    return (
      <Chart height={200} data={this.props.data} scale={cols} forceFit padding='auto'>
        <Axis name="month" />
        <Axis name="value" />
        <Legend />
        <Tooltip />
        <Geom tooltip={false} type="areaStack" position="month*value" color={['country', ['l (90) 0:#32C5FF 1:#B6F3FF', 'l (90) 0:#44D7B6 1:#B9FFEF']]} />
        <Geom type="lineStack" position="month*value" size={2} color={['country', ['#32C5FF', '#44D7B6']]} />
      </Chart>
    );
  }
}
export default AreaCharts
import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from 'bizcharts';

class Series extends React.Component {
  state = {
    data:[]
  }
  render() {
    
    const cols = {
      month: {
        range: [0, 1],
      },
    };
    return (
      <div>
        <Chart height={290} data={this.state.data} scale={cols} forceFit>
          <Legend />
          <Axis name="month" />
          <Axis
            name="revenue"
            label={{
              formatter: val => `${val}`,
            }}
          />
          <Tooltip />
          <Geom  tooltip={false} type="line" position="month*revenue" size={2} color={['city',['#6236FF','#FF2A8E','#44D7B6','#32C5FF']]} />
          <Geom
            type="path"
            position="month*revenue"
            size={2}
            shape={'circle'}
            color={['city',['#6236FF','#FF2A8E','#44D7B6','#32C5FF']]}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
  componentDidMount(){
    let data = []
    for (let i = 1; i < 13; i++) {
      const element01 = {
        month: '设备'+i,
        city: '运行',
        revenue: Math.round(Math.random()*500),
      };
      const element02 = {
        month: '设备'+i,
        city: '告警',
        revenue: Math.round(Math.random()*500),
      };
      const element03 = {
        month: '设备'+i,
        city: '待机',
        revenue: Math.round(Math.random()*500),
      };
      const element04 = {
        month: '设备'+i,
        city: '停机',
        revenue: Math.round(Math.random()*500),
      };
      data.push(element01,element02,element03,element04)
    }
    this.setState({
      data
    })
  }
}

export default Series

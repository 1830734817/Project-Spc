import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
} from "bizcharts";
import DataSet from "@antv/data-set";

class Labelline extends React.Component {
  render() {
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(this.props.data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    return (
      <div>
        <Chart
          height={200}
          data={dv}
          scale={cols}
          padding={'auto'}
          forceFit

        >
          <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="intervalStack"
            position="percent"
            color={["item",['#6236FFb4','#6236FF','#4926C7','#0091FFb4','#0091FF','#FF2A8Eb4','#FF2A8E','#32C5FFb4','#32C5FF','#F7B500b4','#F7B500']]}
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = percent.toFixed(4) * 100 + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                let value = parseFloat(val.split('%')[0]).toFixed(2) + '%'
                return item.point.item + ": " + value;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}
export default Labelline

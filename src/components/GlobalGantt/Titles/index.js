import React from 'react'
import TableLayout from 'components/TableLayout'

export default function GanttTitle({
  dataSource
}){
  const columns = [
    { title:'生产计划号',dataIndex:'planNo', }, 
    { title:'物料名称',dataIndex:'materialName', }, 
    { title:'生产计划量',dataIndex:'planCount', }, 
    { title:'创建人',dataIndex:'creator', }, 
    { title:'创建时间',dataIndex:'createTime', }, 
  ]
  return (
    <TableLayout
      size='middle' 
      dataSource={dataSource}
      columns={columns}
    />
  );
}
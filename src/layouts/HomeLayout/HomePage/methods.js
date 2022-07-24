import React from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Row, Col, Card, Tag, Progress } from 'antd';
import { workStatus } from 'constants/status_constant'
import { isEmpty } from 'lodash'
export function TitleTags({
  dataSource
}){
  const planVars = dataSource.filter(item => item.type === 'planVars')[0].data;
  const workVars = dataSource.filter(item => item.type === 'workVars')[0].data;
  const execVars = dataSource.filter(item => item.type === 'execVars')[0].data;
  const factVars = dataSource.filter(item => item.type === 'factVars')[0].data;
  return (
    <Row className='title-tags-card' gutter={24}>
      <Col className='title-tags-col'>
        <Card title={
          <div className='title-tags-card-title'>
            <div>生产计划</div>
            <div ><Tag style={{border:'1px solid #6236FF',color:'#6236FF'}}>本月</Tag></div>
          </div>
        } bordered={false}>
            <div className="tag-detail">
              <div>{planVars.curNumber || 0}</div>
              <div>
                <span>计划生产量</span>
                <span style={{color:parseFloat(planVars.rate) > 0 ? '#32c5ff' : '#FF2A8E'}}>
                  {Math.abs(parseFloat(planVars.rate)).toFixed(2) + '%' || 0}
                  {planVars.rate && parseFloat(planVars.rate) > 0 ? <ArrowUpOutlined style={{color:'#32c5ff'}} /> : <ArrowDownOutlined style={{color:'#FF2A8E'}} />}
                </span>
              </div>
            </div>
        </Card>
      </Col>
      <Col className='title-tags-col'>
        <Card title={
          <div className='title-tags-card-title'>
            <div>工单数</div>
            <div><Tag style={{border:'1px solid #6236FF',color:'#6236FF'}}>本月</Tag></div>
          </div>
        } bordered={false}>
            <div className="tag-detail">
              <div>{workVars.curNumber || 0}</div>
              <div>
                <span>本月工单数</span>
                <span style={{color:parseFloat(workVars.rate) > 0 ? '#32c5ff' : '#FF2A8E'}}>
                  {Math.abs(parseFloat(workVars.rate)).toFixed(2) + '%' || 0}
                  {workVars.rate && parseFloat(workVars.rate) > 0 ? <ArrowUpOutlined style={{color:'#32c5ff'}} /> : <ArrowDownOutlined style={{color:'#FF2A8E'}} />}
                </span>
              </div>
            </div>
        </Card>

      </Col>
      <Col className='title-tags-col'>
        <Card title={
          <div className='title-tags-card-title'>
            <div>执行工单数</div>
            <div><Tag style={{border:'1px solid #6236FF',color:'#6236FF'}}>今天</Tag></div>
          </div>
        } bordered={false}>
            <div className="tag-detail">
              <div>{execVars.curNumber || 0}</div>
              <div>
                <span>今日执行工单数</span>
                <span style={{color:parseFloat(execVars.rate) > 0 ? '#32c5ff' : '#FF2A8E'}}>
                  {Math.abs(parseFloat(execVars.rate)).toFixed(2) + '%' || 0}
                  {execVars.rate && parseFloat(execVars.rate) > 0 ? <ArrowUpOutlined style={{color:'#32c5ff'}} /> : <ArrowDownOutlined style={{color:'#FF2A8E'}} />}
                </span>
              </div>
            </div>
        </Card>

      </Col>
      <Col className='title-tags-col'>
        <Card title={
          <div className='title-tags-card-title'>
            <div>实际产量</div>
            <div><Tag style={{border:'1px solid #6236FF',color:'#6236FF'}}>今天</Tag></div>
          </div>
        } bordered={false}>
            <div className="tag-detail">
              <div>{isEmpty(factVars) ? 0 : factVars.curNumber}</div>
              {!isEmpty(factVars) && <div>
                <span>产量</span>
                <span style={{color:parseFloat(factVars.rate) > 0 ? '#32c5ff' : '#FF2A8E'}}>
                  {Math.abs(parseFloat(factVars.rate)).toFixed(2) + '%' || 0}
                  {factVars.rate && parseFloat(factVars.rate) > 0 ? <ArrowUpOutlined style={{color:'#32c5ff'}} /> : <ArrowDownOutlined style={{color:'#FF2A8E'}} />}
                </span>
              </div>}
            </div>
        </Card>

      </Col>
    </Row>
  );
}
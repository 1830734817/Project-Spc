/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 18:31:33
 * @LastEditors: zhihao
 * @LastEditTime: 2022-04-19 10:32:11
 */

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form } from 'antd'
import './index.less'
import DeviceMessage from './DeviceMessage'
import PlanMessage from './PlanMessage'
import PlanModal from './PlanModal'

export default class PlanList extends Component {
  render() {
    return (
      <div className='container'>
        {/* 1.保养计划表单 */}
          <Form>

          </Form>
        {/* 2.对话框 */}
        {
          false&&<PlanModal/>
        }
      </div>
    )
  }
}

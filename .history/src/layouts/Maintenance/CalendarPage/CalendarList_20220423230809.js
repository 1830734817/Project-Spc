/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 18:31:33
 * @LastEditors: zhihao
 * @LastEditTime: 2022-04-19 10:32:11
 */

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import './index.less'
import CalendarContent from './CalendarContent';
import CalendarRecord from './CalendarRecord';

export default class CalendarList extends Component {
  render() {
    return (
      <div className='container'>
          {/* 1.标题 */}
          <div style={{fontWeight:'bold'}}>保养维护日历</div>
          
          <div>
            {/* 2.日历 */}
            <CalendarContent/>
            {/* 3.保养记录列表 */}
            <CalendarRecord/>
          </div>

      </div>
    )
  }
}

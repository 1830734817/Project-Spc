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
import { Tabs,Button } from 'antd';
import './index.less'

const { TabPane } = Tabs;

export default class ContentList extends Component {
  render() {
    return (
        <div className='container'>
            {/* 1.标签页 */}
                <Tabs style={{backgroundColor:'#000'}} onChange={callback} type="card">

                </Tabs>
            {/* 2 提交按钮*/}
                <Button type="primary" 
                        style={{ margin: '0 10px', padding:'0 20px', verticalAlign: 'middle'}}
                >   
                    提交
                </Button>

        </div>
    )
  }
}



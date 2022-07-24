/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:02:56
 * @LastEditors: shoen
 * @LastEditTime: 2020-12-19 23:34:50
 */
/**
 * @description 项目通用的无状态组件 可扩展
 */
import React from 'react';
import { orderStatus, planStatus,workStatus } from 'constants/status_constant';
import { Tag } from 'antd';


/**
 * @author zyn
 * @description 判断table中某状态前的小圆点
 * @param {Number} value 状态类型
 */
import './index.less';

/**
 * 
 * @param {*} value 
 * @param {*} type 
 * @param {*} data 
 */
export function circleStatus(value, type, data={}) {
	let isOrder = type === 'order'
	let isPlan = type === 'plan'
	let	isWork = type === 'work'
	let	isMaintain = type === 'maintain'

	let isGreen = isOrder ? value === 2: 
				  isPlan ? value === 1 : 
				  isWork ? value === 2 : 
				  isMaintain ? value ===1 : 
				  false
	let isRed = isOrder ? [1].includes(value) : 
				isPlan ? value === 2 : 
				isMaintain ? [2,3,4,5].includes(value) :
				false
	let isBlue = isOrder ? value === 6 : 
				 isWork ? value === 3 : 
				 false
	let isGray = isOrder ? value === 7 : 
				 isWork ? value === 0 : 
				 false
	let isYellow = isOrder ? value === 1 : 
				   isWork ? [1].includes(value) : 
				   false
	let isDeepGreen = isWork ? value === 4 : 
					  isOrder ? value === 4 : 
					  false
  
	return (
		<Tag color={
			 isGreen ? 'green' : 
			 isDeepGreen  ? 'cyan' : 
			 isBlue ? 'blue' :
			 isGray ? 'purple' : 
			 isRed ? 'magenta' : 
			 isYellow ? 'orange' : ''
		}>
			{isOrder ? orderStatus[value] : 
			 isPlan ? planStatus[value] : 
			 isMaintain ? data[value] : 
			 workStatus[value]}
		</Tag>
	);
}



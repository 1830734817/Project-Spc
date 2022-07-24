import React,{ useState } from 'react'
import classnames from 'classnames'
import './index.less'
import { omit } from 'lodash'
import { BLInput,BLButton, BLPagination, BLSelect, BLTabs , BLRadio, BLCheckbox, BLDatePicker 
} from './methods'

function setClassNames(classNames){
  let classes = {}
  classNames = classNames ? classNames.split(' ') : []
  classNames.map(element => {
    classes[element] = true
  })
  return classes
}

const Input = props=>{
  let { className, type, ...otherProps } = props
  let classes = setClassNames(className)
  type = type || ''
  const configs = {
    className:classnames({
      'input-bl':true,
      ...classes,
    }),
    ...omit(otherProps,'type'),
  }
  return type === 'search' ? <BLInput.Search {...configs}/> :
    type === 'group' ? <BLInput.Group {...configs} /> :
      type === 'textarea' ? <span className={classnames({
          'input-bl':true,
          'ant-input-affix-wrapper':true
        })}>
          <BLInput.TextArea {...configs} />
        </span> :
        type === 'password' ? <BLInput.Password {...configs} /> :
          <span className={
            classnames({
              'input-bl':true,
              'ant-input-affix-wrapper':true
            })
          }><BLInput {...configs} /></span>
}

const Button = props =>{
  let { className, type, ...otherProps } = props
  let classes = setClassNames(className)
  type = type || 'default'
  const configs = {
    className:classnames({
      'btn-common-bl':true,
      'btn-primary-bl' : type === 'primary',
      'btn-secondary-bl': type === 'secondary' && ['#6236FF','博拉紫'].includes(sessionStorage.getItem('ownTheme')),
      'btn-default-bl' : type === 'default' ,
      'btn-linear-bl' : type === 'linear' && ['#6236FF','博拉紫'].includes(sessionStorage.getItem('ownTheme')),
      'btn-link-bl' : type === 'link' ,
      ...classes,
    }),
    ...otherProps,
  }
  return <BLButton {...configs} />
}

const Pagination = props =>{
  let { className, ...otherProps } = props
  let classes = setClassNames(className)
  const configs = {
    className:classnames({
      'pagination-bl': sessionStorage.getItem('ownTheme') === '博拉紫',
      ...classes,
    }),
    size:'small',
    ...otherProps,
  }
  return <BLPagination {...configs} />
}

const Select = props => {
  let { className, type, dataSource,dropdownClassName,value,label, ...otherProps } = props
  let classes = setClassNames(className)
  let dropClasses = setClassNames(dropdownClassName)
  dataSource = dataSource || []
  type = type || 'default'
  // console.log(dataSource)
  const configs = {
    className:classnames({
      'select-bl': true,
      ...classes
    }),
    dropdownClassName:classnames({
      'select-dropdown-bl': true,
      ...dropClasses
    })
  }
  return <BLSelect
    defaultValue = {dataSource.length > 0 ? dataSource[0].value : undefined}
    {...configs}
    {...otherProps}
  >
    {
      dataSource.length > 0 && dataSource.map(ele=><BLSelect.Option value={ele[value] || ele.value} key={ele[value] || ele.value}>{ele[label] || ele.label}</BLSelect.Option>)
    }
  </BLSelect>;
}

const Tabs = props => {
  let { className, type, dataSource,onChange,tabBarExtraContent, ...otherProps } = props
  let classes = setClassNames(className)
  dataSource = dataSource || []
  type = type || 'line'
  let configs = {
    className:classnames({
      'tabs-card-bl': type === 'card',
      'tabs-wrapper-bl':type === 'wrapper',
      ...classes
    })
  }
  if(onChange){
    if(type === 'wrapper'){
      configs.onChange = e => onChange(e.target.value)
    }else{
      configs.onChange = onChange
    }
  }
  return type === 'wrapper' ? <BLRadio.Group
      defaultValue={ dataSource[0] ? dataSource[0].key : ''}
      {...configs}
      {...otherProps}
    >
      {
        dataSource.length > 0 && dataSource.map(wrap=><BLRadio.Button key={wrap.key} value={wrap.key}>{wrap.tab}</BLRadio.Button>)
      }
    </BLRadio.Group> :<BLTabs 
      type = {type}
      tabBarExtraContent={tabBarExtraContent}
      {...configs}
      {...otherProps}
    >
      {
        dataSource.length > 0 && dataSource.map(tab => <BLTabs.TabPane key={tab.key} tab={tab.tab}></BLTabs.TabPane>)
      }
    </BLTabs>
}

const Checkbox = BLCheckbox
const Radio = BLRadio

const DatePicker = (props)=>{
  let { className, type, dataSource, ...otherProps } = props
  let classes = setClassNames(className)
  dataSource = dataSource || []
  type = type || 'default'
  let configs = {
    className:classnames({
      'date-bl': true,
      ...classes
    })
  }
  return type === 'month' ? <BLDatePicker.MonthPicker locale={window.globalParams.locale} {...configs} {...otherProps}/> : 
   type === 'week' ? <BLDatePicker.WeekPicker locale={window.globalParams.locale} {...configs} {...otherProps}/> : 
    type === 'range' ? <BLDatePicker.RangePicker locale={window.globalParams.locale} {...configs} {...otherProps}/> : 
      <BLDatePicker locale={window.globalParams.locale} {...configs} {...otherProps}/>
}

export {
  Input,
  Button,
  Pagination,
  Select,
  Tabs,
  Radio,
  Checkbox,
  DatePicker
}

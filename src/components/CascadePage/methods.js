import React from 'react'
import { Input, Divider,Checkbox,Select,Button, Radio, TimePicker } from 'antd'
import { server_list  } from 'constants/status_constant'
import { isEmpty,omit } from 'lodash';
import moment from 'moment';

const { Option } = Select;

/* 设置配置库输入方案columns */
export function setServerColumns({
  handleEdit,handleDelete,contentLabel,
}){
  return [
    {
      title: contentLabel+'类型',
      dataIndex: 'contentType',
      key: 'contentType',
      render: value =>{
        let current = server_list.filter(item=>item.id === value)[0]
        return current ? current.name : '-'
      }
    },
    {
      title: contentLabel+ '内容',
      dataIndex: 'inspectContent',
      key: 'inspectContent'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '创建人',
      dataIndex: 'creater',
      key: 'creater'
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      align: 'right',
      render: value => {
        return (
          <span style={{ color: '#6236FF', cursor: 'pointer' }}>
            <span onClick={()=>handleEdit(value)}>编辑</span>
            <Divider type='vertical' />
            <span onClick={()=>handleDelete(value)}>
              删除
            </span>
          </span>
        );
      }
    }
  ];
}

/* 选择方案的列表title */
export function setSchemaColumns(
  {
    handleEdit,handleDelete,handleStatus
  }
){
  return [
    {
      title: '方案名称',
      dataIndex: 'planName',
      key: 'planName'
    },
    {
      title: '包含项',
      dataIndex: 'contentIds',
      key: 'contentIds',
      render: value => value ? value.split(',').length : '-'
    },
    {
      title: '方案状态',
      dataIndex: 'planStatus',
      key: 'planStatus',
      render: value => value === 1 ? '启用' : '禁用'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',render:(value)=>value || '-'
    },
    {
      title: '创建人',
      dataIndex: 'creater',
      key: 'creater',render:(value)=>value || '-'
    },
    
    {
      title: '备注信息',
      dataIndex: 'description',
      key: 'description',render:(value)=>value || '-'
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      align: 'right',
      render: (value,record) => {
        return (
          <span style={{ color: '#6236FF', cursor: 'pointer' }}>
            <span onClick={()=>handleEdit(value)}>编辑</span>
            <Divider type='vertical' />
            <span onClick={()=>handleStatus(record)}>
              {
                record.planStatus === 1 ? '禁用':'启用'
              }
            </span>
            <Divider type='vertical' />
            <span onClick={()=>handleDelete({type:'single', value})}>
              删除
            </span>
          </span>
        );
      }
    }
  ];
}
/* 选择不同的方案 form-columns */
export function setSchemaFormColumns({
  status,currentMain,maintainType,onTimeChange,checkTime
}){
  let columns = [
    {
      key: 'name',
      label: '方案名称',
      value: <Input placeholder='请输入' style={{ width: '330px' }} />,
      getFieldDecorator: {
        initialValue: status === 'edit' ? currentMain.name : undefined,
        rules: [
          {
            required: true,
            message: '请输入方案名称'
          }
        ]
      }
    },
  ]
  if([1,3].includes(maintainType)){
    columns.push({
      key: 'period',
      label: '周期（天）',
      value: <Input placeholder='请输入' style={{ width: '330px' }} />,
      getFieldDecorator: {
        initialValue: status === 'edit' ? currentMain.period : undefined,
        rules: [
          {
            required: true,
            message: '请输入周期'
          }
        ]
      }
    })
  }
  if(maintainType === 1){
    columns.push({
      key: 'checkTime',
      label: '点检时间点',
      value: <TimePicker onChange={onTimeChange} placeholder='选择时间' style={{ width: '330px' }} />,
      getFieldDecorator: {
        initialValue:moment(checkTime, 'HH:mm:ss'),
        rules: [
          {
            type:'object',
            required: true,
            message: '请选择点检时间点'
          }
        ]
      }
    })
  }
  columns.push({
    key: 'planStatus',
    label: '是否启用',
    value: <Radio.Group>
        <Radio value={1}>是</Radio>
        <Radio value={0}>否</Radio>
      </Radio.Group>,
    getFieldDecorator: {
      initialValue: status === 'edit' ? currentMain.planStatus : 0,
      rules: [
        {
          required: true,
          message: '请选择启用状态'
        }
      ]
    }
  })
  return columns.concat([
    {
      key: 'description',
      label: '备注信息',
      value: (
        <Input placeholder='请输入' style={{ width: '330px' }} />
      ),
      getFieldDecorator: {
        initialValue: status === 'edit' ? currentMain.description : undefined,
      }
    },
  ])
}

/* 设置方案中弹窗的table - columns */
export function setSchemaModalColumns({ 
  handleDetail,contentLabel,contentTypeLabel
}){
  return [
    {
      title: contentLabel,
      dataIndex: 'content',
      key: 'content',
      // width:20,
    },{
      title: contentTypeLabel,
      dataIndex: 'contentType',
      key: 'contentType',
      align:'center',
      render:(value)=>{
        return server_list.filter(item=>item.id === value)[0].name
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      align:'right',
      render:(value)=><span style={{color:'#6236FF',cursor:'pointer'}} onClick={()=>handleDetail(value)}>详情</span>
    },
  ]
}

/* 设置form-columns */
export function setFormColumns({
  contentLabel,status,currentMain,contentType,minValue,maxValue,isMust,
  handleType,onAddItem,onDelItem,handleDataValue,handleIsMust,
}){
  return [
    {
      key: 'content',
      label: contentLabel,
      value: <Input disabled={status === 'query'} placeholder={'请输入' + contentLabel}  style={{ width: '350px' }} />,
      getFieldDecorator: {
        initialValue: status !== 'add' ? currentMain.content : undefined,
        rules: [
          {
            required: true,
            message: '请输入'+ contentLabel
          }
        ]
      }
    },
    {
      key: 'contentType',
      label: '输入类型',
      value: (
        <Select showSearch optionFilterProp="children" allowClear disabled={status === 'query'} placeholder='请选择输入类型' style={{width:350}} onChange={handleType}>
          {server_list.map(item=><Option value={item.id} key={item.id}>{item.name}</Option>)}
        </Select>
      ),
      getFieldDecorator: {
        initialValue: status !== 'add' ? currentMain.contentType : undefined,
        rules: [
          {
            required: true,
            message: '请选择内容类型'
          }
        ]
      }
    },
    {
      key: 'must',
      label: '是否必填',
      value: (
        <Checkbox disabled={status === 'query'} style={{width:'350px'}} defaultChecked={status !== 'add' ? currentMain.must : false}>必填</Checkbox>
      ),
      getFieldDecorator: {
        // initialValue: status === 'edit' ? currentMain.must : false,
      }
    },
    {
      key: 'extendBtn',
      label: '配置内容',
      displayNone: !contentType || ![1,2,3,8,9].includes(contentType) ,
      value: (
        <div>
          { [2,3,8,9].includes(contentType) ? (
            [
              <Button type='primary' onClick={onAddItem} disabled={status === 'query'}>
                增加选项
              </Button>,
              <Button style={{ marginLeft: '5px' }} onClick={onDelItem} disabled={status === 'query'}>
                删除选项
              </Button>
            ]
          ) : contentType === 1 && (
            <div>
              <span>请输入数据区间值</span>
              <div>
                最小值：
                <Input
                  disabled={status === 'query'}
                  style={{ width: '200px' }}
                  value={minValue}
                  onChange={(e)=>handleDataValue('minValue',e)}
                />
              </div>
              <div>
                最大值：
                <Input
                  disabled={status === 'query'}
                  style={{ width: '200px' }}
                  value={maxValue}
                  onChange={(e)=>handleDataValue('maxValue',e)}
                />
              </div>
            </div>
          )}
        </div>
      )
    }
  ];
}

export function handleServerSubmit({
  values,extendFormColumns,status,currentMain,stateValue,maintainType
}){
  let params = {},result = { success:false,params:{},message:'请按照要求填写信息' };
  const { content,contentType,must, } = values;
  const { minValue,maxValue, } = stateValue;
  /* 数据第一层 */
  params = {
    maintainType,content,contentType,must,
    items:[]
  }
  if(status === 'edit'){
    params.id = currentMain.id
  }
  /*  数据第二层 存在级联第一层 */
  /* 判断输入类型 */
  if(contentType === 1){
    if(isEmpty(minValue) || isEmpty(maxValue)){
      result.success = false
      result.message = '数据区间项必填'
    }else{
      params.items.push({
        configDetailDO:{ content:minValue,sort:1 }
      },{
        configDetailDO:{ content:maxValue,sort:2 }
      })
      result.success = true
    }
  }else if([2,3,8,9].includes(contentType)){
    if(isEmpty(extendFormColumns)){
      result.success = false;
      result.message = '请添加选项';
    }else{
      extendFormColumns.map((ext,index)=>{
        let current = {
          configDetailDO:{
            content:ext.content,
            cascades:ext.cascades,
            configStands:ext.configStands,
            sort:index+1,
          },
          configVOs:[]
        };
        if(ext.cascades){
          for (const child of ext.children) {
            let childConfig = {
              ...omit(child,['id',]),
              cascades:ext.cascades,
              configStands:ext.configStands,
              items:[]
            }
            if(!child.contentType){
              result.success = false;
              result.message = '请选择子选项的输入类型'
              return result;
            }
            // debugger;
            if(child.contentType === 1){
              if(isEmpty(child.maxValue) || isEmpty(child.minValue)){
                result.success = false;
                result.message = '子选项的数据区间项必填'
              }else{
                childConfig.items.push({
                  configDetailDO:{content:child.minValue,sort:1}
                },{
                  configDetailDO:{content:child.maxValue,sort:2}
                })
                result.success = true
              }
            }else if([2,3,8,9].includes(child.contentType)){
              if(isEmpty(child.strValue)){
                result.success = false;
                result.message = '请添加子选项的选项数据'
              }else{
                for (let index = 0; index <child.strValue.length; index++) {
                  const str = child.strValue[index]
                  if(str.value){
                    result.success = true;
                    childConfig.items.push({
                      configDetailDO:{content:str.value,sort:index+1}
                    })
                  }else{
                    result.success = false;
                    result.message = '请添加子选项的选项数据'
                    return result;
                  }
                }
                
              }
            }
            current.configVOs.push(childConfig)
          }
        }else{
          if(ext.content){
            result.success = true
          }
        }
        params.items.push(current)
      })
    }
  }else{
    result.success = true;
  }
  result.params = params;
  return result
}
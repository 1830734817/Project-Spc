/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:03:18
 * @LastEditors: shoen
 * @LastEditTime: 2021-12-22 23:02:32
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import '@ant-design/compatible/assets/index.css';
import { Form, Input, Select, DatePicker, Spin, InputNumber, message,Tabs } from 'antd';
import './index.less';
import moment from 'moment'
import GlobalModal from 'components/MyGlobalModal';
import { isEmpty, debounce } from 'lodash';

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 12 },
};
const { Option } = Select;
const { TabPane } = Tabs;

@inject('MyOrderStore')
@observer
class OrderModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			editData: {},
			value: '',
			fetching: false,
			tabnumber:3,
			activeKey: "1",
		};
		this.store = this.props.MyOrderStore;
		this.fetchData = debounce(this.fetchData, 800);
	};

	formRef = React.createRef();

	render() {
		const { orderStatus, orderModalVis} = this.store;
		
		return (
			<GlobalModal
				title={orderStatus === 'add' ? '新增' : orderStatus === 'edit' ? '编辑' : ''}
				visible={orderModalVis}
				onCancel={() => this.store.showModal(false)}
				onOk={() => {
					return this.formRef.current.validateFields()
							   .then(values => {      
									this.onSubmit(values);
								})
								.catch(info => {
									// 表单域验证不通过时触发
									console.log('Validate Failed:', info);

									// // 样例代码：获得错误域，跳转到含错误域的Tab
									// if (info.errorFields[0].name=='code') {   // 获得错误域
									// 	console.log('CODE');
									// 	this.setState({activeKey:"3"});       // 跳转到含错误域的Tab
									// }
								})					
				}}
				okText={'提交'}
				children={
					this.renderModal(orderStatus)
				}
			/>
		);
	}

	// 模式对话框中的内容
	renderModal = (status) => {
		const { modalLoading, orderCurrentRe,itemCodeList} = this.store;
		
		return orderCurrentRe &&
			<Form ref={this.formRef} name="form_in_modal"> 
				<Tabs activeKey={this.state.activeKey} 
				      onChange={this.onChange}>
					{/* (1) 基本 */} 
					<TabPane tab="基本" key="1">
						<Spin spinning={modalLoading}>
							{/* (10.1) 代码 */}
							<Form.Item name="code"
								label="代码"
								{...formItemLayout}
								initialValue={orderCurrentRe.code || undefined}
								rules={[{ required: true, message: '代码' }]}
								>
									<Input placeholder="填写代码"
										style={{ width: 250 }} 
									/>
							</Form.Item>

							{/* (1.1) 订单种类 */}
							<Form.Item name="type"
									label="订单种类"
									{...formItemLayout}
									initialValue={orderCurrentRe.type || undefined }
									rules={[{ required: false, message: '请输入订单种类' }]}
							>
								<Select defaultValue={this.store.type[orderCurrentRe.type]} style={{ width: 250 }}>
									{
										this.store.type.map((item,index,arr)=><Option value={index}>{item}</Option>)
									}
								</Select>
							</Form.Item>
							
							{/* (1.2) 订单区分 */}
							<Form.Item name="isReplenishmentOrder"
									label="订单区分"
									{...formItemLayout}
									initialValue={orderCurrentRe.isReplenishmentOrder || undefined}
									rules={[{ required: false, message: '请输入订单区分' }]}
							>
								<Select defaultValue={this.store.isReplenishmentOrder[orderCurrentRe.isReplenishmentOrder]} style={{ width: 250 }}>
									{
										this.store.isReplenishmentOrder.map((item,index,arr)=><Option value={index}>{item}</Option>)
									}
								</Select>
							</Form.Item>

							{/* (1.3) 物料 */}
							{/*  */}
							<Form.Item name="itemId"
								   label="物料"
								   {...formItemLayout}
								   initialValue= {itemCodeList.findIndex(value => {
									                                    	return value.id === orderCurrentRe.itemId
																		}) > -1 ? 
																		orderCurrentRe.item : undefined }
							       rules={[{ required: true, message: '请选择物料号' }]}
						>
								<Select showSearch 
										optionFilterProp="children"
										// disabled={itemCodeList.findIndex(value => {
										// 								  return value.id === orderCurrentRe.itemId
										// 							    }) > -1}
										allowClear
										value={this.state.value}
										placeholder="选择物料"
										notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
										filterOption={false}
										onSearch={this.fetchData}          // 文本框值变化时回调
										onChange={this.handleChange}       // 选中 option，或 input 的 value 变化时，调用此函数
										style={{ width: 250 }}
								>
									{
										!isEmpty(itemCodeList) && 
										         itemCodeList.map(bom => {
													return <Option value={bom.id}>
															{bom.code}
														</Option>
												})
									}
								</Select>
						</Form.Item>

							{/* (1.7) 交货期 */}
							<Form.Item name="let"
									label="交货期"
									{...formItemLayout}
									initialValue={orderCurrentRe.let || undefined}
									rules={[
									   {
										   required: true, 
										   message: '请输入交货期',
									   },
									   {
										   validator: this.letValidator
									   }
									]}
							>
								<Input placeholder="填写交货期"
									style={{ width: 250 }} 
								/>
							</Form.Item>

							{/* (1.11) 订单数量 */}
							<Form.Item name="qty"
									label="订单数量"
									{...formItemLayout}
									initialValue={orderCurrentRe.qty || undefined}
									rules={[
										{
											required: true, 
											message: '0～100,000',
										},
										{
											validator: this.qtyValidator
										}
									 ]}
							>
								<Input placeholder="填写订单数量"
									style={{ width: 250 }} 
								/>
							</Form.Item>

							{/* (1.15) 优先度 */}
							<Form.Item name="priority"
									label="优先度"
									{...formItemLayout}
									initialValue={orderCurrentRe.priority-80 || undefined}
									rules={[
										{
											required: false, 
											message: '0～1,000',
										},
										{
											validator: this.priorityValidator
										}
									 ]}
							>
								<Input placeholder="填写优先度"
									style={{ width: 250 }} 
								/>
							</Form.Item>
						</Spin>
					</TabPane>

                    {/* (2) 规格 */}
					{/* <TabPane tab="规格" key="2">
					</TabPane> */}

                    {/* (3) 设置 */}
					<TabPane tab="设置" key="3">
						{/* (3.1) 分派方向 */}
						<Form.Item name="assignmentDirection"
								label="分派方向"
								{...formItemLayout}
								initialValue={orderCurrentRe.assignmentDirection || undefined}
								// rules={[{ required: false, message: '请输入分派方向' }]}
								// disabled="true"
						>
							<Select defaultValue={this.store.assignmentDirection[orderCurrentRe.assignmentDirection]} 
									style={{ width: 250 }} 
									disabled="true">
								{
									this.store.assignmentDirection.map((item,index,arr)=><Option value={index}>{item}</Option>)
								}
							</Select>
						</Form.Item>

						{/* (3.4) 非分派对象标志 */}
						<Form.Item name="disabled"
								label="非分派对象标志"
								{...formItemLayout}
								initialValue={orderCurrentRe.disabled || undefined}
								rules={[{ required: false, message: '请输入分派方向' }]}
						>
							<Select defaultValue={this.store.disabled[orderCurrentRe.disabled]} 
							        style={{ width: 250 }}>
								{
									this.store.disabled.map((item,index,arr)=><Option value={index}>{item}</Option>)
								}
							</Select>
						</Form.Item>
					</TabPane>

                    {/* (4) 分派 */}
					<TabPane tab="分派" key="4">
						{/* (4.1) 分派标志 */}
						<Form.Item name="isAllOperationsAssigned"
								label="分派标志"
								{...formItemLayout}
								initialValue={orderCurrentRe.isAllOperationsAssigned || undefined}
								rules={[{ required: false, message: '请输入分派标志' }]}
								// disabled="true"
						>
							<Select defaultValue={this.store.isAllOperationsAssigned[orderCurrentRe.isAllOperationsAssigned]} style={{ width: 250 }}>
								{
									this.store.isAllOperationsAssigned.map((item,index,arr)=><Option value={index}>{item}</Option>)
								}
							</Select>
						</Form.Item>
					</TabPane>

					{/* (5) 实绩 */}
					<TabPane tab="实绩" key="5">
					{/* 订单状态 */}
						<Form.Item name="status"
								label="订单状态"
								{...formItemLayout}
								initialValue={orderCurrentRe.status || undefined}
								rules={[{ required: false, message: '请输入订单状态' }]}
							>
							<Select defaultValue={this.store.status[orderCurrentRe.status]} 
							        style={{ width: 250 }}
									disabled="true">
								{
									this.store.status.map((item,index,arr)=><Option value={index}>{item}</Option>)
								}
							</Select>
						</Form.Item>
					</TabPane>

					{/* (6) 评估 */}
					{/* <TabPane tab="评估" key="6">
					</TabPane> */}

					{/* (7) KPI */}
					{/* <TabPane tab="KPI" key="7">
					</TabPane> */}

					{/* (8) 链接 */}
					{/* <TabPane tab="链接" key="8">
					</TabPane> */}

					{/* (9) 权限 */}
					{/* <TabPane tab="权限" key="9">
					</TabPane> */}

					{/* (10) 共同 */}
					{/* <TabPane tab="共同" key="10">
					{/* (10.1) 代码
						<Form.Item name="code"
							label="代码"
							{...formItemLayout}
							initialValue={orderCurrentRe.code || undefined}
							rules={[{ required: true, message: '代码' }]}
							>
								<Input placeholder="填写代码"
									style={{ width: 250 }} 
								/>
						</Form.Item>
					</TabPane> */}

					{/* (11) 内部 */}
					{/* <TabPane tab="内部" key="11">
					</TabPane> */}

					{/* (12) 全部属性 */}
					{/* <TabPane tab="全部属性" key="12">
					</TabPane> */}
				</Tabs>
			</Form>
	}

	/**
	 * 编辑 & 新增
	 */
	onSubmit = (values) => {
		if (this.store.orderStatus === 'edit' || this.store.orderStatus === 'add') {
			// (9.2) 对象ID
			values.id = this.store.orderCurrentRe.id

			// (1.3) 物料
			values.itemId = this.state.value ? values.itemId : this.store.orderCurrentRe.itemId

			// (1.7) 交货期
			// yyyy-MM-dd => yyyy/MM/dd,否则相差8小时
			var dealTime=values.let.replace(/-/g,"/");
			var t=new Date(dealTime);
			var year=t.getFullYear(); 
			let month=(t.getMonth()+1).toString().padStart(2,'0');
			var day=t.getDate().toString().padStart(2,'0');
			var hour=t.getHours().toString().padStart(2,'0');
			var minute=t.getMinutes().toString().padStart(2,'0');
			var second=t.getSeconds().toString().padStart(2,'0');
			values.let=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;

			// (1.11) 订单数量
			values.qty=values.qty===""?0:values.qty;

			// (1.15) 优先度
			values.priority=(values.priority==="" || values.priority===undefined)?0:values.priority;
			values.priority=parseInt(values.priority)+80;
		}

		this.store.save(values).then(res => {
			if (res) {
				message.success('保存成功');
				this.store.showModal(false)
			}
		})
	}

	onChange = activeKey => {
		this.setState({ activeKey });
	};

	/* 关于物料 */
	handleChange = value => {
		this.setState({
			value,
			fetching: false,
		}, () => {
			this.store.itemCodeList = []
		});
	};

	/**
	 * 物料信息
	 */
	fetchData = value => {
		this.setState({ fetching: true });
		this.store.itemCodeList = []
		this.store.getItemCodeList({code: value}).then(() => {
			this.setState({ fetching: false });
		})
	};
  
	/**
	 * 日期时间检查  
	 * 格式为：YYYY-MM-DD HH:MM:SS
	 */
	checkDateTime = str => {   
		var reg = /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s((([0-1][0-9])|(2?[0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/
		var r = str.match(reg);   
		if(r==null) {
			return false;
		}
		else {   
			return true;  
		}
	} 

	qtyValidator  = (rule, value, callback) => {
        if (value!==null && value!=='' && (value<0 || value>100000)) {
            callback('0~100,000')
        }
        else {
            callback()
        }
	}

	priorityValidator  = (rule, value, callback) => {
        if (value!==null && value!=='' && (value<0 || value>1000)) {
            callback('0~1,000')
        }
        else {
            callback()
        }
	}

	letValidator = (rule, value, callback) => {
        if (!this.checkDateTime(value)) {
            callback('格式不符合：YYYY-MM-DD HH:MM:SS')
        }
        else {
            callback()
        }
	}
	
	UNSAFE_componentWillMount() {
	}
	
	componentWillUnmount() {
		this.store.clearModal();
	}
}

export default OrderModal;

/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:03:18
 * @LastEditors: shoen
 * @LastEditTime: 2021-11-27 23:37:57
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import '@ant-design/compatible/assets/index.css';
import { Form, Input, Select, DatePicker, Spin, InputNumber, message, AutoComplete,Tabs} from 'antd';
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

@inject('ManufacturingbomStore')
@inject('MyOrderStore')
@inject('MyResourceStore')
@observer
class ManufacturingbomModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			editData: {},
			value: '',
			fetching: false,
			activeKey: "1",
		};
		this.store = this.props.ManufacturingbomStore;
		this.orderStore = this.props.MyOrderStore;
		this.resourceStore = this.props.MyResourceStore;
	};

	formRef = React.createRef();

	render() {
		const { manufacturingbomStatus, manufacturingbomModalVis } = this.store;
		
		return (
			<GlobalModal
				title={manufacturingbomStatus === 'add' ? '新增' : manufacturingbomStatus === 'edit' ? '编辑' : ''}
				visible={manufacturingbomModalVis}
				onCancel={() => this.store.showModal(false)}
				onOk={() => {
					return this.formRef.current.validateFields()
							   .then(values => {      
									this.onSubmit(values);
								})
								.catch(info => {
									console.log('Validate Failed:', info);
								})					
				}}
				okText={'提交'}
				children={
					this.renderModal(manufacturingbomStatus)
				}
			/>
		);
	}

	// 模式对话框中的内容
	renderModal = (status) => {
		const { modalLoading, manufacturingbomCurrentRe} = this.store;
		const { itemCodeList } = this.orderStore;
		const { resourceCodeList } = this.resourceStore;

		return manufacturingbomCurrentRe &&
			<Form ref={this.formRef} name="form_in_modal"> 
				<Tabs activeKey={this.state.activeKey} 
				      onChange={this.onChange}>
					{/* (1) 基本 */} 
					<TabPane tab="基本" key="1">
						<Spin spinning={modalLoading}>
							{/* 最终物料 */}
							<Form.Item name="finalItem"
									label="最终物料"
									{...formItemLayout}
									initialValue={manufacturingbomCurrentRe.finalItem || undefined }
									rules={[{ required: true, message: '请输入最终物料' }]}
							>
								<Input placeholder="填写最终物料"
									style={{ width: 250 }} 
								/>
							</Form.Item>
							
							{/* 工序编号 */}
							<Form.Item name="procNo"
									label="工序编号"
									{...formItemLayout}
									initialValue={manufacturingbomCurrentRe.procNo || undefined}
									rules={[{ required: true, message: '请输入工序编号' }]}
							>
								<InputNumber placeholder="填写工序编号"
											style={{ width: 250 }}
								/>
							</Form.Item>

							<Form.Item name="procCode"
									label="工序代码"
									{...formItemLayout}
									initialValue={manufacturingbomCurrentRe.procCode || undefined }
									rules={[{ required: true, message: '请输入工序代码' }]}
							>
								<Input placeholder="填写工序代码"
									style={{ width: 250 }} 
								/>
							</Form.Item>

							<Form.Item name="instructionType"
									label="指令种类"
									{...formItemLayout}
									initialValue={manufacturingbomCurrentRe.instructionType || undefined }
									rules={[{ required: true, message: '请输入指令种类' }]}	   	   
							>
								<Select defaultValue={this.store.instructionType[manufacturingbomCurrentRe.instructionType]} 
										style={{ width: 250 }}
										onChange={this.onChangeInstructionType}>
									{
										this.store.instructionType.map((item,index,arr)=><Option value={index}>{item}</Option>)
									}
								</Select>
							</Form.Item>

							<Form.Item name="instructionCode"
									label="指令代码"
									{...formItemLayout}
									initialValue={manufacturingbomCurrentRe.instructionCode || undefined }
									rules={[{ required: true, message: '请输入指令代码' }]}
							>
								<Input placeholder="填写指令代码"
									style={{ width: 250 }} 
								/>
							</Form.Item>

							<Form.Item name="item"
									label="物料"
									{...formItemLayout}
									initialValue={manufacturingbomCurrentRe.item || undefined }	
									// rules={[{ required: true, message: '请输入物料' }]}
							>
								<AutoComplete
									style={{width: 250}}
									onSearch={this.fetchData}
									placeholder="填写物料"
									disabled={this.store.currentInstructionType!==1}								
									>
									{
									!isEmpty(itemCodeList) && 
											itemCodeList.map(bom => {
											return <Option value={bom.code} 
													>
													{bom.code}
												</Option>
										})
									}
								</AutoComplete>
							</Form.Item>

							<Form.Item name="resource"
										label="资源"
										{...formItemLayout}
										initialValue={manufacturingbomCurrentRe.resource || undefined }
										// rules={[{ required: true, message: '请输入资源' }]}
								>
									<AutoComplete
										style={{width: 250}}
										onSearch={this.fetchResourceData}
										placeholder="填写资源"
										disabled={this.store.currentInstructionType!==2}								
										>
										{
										!isEmpty(resourceCodeList) && 
												resourceCodeList.map(bom => {
												return <Option value={bom.code} 
														>
														{bom.code}
													</Option>
											})
										}
									</AutoComplete>							
								</Form.Item>
						</Spin>
					</TabPane>	

					<TabPane tab="设置" key="2">
						<Spin spinning={modalLoading}>
							<Form.Item name="task1Expr"
									label="前设置"
									{...formItemLayout}
									initialValue={manufacturingbomCurrentRe.task1Expr || undefined }
									//    rules={[{ required: true, message: '请输入前设置' }]}
							>
								<Input placeholder="填写前设置"
									style={{ width: 250 }} 
								/>
							</Form.Item>

							<Form.Item name="task2Expr"
									label="制造"
									{...formItemLayout}
									initialValue={manufacturingbomCurrentRe.task2Expr || undefined }
									//    rules={[{ required: true, message: '请输入制造' }]}
							>
								<Input placeholder="填写制造"
									style={{ width: 250 }} 
								/>
							</Form.Item>

							<Form.Item name="task3Expr"
									label="后设置"
									{...formItemLayout}
									initialValue={manufacturingbomCurrentRe.task3Expr || undefined }
									//    rules={[{ required: true, message: '请输入后设置' }]}
							>
								<Input placeholder="填写后设置"
									style={{ width: 250 }} 
								/>
							</Form.Item>

							<Form.Item name="timeConstraintMethod"
									label="接续方法"
									{...formItemLayout}
									initialValue={manufacturingbomCurrentRe.timeConstraintMethod || undefined }
									//    rules={[{ required: true, message: '请输入接续方法' }]}
							>
								<Select defaultValue={this.store.timeConstraintMethodSelected[manufacturingbomCurrentRe.timeConstraintMethod]} 
										style={{ width: 250 }}
								>
									{
										this.store.timeConstraintMethodSelected.map((item,index,arr)=><Option value={index}>{item}</Option>)
									}
								</Select>			
							</Form.Item>

							<Form.Item name="timeConstraintMin"
									label="移动时间MIN"
									{...formItemLayout}
									initialValue={manufacturingbomCurrentRe.timeConstraintMin || undefined }
									//    rules={[{ required: true, message: '请输入移动时间MIN' }]}
							>
								<Input placeholder="填写移动时间MIN"
									style={{ width: 250 }} 
								/>
							</Form.Item>

							{/* <Form.Item name="timeConstraintMin"
									label="移动时间MAX"
									{...formItemLayout}
									initialValue={manufacturingbomCurrentRe.timeConstraintMax || undefined }
									//    rules={[{ required: true, message: '请输入移动时间MAX' }]}
							>
								<Input placeholder="移动时间MAX"
									style={{ width: 250 }} 
								/>
							</Form.Item> */}

							<Form.Item name="priority"
									label="资源优先度"
									{...formItemLayout}
									initialValue={manufacturingbomCurrentRe.priority || undefined }
									//    rules={[{ required: true, message: '请输入移动时间MAX' }]}
							>
								<Input placeholder="资源优先度"
									style={{ width: 250 }} 
								/>
							</Form.Item>
						</Spin>
					</TabPane>
				</Tabs>
			</Form>
	}

	/**
	 * 编辑 & 新增
	 */
	onSubmit = (values) => {
		if (this.store.manufacturingbomStatus === 'edit') {
			values.id = this.store.manufacturingbomCurrentRe.id
		}
		this.store.save(values).then(res => {
			if (res) {
				message.success('保存成功');
				this.store.showModal(false)
			}
		})
	}

	/**
	 * 物料信息
	 */
	fetchData = value => {
		this.setState({ fetching: true });
		this.orderStore.itemCodeList = []
		this.orderStore.getItemCodeList({code: value}).then(() => {
			this.setState({ fetching: false });
		})
	};

	/**
	 * 物料信息
	 */
	fetchResourceData = value => {
		this.setState({ fetching: true });
		this.resourceStore.resourceCodeList = []
		this.resourceStore.getResourceCodeList({code: value}).then(() => {
			this.setState({ fetching: false });
		})
	};

	onChangeInstructionType = value => {
		console.log(value);
		this.store.currentInstructionType=value;
	}

	onChange = activeKey => {
		this.setState({ activeKey });
	};
	
	UNSAFE_componentWillMount() {
	}
	
	componentWillUnmount() {
		this.store.clearModal();
	}
}

export default ManufacturingbomModal;

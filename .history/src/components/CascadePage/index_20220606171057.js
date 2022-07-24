/**
 * extendFormColumns 目标对象：即当前的新增或编辑内容 输入类型之后的 children 内容
 *    因此对应操作children内部的level 1:即输入类型之后children的层级，不包括子的部分
 */

import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Select, Input, Checkbox, Switch, Divider, Modal, message } from 'antd';
import { Button } from '../BLComps'
import { setFormColumns, handleServerSubmit } from './methods';
import { DraggableArea } from 'react-draggable-tags';
import { server_list } from 'constants/status_constant';

const { Option } = Select;
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 }
};

class EditPage extends React.Component {
	constructor(props) {
		super(props);
		this.store = this.props.store
		this.state = {
			contentType: false,
			maxValue: '',
			minValue: '',
			isMust: false,
			extendFormColumns: []
		};
	}
	render() {
		const { info, } = this.store;
		const {
			contentType,
			minValue,
			maxValue,
			isMust,
			extendFormColumns
		} = this.state;
		const { title,visible,handleVisible } = this.props;
		const { getFieldDecorator } = this.props.form;
		const currentMain = info;
		const status = info.status
		const columns = setFormColumns({
			status,
			currentMain,
			contentLabel: title + '内容',
			contentType,
			minValue,
			maxValue,
			isMust,
			handleIsMust: this.handleIsMust,
			handleType: this.handleType,
			onAddItem: this.onAddItem,
			onDelItem: this.onDelItem,
			handleDataValue: this.handleDataValue
		});
		return (
			<Modal
				title={status === 'query' ? `查看${title}项` : info.id ?  `编辑${title}项` : `新增${title}项` }
				visible={visible}
				width={820}
				onCancel={handleVisible}
				footer={
					status === 'query' ? <Button onClick={handleVisible}>关闭</Button> : <div>
						<Button onClick={handleVisible}>取消</Button>
						<Button type='primary' onClick={this.handleSubmit}>确定</Button>
					</div>
				}
				maskClosable={false}
			>
				<div style={{ mHeight: '600px' }}>
					{/* 最外层选项基础 */}
					{columns &&
						columns.map((item, i) => {
							return (
								!item.displayNone && (
									<Form.Item
										{...formItemLayout}
										label={item.label}
										key={item.key}
										{...item}
									>
										{item.getFieldDecorator
											? getFieldDecorator(`${item.key}`, {
												...item.getFieldDecorator
											})(item.value)
											: item.value}
									</Form.Item>
								)
							);
						})}
					{/* ------------------子选项的层级部分 */}
					{extendFormColumns && extendFormColumns.length > 0 && (
						<div className='Simple-1'>
							<DraggableArea
								isList
								tags={extendFormColumns}
								onChange={this.changeSortTag.bind(this, { level: 1 })}
								render={({ tag, index }) => {
									let lv1 = tag;
									return (
										<Form.Item
											labelCol={{ span: 2 }}
											wrapperCol={{ span: 22 }}
											label={lv1.label}
											key={index}
											className='row'
										>
											<Input
												disabled={status === 'query'}
												value={lv1.content}
												placeholder='请输入'
												style={{ width: '200px' }}
												onChange={this.handleItemContent.bind(this, {
													id: lv1.id,
													level: 1,
													key: 'content'
												})}
											/>
											{/* -----------------一级子属性附带的条件 */}
											<span className='type_switch_icon' style={{margin:'0 10px'}}>
												<span style={{marginRight:5}}>级联</span>
												<Switch
													disabled={status === 'query'}
													checkedChildren='开'
													unCheckedChildren='关'
													onChange={this.handleItemSwitch.bind(this, {
														id: lv1.id,
														level: 1,
														type:'cascades'
													})}
													checked={lv1.cascades}
												/>
											</span>
											<span className='type_switch_icon' style={{margin:'0 10px'}}>
												<span style={{marginRight:5}}>是否默认</span>
												<Switch
													disabled={status === 'query'}
													checkedChildren='是'
													unCheckedChildren='否'
													onChange={this.handleItemSwitch.bind(this, {
														id: lv1.id,
														level: 1,
														type:'configStands'
													})}
													checked={lv1.configStands}
												/>
											</span>
											{lv1.cascades && (
												<span
													style={{
														color: '#6236FF',
														cursor: 'pointer',
														marginLeft: '20px'
													}}
												>
													<span
														onClick={this.handleItemProperty.bind(this, {
															id: lv1.id,
															level: lv1.level,
															type: 'add',
														})}
														disabled={status === 'query'}
													>
														新增字段
													</span>
													{lv1.children.length > 1 && [<Divider type='vertical' />,
													<span
														onClick={this.handleItemProperty.bind(this, {
															id: lv1.id,
															level: lv1.level,
															type: 'delete',
														})}
														disabled={status === 'query'}
													>
														删除字段
													</span>]}
												</span>
											)}

											{/* ---------------选择打开及联后的第一级 children-dataSource */}
											{lv1.cascades && (
												<div
													className='Simple-1'
													style={{ borderStyle: 'dashed' }}
												>
													<DraggableArea
														isList
														tags={lv1.children}
														onChange={this.changeSortTag.bind(this, {
															level: 2,
															parentId: lv1.id
														})}
														render={({ tag, index }) => {
															let lv2 = tag;
															return (
																<ul
																	className='case_children_lv1 row'
																	key={index}
																>
																	<li>
																		<div>
																			<Input
																				disabled={status === 'query'}
																				className='case_children_lv1_input'
																				placeholder='请输入字段说明'
																				value={lv2.content || undefined}
																				style={{ width: 200 }}
																				onChange={this.handleItemContent.bind(
																					this,
																					{
																						id: lv2.id,
																						parentId: lv2.parentId,
																						level: lv2.level,
																						key: 'content'
																					}
																				)}
																			/>
																			<Select
																				showSearch allowClear optionFilterProp="children"
																				disabled={status === 'query'}
																				className='case_children_lv1_select'
																				style={{
																					width: 200,
																					marginLeft: '20px'
																				}}
																				placeholder='请选择描述类型'
																				value={lv2.contentType || undefined}
																				onChange={this.handleItemContent.bind(
																					this,
																					{
																						id: lv2.id,
																						parentId: lv2.parentId,
																						level: lv2.level,
																						key: 'contentType'
																					}
																				)}
																			>
																				{server_list.map(server => (
																					<Option
																						key={server.id}
																						value={server.id}
																					>
																						{server.name}
																					</Option>
																				))}
																			</Select>
																			<Checkbox
																				disabled={status === 'query'}
																				checked={lv2.must}
																				style={{ marginLeft: '20px' }}
																				onChange={this.handleItemMust.bind(
																					this,
																					{
																						id: lv2.id,
																						parentId: lv2.parentId,
																						level: lv2.level,
																						key: 'must'
																					}
																				)}
																			>
																				必填
																			</Checkbox>
																			{/* 获取到二级输入类型为1时 */}
																			{lv2.contentType === 1 && (
																				<ul className='case_children_lv1_rangNumber'>
																					<li>请输入数据区间</li>
																					<li>
																						<span>最小值：</span>
																						<Input
																							disabled={status === 'query'}
																							onChange={this.handleItemContent.bind(
																								this,
																								{
																									id: lv2.id,
																									key: 'minValue',
																									parentId: lv1.id,
																									level: lv2.level
																								}
																							)}
																							value={lv2.minValue || undefined}
																							style={{
																								width: 200,
																								marginLeft: '10px'
																							}}
																							placeholder='请输入最小值'
																						/>
																					</li>
																					<li>
																						<span>最大值：</span>
																						<Input
																							disabled={status === 'query'}
																							onChange={this.handleItemContent.bind(
																								this,
																								{
																									id: lv2.id,
																									key: 'maxValue',
																									parentId: lv1.id,
																									level: lv2.level
																								}
																							)}
																							value={lv2.maxValue || undefined}
																							style={{
																								width: 200,
																								marginLeft: '10px'
																							}}
																							placeholder='请输入最大值'
																						/>
																					</li>
																				</ul>
																			)}

																			{/* 获取到二级 输入类型为2，3时  选项的操作 */}
																			{[2,3,8,9].includes(lv2.contentType) &&
																				lv2.strValue.map((str, idx) => {
																					return (
																						<div
																							className='case_children_lv1_choiseContent'
																							key={idx}
																						>
																							<label>-选项：</label>
																							<Input
																								style={{
																									width: 200,
																									marginLeft: '10px'
																								}}
																								disabled={status === 'query'}
																								value={str.value || undefined}
																								placeholder='请输入选项'
																								onChange={this.handleItemContent.bind(
																									this,
																									{
																										strId: str.id,
																										parentId: lv1.id,
																										id: lv2.id,
																										key: 'multiStrValue',
																										level: str.level
																									}
																								)}
																							/>
																							<span className='choise_operate'>
																								{idx ===
																									lv2.strValue.length - 1 && [
																										<span
																											onClick={this.handleItemProperty.bind(
																												this,
																												{
																													id: lv2.id,
																													parentId: lv2.parentId,
																													level: str.level,
																													type: 'add',
																													strId: str.id
																												}
																											)}
																										>
																											新增选项
																									</span>,
																										idx !== 0 && (
																											<Divider type='vertical' />
																										)
																									]}
																								{lv2.strValue.length > 1 && (
																									<span
																										onClick={this.handleItemProperty.bind(
																											this,
																											{
																												id: lv2.id,
																												parentId: lv2.parentId,
																												level: str.level,
																												type: 'delete',
																												strId: str.id
																											}
																										)}
																									>
																										删除选项
																									</span>
																								)}
																							</span>
																						</div>
																					);
																				})}
																		</div>
																	</li>
																</ul>
															);
														}}
													/>
												</div>
											)}
										</Form.Item>
									);
								}}
							/>
						</div>
					)}
				</div>
			</Modal>
		);
	}
	changeSortTag = ({ level, parentId }, tags) => {
		if (level === 1) {
			this.state.extendFormColumns = tags;
		} else if (level === 2) {
			this.state.extendFormColumns.map(ext => {
				if (ext.id === parentId) {
					Object.assign(ext, {
						children: tags
					});
				}
			});
		}
		this.setState({});
	};
	/* -------------选项型增加功能 */
	/* 选择添加第一层的数据结构 */
	onAddItem = () => {
		if (this.store.status === 'query') return;
		let extendsCol = this.state.extendFormColumns;
		extendsCol.unshift({
			id: extendsCol.length + 1,
			label: '-选项',
			key: 'strValue',
			// maintainType:this.props.maintainType
			level: 1,
			cascades: false,
			must: false,
			mustValue: '',
			children: []
		});
		this.setState({
			extendFormColumns: extendsCol
		});
	};

	/* -------------选择输入类型 */
	handleType = value => {
		// 修改主体的输入类型
		this.setState({
			contentType: value,
			extendFormColumns: []
		});
	};
	handleIsMust = e => {
		//修改主体项的必填选择
		this.setState({
			isMust: e.target.checked
		});
	};
	/* 具体到每一项完成设置 */
	handleItemContent = ({ id, level, parentId, key, strId }, e) => {
		this.handleExtendChange({
			id,
			level,
			parentId,
			key,
			value: key === 'contentType' ? e : e.target.value,
			strId
		});
	};
	handleItemMust = ({ id, level, parentId, key }, e) => {
		this.handleExtendChange({
			id,
			level,
			parentId,
			key,
			value: key === 'must' ? e.target.checked : e.target.value
		});
	};
	handleItemSwitch = ({ id, level, parentId,type }, checked) => {
		this.handleExtendChange({
			id,
			level,
			parentId,
			key: type,
			value: checked
		});
	};
	/* 新增或删除 每项子的级联字段 */
	handleItemProperty = ({ id, level, type, parentId, strId }) => {
		if (this.store.info.status === 'query') return;
		if (level === 1) {
			this.state.extendFormColumns.map(lv1 => {
				if (lv1.id === id) {
					if (type === 'add') {
						lv1.children.push({
							id: lv1.children.length + 1,
							parentId: id,
							must: false,
							mustValue: '',
							content: '',
							contentType: 0,
							level: 2,
							minValue: '',
							maxValue: '',
							strValue: [
								{
									id: 1,
									value: '',
									parentId: lv1.children.length + 1,
									level: 2
								}
							]
						});
					} else if (type === 'delete') {
						lv1.children.pop();
						lv1.children.map((lv2, idx) => {
							Object.assign(lv2, {
								id: idx
							});
						});
					}
				}
			});
		} else if (level === 2) {
			this.state.extendFormColumns.map(lv1 => {
				if (lv1.id === parentId) {
					lv1.children.map(lv2 => {
						if (lv2.id === id) {
							if (type === 'add') {
								lv2.strValue.push({
									id: lv2.strValue.length + 1,
									value: '',
									parentId: lv2.id,
									level: 2
								});
							} else if (type === 'delete') {
								let delIndex = -1;
								delIndex = lv2.strValue.findIndex(item => item.id === strId);
								if (delIndex >= 0) {
									lv2.strValue.splice(delIndex, 1);
								}
								lv2.strValue.map((str, index) => {
									Object.assign(str, { id: index });
								});
							}
						}
					});
				}
			});
		}
		this.setState({});
	};
	/* 集结整个扩展字段的更新情况 */
	handleExtendChange = ({ id, level, key, value, parentId, strId }) => {
		let extList = this.state.extendFormColumns;
		if (level === 1) {
			extList.map(lv1 => {
				if (lv1.id === id) {
					Object.assign(lv1, {
						[key]: value
					});
					if (['cascades',].includes(key)) {
						// 判断一级及联添加children条件出来
						let children = [
							{
								id: 1,
								parentId: id,
								must: false,
								mustValue: '',
								content: '',
								contentType: 0,
								level: 2
							}
						];
						Object.assign(lv1, {
							children
						});
					}
				}
			});
		} else if (level === 2) {
			extList.map(lv1 => {
				if (lv1.id === parentId) {
					lv1.children.map(lv2 => {
						if (lv2.id === id) {
							Object.assign(lv2, {
								[key]: value
							});
							if (key === 'contentType') {
								Object.assign(lv2, {
									strValue: [{ id: 1, value: '', parentId: lv1.id, level: 2 }],
									minValue: '',
									maxValue: ''
								});
							}
							if (key === 'multiStrValue') {
								lv2.strValue.map(str => {
									if (str.id === strId) {
										Object.assign(str, {
											value: value
										});
									}
								});
							}
						}
					});
				}
			});
		}
		this.setState({
			extendFormColumns: extList
		});
	};
	onDelItem = () => {
		if (this.store.status === 'query') return;
		let extendsCol = this.state.extendFormColumns;
		extendsCol.pop();
		this.setState({
			extendFormColumns: extendsCol
		});
	};
	handleDataValue = (type, e) => {
		this.setState({
			[type]: e.target.value
		});
	};
	handleSubmit = () => {
		const { status, info, maintainType } = this.store;
		const { extendFormColumns } = this.state;
		/* 使用方法添加参数： */
		try {
			this.props.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					let result = handleServerSubmit({
						values, extendFormColumns, status, currentMain: info, maintainType, stateValue: this.state
					})
					if (result.success) {
						this.props.save(result.params);
					} else {
						message.warn(result.message)
					}
				}
			});
		} catch (e) { console.log(e) }
	};
	componentDidMount() {
		const { info } = this.store;
		let currentMain = info;
		if (info.status === 'add') {
			this.setState({
				contentType: false,
				extendFormColumns: []
			});
		} else {
			let data = [];
			if (currentMain.contentType === 1) {
				this.state.minValue = currentMain.items.filter(item => item.configDetailDO.sort === 1)[0].configDetailDO.content
				this.state.maxValue = currentMain.items.filter(item => item.configDetailDO.sort === 2)[0].configDetailDO.content
			} else if ([2, 3,8,9].includes(currentMain.contentType)) {
				currentMain.items.map(item => {
					let current = {
						...item.configDetailDO,
						key: 'strValue',
						label: '-选项',
						level: 1,
						children: []
					}
					/* 存在级联 */
					if (item.configDetailDO.cascades) {
						/* 一级 */
						let level1 = []
						item.configVOs.map(config => {
							if (config.contentType === 1) {
								let maxValue = config.items.filter(max => max.configDetailDO.sort === 2)[0].configDetailDO.content;
								let minValue = config.items.filter(max => max.configDetailDO.sort === 1)[0].configDetailDO.content;
								level1.push({
									content: config.content,
									contentType: 1,
									id: config.id,
									level: 2,
									maxValue,
									minValue,
									must: config.must || false,
									parentId: item.configDetailDO.id,
								})
							} else if (config.contentType === 2 || config.contentType === 3) {
								let level2 = {
									content: config.content,
									contentType: config.contentType,
									id: config.id,
									level: 2,
									must: config.must || false,
									parentId: item.configDetailDO.id,
									multiStrValue: '',
									strValue: []
								};
								config.items.map(d => {
									level2.strValue.push({
										id: config.id,
										level: 2,
										parentId: item.configDetailDO.id,
										value: d.configDetailDO.content
									})
								})
								level1.push(level2)
							} else {
								level1.push({
									content: config.content,
									contentType: config.contentType,
									id: config.id,
									level: 2,
									must: config.must || false,
									parentId: item.configDetailDO.id,
								})
							}
						})
						current.children = level1;
					}
					data.push(current)
				})
			}
			this.setState({
				contentType: currentMain.contentType,
				extendFormColumns: data
			})
		}
	}
	componentWillUnmount() {
		this.setState({
			contentType: false,
			maxValue: '',
			minValue: '',
			isMust: false,
			extendFormColumns: []
		});
	}
}

const WrapperEditPage = Form.create({})(EditPage);
export default WrapperEditPage;

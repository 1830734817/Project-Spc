/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:03:18
 * @LastEditors: shoen
 * @LastEditTime: 2021-11-28 00:19:16
 * 
 * 清空所有筛选条件：
 * https://blog.csdn.net/Cs_Mervyn/article/details/113184075
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import './index.less';
import { circleStatus } from 'components/StateLess';
import TableLayout from 'components/MyTableLayout';
import moment from 'moment';
import { Modal,Divider, } from 'antd';
import { withRouter } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons';
import { Input, Button, Space, Select, Spin, DatePicker } from 'antd';
const { Option } = Select

@withRouter
@inject('ManufacturingbomStore')
@observer
class ManufacturingbomTable extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.ManufacturingbomStore;
	};

	render() {
		const { isLoading, manufacturingbomList, manufacturingbomPageInfo } = toJS(this.store);

		const columns = [
			{
				title: '最终物料',
				dataIndex: 'finalItem',
				key: 'finalItem',
				width: 100,
				...this.getColumnSearchField('finalItem','最终物料'),
			},
			{
				title: '工序编号',
				dataIndex: 'procNo',
				key: 'procNo',
				width: 100,
				...this.getColumnSearchField('procNo','工序编号'),
			},
			{
				title: '工序代码',
				dataIndex: 'procCode',
				key: 'procCode',
				width: 100,
				...this.getColumnSearchField('procCode','工序代码'),
				//className:'notshow',
			},
			{
				title: '指令种类',
				dataIndex: 'instructionType',
				key: 'instructionType',
				width: 100,
				...this.getColumnSearchInstructionType('instructionType'),
				render: (value) => {
					return this.store.instructionType[value]
				}
            },
            {
				title: '指令代码',
				dataIndex: 'instructionCode',
				key: 'instructionCode',
				width: 100,
			},
			{
				title: '物料',
				dataIndex: 'item',
				key: 'item',
				width: 100,
			},
			{
				title: '资源',
				dataIndex: 'resource',
				key: 'resource',
				width: 100,
			},
			{
				title: '前设置',
				dataIndex: 'task1Expr',
				key: 'task1Expr',
				width: 100,
			},
			{
				title: '制造',
				dataIndex: 'task2Expr',
				key: 'task2Expr',
				width: 100,
			},
			{
				title: '后设置',
				dataIndex: 'task3Expr',
				key: 'task3Expr',
				width: 100,
			},
			{
				title: '接续方法',
				dataIndex: 'timeConstraintMethod',
				key: 'timeConstraintMethod',
				width: 100,
				render: (value) => {
					return this.store.timeConstraintMethodView[value]
				}
			},
			{
				title: '移动时间MIN',
				dataIndex: 'timeConstraintMin',
				key: 'timeConstraintMin',
				width: 100,
			},
			// {
			// 	title: '移动时间MAX',
			// 	dataIndex: 'timeConstraintMax',
			// 	key: 'timeConstraintMax',
			// 	width: 100,
			// },
			{
				title: '资源优先度',
				dataIndex: 'priority',
				key: 'priority',
				width: 100,
			},
			// 操作：编辑|删除
			{
				title: '操作',
				dataIndex: 'status',
				key: 'operate',
				width: 150,
				fixed: 'right',
		
				// value: 计划状态（dataIndex: 'status'）
				// record：		
				render: (value, record) => (
					<div className='table_button'>
						<span onClick={()=>this.onEdit(record)}>编辑</span>
						<Divider type="vertical" />
						<span onClick={()=>this.onDelete(record)}>删除</span>
					</div>
				)
			}
		];

		//const { selectedRowKeys } = this.state;
		let selectedRowKeys=this.store.selectedIdsList;   // 用store代替state，使得其他页面可以访问选中状态
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
			selections: [
			{
				key: 'all',
				text: '全部',
				onSelect: changableRowKeys => {
					// this.setState({ selectedRowKeys: changableRowKeys });
					this.store.selectedIdsList=changableRowKeys;
				}
			},
			{
				key: 'invert',
				text: '反选',
				onSelect: changableRowKeys => {
					let newSelectedRowKeys = [];
					// let _arr1Set = new Set(this.state.selectedRowKeys);
					let _arr1Set = new Set(this.store.selectedIdsList);
					newSelectedRowKeys = changableRowKeys.filter(item => !_arr1Set.has(item))
					// this.setState({ selectedRowKeys: newSelectedRowKeys });
					this.store.selectedIdsList=newSelectedRowKeys;
				},
			},
			{
				key: 'clear',
				text: '清空',
				onSelect: changableRowKeys => {
					let newSelectedRowKeys = [];
					let _arr1Set = new Set(changableRowKeys);
					newSelectedRowKeys = changableRowKeys.filter(item => !_arr1Set.has(item))
					// this.setState({ selectedRowKeys: newSelectedRowKeys });
					this.store.selectedIdsList=newSelectedRowKeys;
				},
				},
			],
		};

		// 设置某列隐藏
		// columns[2].className='notshow';

		return (
			<div className='planTable'>
				<TableLayout
					rowKey='id'                        // 键值：表格行 key 的取值，可以是字符串或一个函数
					loading={isLoading}                // 加载：页面是否加载中
					rowSelection={rowSelection}        // 行选择
					dataSource={manufacturingbomList}  // 数据源
					columns={columns}                  // 表头
					pagination={{                      // 分页
						...manufacturingbomPageInfo,   // planPageInfo = {pageIndex: 1 pageSize: 10 total: 17823}
						onChange: this.onPageChange    // 事件1：分页事件
					}}
					onChange={this.onTableChange}      // 事件2：分页、排序、筛选变化时触发
				/>
			</div>
		);
	}

	/**
	 * 	finalItem
     *
	 */
	getColumnSearchField = (dataIndex,placeholder) => ({
		// 自定义筛选菜单
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
		  <div style={{ padding: 8 }}>
			{/* 查询文本框 */}
			<Input
			  ref={node => {
				this.searchInput = node;
			  }}
			  placeholder={'请输入'.concat(placeholder)}
			  value={selectedKeys[0]}
			  onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}       // 文本框值变化，将文本框值作为 selectedKeys
			  onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}      // 文本框回车
			  style={{ width: 188, marginBottom: 8, display: 'block' }}
			/>
			<Space>
			{/* 查询按钮 */}
			  <Button
				type="primary"
				onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
				icon={<SearchOutlined />}
				size="small"
				style={{ width: 90 }}
			  >
				查询
			  </Button>
			{/* 重置按钮  */}
			  <Button onClick={() => this.handleReset(clearFilters,dataIndex)} 
					  size="small" 
					  style={{ width: 90 }}>
				重置
			  </Button>
			</Space>
		  </div>
		),
	
		// 自定义 filter 图标
		filterIcon: filtered => (
			<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
		),
			
		// 自定义筛选菜单可见变化时调用: 出现(true) & 消失(false) 均调用
		onFilterDropdownVisibleChange: visible => {
		  console.log(visible);
		  if (visible) {
			setTimeout(() => this.searchInput.select(), 100);   // 100ms 选中文本框内容
		  }
		},  
	});

		/**
	 * Status
	 */
	getColumnSearchInstructionType = dataIndex => ({
		// 自定义筛选菜单
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
		  <div style={{ padding: 8 }}>
                <Select showSearch 
                        optionFilterProp="children" 
                        allowClear
                        // value={this.store.searchOptions.mrp || undefined}
						placeholder='选择使用指令'
						onChange={value => setSelectedKeys(value ? [value] : [])}
                        style={{ width: 250, verticalAlign: 'middle', marginRight: 10, marginBottom: 10 }}
                >
                   <Option key={1} value={1}>输入指令</Option>
                   <Option key={2} value={2}>使用指令</Option>
                </Select>

				<Space>
			{/* 查询按钮 */}
			  <Button
				type="primary"
				onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
				icon={<SearchOutlined />}
				size="small"
				style={{ width: 90 }}
			  >
				查询
			  </Button>
			{/* 重置按钮  */}
			  <Button onClick={() => this.handleReset(clearFilters,dataIndex)} 
					  size="small" 
					  style={{ width: 90 }}>
				重置
			  </Button>
			</Space>
		  </div>
		),
	
		// 自定义 filter 图标
		filterIcon: filtered => (
			<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
		),
			
		// 自定义筛选菜单可见变化时调用: 出现(true) & 消失(false) 均调用
		// onFilterDropdownVisibleChange: visible => {
		//   console.log(visible);
		//   if (visible) {
		// 	setTimeout(() => this.searchInput.select(), 100);   // 100ms 选中文本框内容
		//   }
		// },  
	});

	/**
	 * (1) 自定义筛选菜单变化后，首先触发；
	 *     页码改变触发：记录改变后的页码 pageIndex 及每页条数 pageSize
	 */
	onPageChange = (pageIndex, pageSize) => {
		this.store.manufacturingbomPageInfo = {
			...this.store.manufacturingbomPageInfo,
			pageSize,
			pageIndex,
		}

		console.log("onPageChange",this.store.searchOptions["finalItem"]);
		//console.log("onPageChange",this.store.searchOptions["mrp"]);
	};

	/**
	 * (2) 自定义筛选菜单变化后，其次触发；
	 */
	onTableChange = (pagination, filters, sorter) => {
		// 条件：获取自定义筛选菜单变化值
		this.store.searchOptions["finalItem"] = (filters.finalItem === null)? "" : filters.finalItem.toString();
		this.store.searchOptions["procNo"] = (filters.procNo === null)? "" : filters.procNo.toString();
		this.store.searchOptions["procCode"] = (filters.procCode === null)? "" : filters.procCode.toString();
		this.store.searchOptions["instructionType"] = (filters.instructionType === null)? "" : filters.instructionType.toString();

		// 查询：页码改变后的分页查询
		this.store.getManufacturingbomList({
			...this.store.searchOptions,
			pageSize: this.store.manufacturingbomPageInfo["pageSize"],
			pageIndex: this.store.manufacturingbomPageInfo["pageIndex"],
		});

		console.log("onTableChange",this.store.searchOptions["finalItem"]);
	};
	
	/**
	 * (3.1) 自定义筛选菜单变化后，【查询】最后触发；
	 * selectedKeys:"1"   查询值
	 * confirm
	 * dataIndex:"status" 查询字段
	 */
	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();

		this.store.searchOptions[dataIndex] = selectedKeys.toString();
		this.store.getManufacturingbomList({
			...this.store.searchOptions,
			pageSize: this.store.manufacturingbomPageInfo["pageSize"],
			pageIndex: this.store.manufacturingbomPageInfo["pageIndex"],
		});

		console.log("handleSearch",this.store.searchOptions["finalItem"]);
		// console.log("handleSearch",this.store.searchOptions["status"]);
		// console.log("handleSearch",this.store.searchOptions["mrp"]);
	};
	
	/**
	 * (3.2) 自定义筛选菜单变化后，【重置】最后触发；
	 */
	handleReset = (clearFilters, dataIndex) => {
		clearFilters();

		this.store.searchOptions[dataIndex] = "";
		this.store.getManufacturingbomList({
			...this.store.searchOptions,
			pageSize: this.store.manufacturingbomPageInfo["pageSize"],
			pageIndex: this.store.manufacturingbomPageInfo["pageIndex"],
		});

		// console.log("handleReset",this.store.searchOptions["planNo"]);
		// console.log("handleReset",this.store.searchOptions["status"]);
		// console.log("handleReset",this.store.searchOptions["mrp"]);
	};

	/**
	 * 编辑
	 */
	onEdit = (record)=>{
		this.store.manufacturingbomStatus = 'edit';
		this.store.manufacturingbomCurrentRe = record;
		this.store.currentInstructionType=this.store.manufacturingbomCurrentRe.instructionType;
		console.log(record)
		this.store.showModal(true);
	}

	/**
	 * 删除
	 */
	onDelete = (record)=>{
		Modal.confirm({
			title:'提示',
			content:'确定要删除选中的记录？',
			okText:'确定',
			cancelText:'取消',
			onOk:()=>{
				this.store.deleteManufacturingbom({
					id:record.id
				},'single');
			}
		})
	}

	/**
	 * 
	 */
	onSelectChange = selectedRowKeys => {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		// this.setState({ selectedRowKeys });
		this.store.selectedIdsList=selectedRowKeys;
	};
	
	componentDidMount() {
		this.store.getManufacturingbomList({
			planNo: '',
			pageIndex: 1,
			pageSize: 10,
		});

	}
}

export default ManufacturingbomTable;

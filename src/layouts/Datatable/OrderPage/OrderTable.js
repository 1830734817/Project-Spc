/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:03:18
 * @LastEditors: shoen
 * @LastEditTime: 2021-12-22 22:29:22
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
import { Input, Button, Space, Select, Spin, DatePicker,Table } from 'antd';
const { Option } = Select

// let typeList=[];
// let isReplenishmentOrderList=[];

@withRouter
@inject('MyOrderStore')
@observer
class OrderTable extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.MyOrderStore;
	};

	state = {
		selectedRowKeys: [], // Check here to configure the default column

		// 下拉框选择的文字
		nameList:{code:<span style={{color: '#bfbfbf'}}>请输入订单代码</span>,
			      type:<span style={{color: '#bfbfbf'}}>请选择订单类型</span>,
				  isReplenishmentOrder:<span style={{color: '#bfbfbf'}}>请选择订单区分</span>},
			
		// 检索的关键字
		nameKeyList:{code:"",
			         type:null,
					 isReplenishmentOrder:null,
					 let:{letStart:null,letEnd:null}},
		 
		// 提示文字
		nameTip:{code:"请输入订单代码",
				 type:"请选择订单类型",
		         isReplenishmentOrder:"请选择订单区分"}			 
	};

	render() {
		const { isLoading, orderList, orderPageInfo, selectedIdsList} = toJS(this.store);

		const columns = [
			{
				title: '订单代码',
				dataIndex: 'code',
				key: 'code',
				width: 100,
				...this.getColumnSearchProps('code'),
			},
			{
				title: '订单种类',
				dataIndex: 'type',
				key: 'type',
				width: 100,
				...this.getColumnSearchFieldType('type','订单种类',this.store.typeList),
				render: (value) => {
					return this.store.type[value]
				}
			},
			{
				title: '订单区分',
				dataIndex: 'isReplenishmentOrder',
				key: 'isReplenishmentOrder',
				width: 100,
				...this.getColumnSearchFieldType('isReplenishmentOrder','订单区分',this.store.isReplenishmentOrderList),
				render: (value) => {
					return this.store.isReplenishmentOrder[value]
				}
			},
			{
				title: '物料',
				dataIndex: 'item',
				key: 'item',
				width: 100,
			},
			{
				title: '交货期',
				dataIndex: 'let',
				key: 'let',
				width: 200,
				...this.getColumnSearchFieldTime('let')
			},
			{
				title: '订单数量',
				dataIndex: 'qty',
				key: 'qty',
				width: 100,
			},
			{
				title: '优先度',
				dataIndex: 'priority',
				key: 'priority',
				width: 100,
				render: (value) => {
					return value-80;
				}
			},
			{
				title: '显示颜色',
				dataIndex: 'color',
				key: 'color',
				width: 100,
			},
			{
				title: '开始时间',
				dataIndex: 'startTime',
				key: 'startTime',
				width: 200,
			},
			{
				title: '结束时间',
				dataIndex: 'endTime',
				key: 'endTime',
				width: 200,
			},
			{
				title: '订单状态',
				dataIndex: 'status',
				key: 'status',
				width: 100,
				render: (value) => {
					return this.store.status[value]
				}
			},
			{
				title: '分派标志',
				dataIndex: 'assignmentDirection',
				key: 'assignmentDirection',
				width: 100,
				render: (value) => {
					return this.store.assignmentDirection[value]
				}
			},
			{
				title: '分派方向',
				dataIndex: 'isAllOperationsAssigned',
				key: 'isAllOperationsAssigned',
				width: 100,
				render: (value) => {
					return this.store.isAllOperationsAssigned[value]
				}
			},
			{
				title: '非分派对象标志',
				dataIndex: 'disabled',
				key: 'disabled',
				width: 110,
				render: (value) => {
					return this.store.disabled[value]
				}
			},
			// 操作：编辑|删除
			{
				title: '操作',
				dataIndex: 'status',
				key: 'operate',
				width: 150,
				fixed: 'right',	
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
					dataSource={orderList}             // 数据源
					columns={columns}                  // 表头
					pagination={{                      // 分页
						...orderPageInfo,              // planPageInfo = {pageIndex: 1 pageSize: 10 total: 17823}
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
	getColumnSearchProps = dataIndex => ({
		// 自定义筛选菜单
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
		  <div style={{ padding: 8 }}>
			{/* 查询文本框 */}
			<Input
			  ref={node => {
				this.searchInput = node;
			  }}
			  placeholder='请输入订单代码'
			  // value={selectedKeys[0]}
			  value={this.state.nameKeyList[dataIndex]}
			  onChange={e => 
				{
					// setSelectedKeys(e.target.value ? [e.target.value] : [])
					this.setState({
						nameKeyList: {...this.state.nameKeyList,[dataIndex]:e.target.value}
					});

					this.store.orderPageInfo["pageSize"]=10;
					this.store.orderPageInfo["pageIndex"]=1;
				}
			  }       // 文本框值变化，将文本框值作为 selectedKeys
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

	getColumnSearchFieldType = (dataIndex,placeholder,optionList) => ({
		// 自定义筛选菜单
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
		  <div style={{ padding: 8 }}>
                <Select showSearch 
                        optionFilterProp="children" 
						//allowClear
						labelInValue
						// (1) 提示文字：
						value={{key: "", label: this.state.nameList[dataIndex]}}
						autoClearSearchValue='true'
						placeholder={'请选择'.concat(placeholder)}
						// (2) 选择项：当有labelInValue时，value将包括label和key
						onChange={value => {    
                            if (value!=null) {
								const _this = this;
								const { label, key } = value;
								_this.setState({
									nameList: {...this.state.nameList,[dataIndex]:label},      // 用于上方显示文字
									nameKeyList: {...this.state.nameKeyList,[dataIndex]:key},  // 用于检索条件
								});

								this.store.orderPageInfo["pageSize"]=10;
								this.store.orderPageInfo["pageIndex"]=1;
							}
						}
					}
                    style={{ width: 250, verticalAlign: 'middle', marginRight: 10, marginBottom: 10 }}
                >
				   {optionList}
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
	 * StartDate & EndDate
	 */
	getColumnSearchFieldTime = dataIndex => ({
		// 自定义筛选菜单
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
		  <div style={{ padding: 8 }}>
			<DatePicker.RangePicker allowClear 
									placeholder={['开始时间', '结束时间']} 
									style={{ width: 300, verticalAlign: 'middle', marginBottom: 10, marginRight: 10 }}
									value={this.store.showDateTime}
									onChange={
										(value) => {
											const _this = this;
											if (value!=null) {
												_this.setState({
													nameKeyList: {..._this.state.nameKeyList,let:{letStart:value[0].format('YYYY-MM-DD'),letEnd:value[1].format('YYYY-MM-DD')}},  // 用于检索条件									
												});
				
												this.store.orderPageInfo["pageSize"]=10;
												this.store.orderPageInfo["pageIndex"]=1;
											}

											this.store.showDateTime = value;
										}
									} />

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
		this.store.searchOptions["code"] = (this.state.nameKeyList.code === null)? "" : this.state.nameKeyList.code.toString();
		this.store.searchOptions["type"] = (this.state.nameKeyList.type === null)? "" : this.state.nameKeyList.type.toString();
		this.store.searchOptions["isReplenishmentOrder"] = (this.state.nameKeyList.isReplenishmentOrder === null)? "" : this.state.nameKeyList.isReplenishmentOrder.toString();

		this.store.searchOptions["letStart"] = (this.state.nameKeyList.let.letStart === null) ? "" :this.state.nameKeyList.let.letStart;
		this.store.searchOptions["letEnd"] = (this.state.nameKeyList.let.letEnd === null) ? "" :this.state.nameKeyList.let.letEnd;

		this.store.orderPageInfo = {
			...this.store.orderPageInfo,
			pageSize,
			pageIndex,
		}

		// console.log("onPageChange",this.store.searchOptions["code"]);

		console.log("onPageChange",this.store.searchOptions["letStart"]);
		console.log("onPageChange",this.store.searchOptions["letEnd"]);
	};

   /**
	 * (2) 自定义筛选菜单变化后，其次触发；
	 */
	onTableChange = (pagination, filters, sorter) => {
		// 条件：获取自定义筛选菜单变化值
		this.store.searchOptions["code"] = (this.state.nameKeyList.code === null)? "" : this.state.nameKeyList.code.toString();
		this.store.searchOptions["type"] = (this.state.nameKeyList.type === null)? "" : this.state.nameKeyList.type.toString();
		this.store.searchOptions["isReplenishmentOrder"] = (this.state.nameKeyList.isReplenishmentOrder === null)? "" : this.state.nameKeyList.isReplenishmentOrder.toString();

		this.store.searchOptions["letStart"] = (this.state.nameKeyList.let.letStart === null) ? "" :this.state.nameKeyList.let.letStart;
		this.store.searchOptions["letEnd"] = (this.state.nameKeyList.let.letEnd === null) ? "" :this.state.nameKeyList.let.letEnd;
		
		// 查询：页码改变后的分页查询
		this.store.getOrderList({
			...this.store.searchOptions,
			pageSize: this.store.orderPageInfo["pageSize"],
			pageIndex: this.store.orderPageInfo["pageIndex"],
		});

		console.log("onTableChange",this.store.searchOptions["letStart"]);
		console.log("onTableChange",this.store.searchOptions["letEnd"]);
	};
	
	/**
	 * (3.1) 自定义筛选菜单变化后，【查询】最后触发；
	 * selectedKeys:"1"   查询值
	 * confirm
	 * dataIndex:"status" 查询字段
	 */
	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();

		if (this.state.nameKeyList[dataIndex]===null) {

		}
		else if (dataIndex==='let') {
			this.store.searchOptions["letStart"] = (this.state.nameKeyList.let.letStart === null) ? "" :this.state.nameKeyList.let.letStart;
			this.store.searchOptions["letEnd"] = (this.state.nameKeyList.let.letEnd === null) ? "" :this.state.nameKeyList.let.letEnd;
		}
		else {
			this.store.searchOptions[dataIndex] = this.state.nameKeyList[dataIndex].toString();
		}

		this.store.getOrderList({
			...this.store.searchOptions,
			pageSize: this.store.orderPageInfo["pageSize"],
			pageIndex: this.store.orderPageInfo["pageIndex"],
		});

		console.log("handleSearch",this.store.searchOptions["letStart"]);
		console.log("handleSearch",this.store.searchOptions["letEnd"]);
	};
	
	/**
	 * (3.2) 自定义筛选菜单变化后，【重置】最后触发；
	 */
	handleReset = (clearFilters, dataIndex) => {
		clearFilters();

		const  _this = this;
		_this.setState({
			nameList: {..._this.state.nameList,
			           [dataIndex]:<span style={{color: '#bfbfbf'}}>{this.state.nameTip[dataIndex]}</span>},
			nameKeyList:{..._this.state.nameKeyList,
				       [dataIndex]:null}
		});
		
		if (dataIndex==='let') {
			const  _this = this;
			_this.setState({
				nameList: {..._this.state.nameList,
						   [dataIndex]:<span style={{color: '#bfbfbf'}}>{this.state.nameTip[dataIndex]}</span>},
				nameKeyList:{..._this.state.nameKeyList,
						   let:{letStart:null,letEnd:null}}
			});

			this.store.searchOptions['letStart'] = "";
			this.store.searchOptions['letEnd'] = "";

			this.store.showDateTime=null;
		}

		this.store.searchOptions[dataIndex] = "";
		this.store.getOrderList({
			...this.store.searchOptions,
			pageSize: this.store.orderPageInfo["pageSize"],
			pageIndex: this.store.orderPageInfo["pageIndex"],
		});
	};

	/**
	 * 编辑
	 */
	onEdit = (record)=>{
		this.store.orderStatus = 'edit';
		this.store.orderCurrentRe = record;
		this.setState({ fetching: true });
		this.store.plan_bomList = []
		this.store.getItemCodeList({code: this.store.orderCurrentRe.item}).then(() => {
			this.setState({ fetching: false });
			this.store.showModal(true);
		})
		console.log(record)
	};

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
				this.store.deleteOrder({
					id:record.id
				},'single');
			}
		})
	};

	/**
	 * 
	 */
	onSelectChange = selectedRowKeys => {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		// this.setState({ selectedRowKeys });
		this.store.selectedIdsList=selectedRowKeys;
	};
	
	/**
	 * 
	 */
	componentDidMount() {
		this.store.getOrderList({
			planNo: '',
			pageIndex: 1,
			pageSize: 10,
		});

		if (this.store.typeList.length===0) {
			for (let i = 0; i < 4; i++) {
				this.store.typeList.push(<Option key={i} value={i}>{this.store.type[i]}</Option>);
			}
		}
		
		if (this.store.isReplenishmentOrderList.length===0) {
			for (let i = 0; i < 2; i++) {
				this.store.isReplenishmentOrderList.push(<Option key={i} value={i}>{this.store.isReplenishmentOrder[i]}</Option>);
			}
		}

	}
}

export default OrderTable;

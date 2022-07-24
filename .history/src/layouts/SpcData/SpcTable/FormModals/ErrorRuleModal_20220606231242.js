import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Modal,
        Table,

} from 'antd'

const columns = [
    {
      title: '规则编号',
      dataIndex: 'ruleId',
      key: 'ruleId',
    },
    {
      title: '规则参数',
      dataIndex: 'ruleParams',
      key: 'ruleParams',
    },
    {
      title: '现行规则',
      dataIndex: 'currentRule',
      key: 'currentRule',
    }
];

const data = [
    {
        key:1,
        ruleId:'R0',
        ruleParams:'',
        currentRule:'超出规格限'
    },
    {
        key:2,
        ruleId:'R1',
        ruleParams:'',
        currentRule:'[n]个点落在[m]倍sigma区以外'
    },
    {
        key:3,
        ruleId:'R2',
        ruleParams:'',
        currentRule:'连续[n]点落在中心线同一侧'
    },
    {
        key:4,
        ruleId:'R3',
        ruleParams:'',
        currentRule:'连续[n]点递增或递减'
    },
    {
        key:5,
        ruleId:'R4',
        ruleParams:'',
        currentRule:'连续[n]点中相邻点交替上下'
    },
    {
        key:6,
        ruleId:'R5',
        ruleParams:'',
        currentRule:'连续[n]点中有[m]点落在中心线同一侧的[k]倍sigma区以外'
    },
    {
        key:7,
        ruleId:'R6',
        ruleParams:'',
        currentRule:'连续[n]点中有[m]点落在中心线同一侧的[k]倍sigma区以外'
    },
    {
        key:8,
        ruleId:'R7',
        ruleParams:'',
        currentRule:'连续[n]点落在中心线两侧的[m]倍sigma区内'
    },
    {
        key:9,
        ruleId:'R8',
        ruleParams:'',
        currentRule:'连续[n]点落在中心线两侧且无一在[m]倍sigma区内'
    },
];

@inject('SpcStore')
@observer
class ErrorRuleModal extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
	};

    render() {

        return (        
            <Modal title="判异规则" visible={this.store.errorRuleModalVis} 
                style={{ top: 100}} width={700}
                onCancel={this.handleClose} onOk={this.handleOk}
                cancelText={"取消"} okText={"确定"}
            >
                <Table columns={columns} dataSource={data}
                        rowSelection={{     
                            type: 'checkbox',
                            ...this.rowSelection,
                        }} 
                        style={{height:'50vh',overflow: 'scroll'}}
                        pagination={false}
                >

                </Table>
                
            </Modal>
        )
    }

    handleOk = () =>{
        this.store.setErrorRuleModalVis(false);
    }

    handleClose = () =>{
        this.store.setErrorRuleModalVis(false);
    }

    /* 表格第一列选择框事件 */
    rowSelection = {
        //选择框改变
        onChange: (selectedRowKeys, selectedRows) => {

        },
        //选择框的默认属性配置
        getCheckboxProps: (record) => ({

        })
    };

}

export default ErrorRuleModal;
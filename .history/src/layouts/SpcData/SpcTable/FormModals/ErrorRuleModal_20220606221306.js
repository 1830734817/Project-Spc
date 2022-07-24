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
import React, { Component } from 'react'
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react'
import { Modal,
        Layout,
        Table,
        Button,
        message
} from 'antd'
// import AlternativesUpdateModal from './AlternativesUpdateModal';
const { Sider, Content } = Layout;

const columns = [
    {
      title: '检测项目',
      dataIndex: 'name',
      key: 'name',
      width: 450
    }
]

@inject('SpcStore')
@observer
class SetCheckProjectModal extends Component {
    constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
        //获取检测项目
        this.store.getCheckProjects();
	};

    render() {
        const {checkProjects,tempCheckProjects} = toJS(this.store);

        return (
            <Modal title='检测项目定义' visible={this.store.checkProjectModalVis}
                    style={{top:100}}   width={700} 
                    bodyStyle={{padding:'10px',background:'#eee'}}
                    onCancel={this.handleClose} footer={null}
            >
                <div className='checkProjectContainer'>
                    <Layout>
                        <Content>
                            <Table columns={columns} 
                                dataSource={tempCheckProjects}
                                rowSelection={{     
                                    type: 'radio',
                                    ...this.rowSelection,
                                }} 
                                style={{height:'60vh',overflow: 'scroll'}}
                                pagination={false}
                                bordered
                            />
                        </Content>
                        <Sider width={120}>
                                <Button type='primary'
                                        onClick={()=>{
                                            // this.store.setAlternativesUpdateModalVis(true)
                                        }}
                                >
                                    添加
                                </Button>
                                <Button
                                        onClick={this.handleDelete}
                                >
                                    删除
                                </Button>
                                <Button
                                        onClick={()=>{
                                            // if(toJS(this.store.editAlternativesData).length === 0){
                                            //     message.warning('请选择要修改的预设值！');
                                            // }
                                            // else{
                                            //     this.store.setIsEditAlternatives(true);
                                            //     this.store.setAlternativesUpdateModalVis(true);
                                            // }
                                        }}
                                >
                                    修改
                                </Button>
                                <Button style={{marginTop:"250px"}}
                                        onClick={this.handleClose}
                                >
                                    关闭
                                </Button>
                        </Sider>
                    </Layout>
                </div>
                
                {/* 添加/修改对话框 */}
                {
                    // this.store.alternativesUpdateModalVis && <AlternativesUpdateModal/>
                }

            </Modal>
        )
    }

    handleClose = () =>{
        this.store.setCheckProjectModalVis(false);
        // this.store.setEditAlternativesData([]);

    }

    handleDelete = ()=>{
        // if (toJS(this.store.editAlternativesData).length>0) {
        //     Modal.confirm({
        //         title:'确认框',
        //         content:'确定要删除选中的记录？',
        //         okText:'确定',
        //         cancelText:'取消',
        //         onOk:()=>{
        //             const {editAlternativesData,
        //                     tempColInfo,
        //                     colInfoIndex
        //             } = this.store;

        //             tempColInfo[colInfoIndex].colValues.map((item,index)=>{
        //                 if(item.key === editAlternativesData[0].key)
        //                     this.store.deleteAlternative(index);
        //             });

        //             this.store.setEditAlternativesData([]);
        //         },
        //         onCancel:()=> {

        //         }
        //     })
        // }
        // else {
        //     message.warning('请选择要删除的预设值！');
        // }
    }

     /* 表格第一列选择框事件 */
     rowSelection = {
        //选择框改变
        onChange: (selectedRowKeys, selectedRows) => {
            // this.store.setEditAlternativesData(selectedRows);
        },
        //选择框的默认属性配置
        getCheckboxProps: (record) => ({

        })
    };
    
}

export default SetCheckProjectModal;

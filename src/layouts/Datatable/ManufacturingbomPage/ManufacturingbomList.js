/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:03:18
 * @LastEditors: shoen
 * @LastEditTime: 2021-11-26 16:16:47
 * 
 * beforeUpload
 * https://blog.csdn.net/weixin_43915401/article/details/105194817
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, message, Input, Select, Spin, DatePicker, Upload, Progress} from 'antd'; 
import { Button } from 'components/BLComps'
import './index.less';
import ManufacturingbomTable from './ManufacturingbomTable';
import ManufacturingbomModal from './ManufacturingbomModal';
import { UploadOutlined } from '@ant-design/icons';
// import MyHookController from './MyHookController';
// import ManufacturingbomStore from '../../../stores/ManufacturingbomStore'

@inject('ManufacturingbomStore')
@inject('HomeStore')
@observer
class ManufacturingbomList extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.ManufacturingbomStore;    
    }

    // visible=
    state = {
        fetching: false,
        url: 1, // 1新增 0修改
        percent: 0,
        progressVisible:'none'
    }

    render() {
        const { onImport, onExport } = this.store
        const props = {
            name: 'file',
            action: this.state.url ? '/iiot/datatable/manufacturingbom/import' : '/iiot/ipc/techline/importUpdate',
            data: {
                tenantId:sessionStorage.getItem('tenantId')
            },
            headers: {
                Authorization: sessionStorage.getItem('token') || null,
            },
            showUploadList: false,
            onChange: (info) => {
                console.log(info);
                //let that = this;
                const event = info.event
                if (event) { // 一定要加判断，不然会报错
                    let percent = Math.floor((event.loaded / event.total) * 100)

                    if (percent>99) {
                        percent=99; 
                    }
                    this.setState({percent: percent})
                    console.log(percent) // percent就是进度条的数值
                }
                
                if (info.file && info.file.status && info.file.status === 'done') {
                    if(info.file && info.file.response){
                        if(info.file.response.code == 0){
                            this.setState({percent: 100})
                            message.success('上传成功')
                            this.setState({progressVisible: 'none'});
                            this.onSearch()
                            // getData({ MaterialId: componentId, pageIndex: PageInfo.pageIndex, pageSize: PageInfo.pageSize })
                        }
                        else{
                            message.warn(info.file.response.msg || '上传失败')
                            this.setState({progressVisible: 'none'});
                        }
                    }
                }
                console.log(info);
            },    
            beforeUpload: (file, fileList) => {    //选择文件后，上传文件前的操作
                this.setState({percent: 0});
                this.setState({progressVisible: ''});
            },
        };

        return (
            <div className='task_container'>
                {/* （1）检索条件 */}
                <div className='search_bar'>
                    {/* 最终物料 */}
                    {/* <Input placeholder='请输入最终物料' 
                           allowClear
                           style={{ width: 250, verticalAlign: 'middle', marginRight: 10, marginBottom: 10 }}
                           onChange={e => this.onChangeInput('finalItem', e)}
                    /> */}
                    
                    {/* 查询 */}
                    {/* <Button style={{ marginRight: 10, marginBottom: 10,verticalAlign: 'middle' }} 
                            type='primary' 
                            onClick={this.onSearch}
                    >
                        查询
                    </Button> */}
             
                    {/* 新增 */}
                    <Button style={{ margin: '0 10px 10px 0', verticalAlign: 'middle'}} type='default'
                            onClick={() => {
                                this.store.planStatus = 'add';
                                this.store.showModal(true);
                        }}
                    >
                        新增
                    </Button>

                    {/* 导入 */}
                    <Upload {...props}>
                        <Button type='default' style={{ marginBottom: 10, marginRight: 10, verticalAlign: 'middle'}} 
                                onClick={() => this.upLoad('add')}
                        >
                        导入新增
                        </Button>
                        {/* <Button type='default' style={{ marginLeft: 10 }} onClick={() => this.upLoad('edit')}>导入修改</Button> */}
                    </Upload>

                    {/* 导入覆盖 */}
                    {/* <Upload {...props}>
                        <Button type='default' style={{ marginBottom: 10, marginRight: 10, verticalAlign: 'middle'}} 
                                onClick={() => this.upLoad('add')}
                        >
                        导入覆盖
                        </Button>
                    </Upload> */}

                    {/* 导出 */}
                    <Button style={{ marginBottom: 10, marginRight: 10, verticalAlign: 'middle'}} 
                            onClick={this.downLoad} 
                            type='default'        
                    >
                        导出
                    </Button>

                    {/* 删除 */}
                    <Button style={{ margin: '0 10px 10px 0', verticalAlign: 'middle'}} type='default'
                            onClick={() => {
                                this.onDelete(this.store.selectedIdsList);
                        }}
                    >
                        删除
                    </Button>

                    <Progress type="circle" percent={this.state.percent} 
                              width={25} 
                              style={{ margin: '0 10px 10px 0', verticalAlign: 'middle', display: this.state.progressVisible}}/>

                    {/* 同步 */}
                    {/* <Button style={{ marginBottom: 10, marginRight: 10, verticalAlign: 'middle'}} 
                            onClick={this.synchronize} 
                            type='default'        
                    >
                        同步
                    </Button> */}

                    {/* mobx+hook */}
                    {/* <div className='tool_bar'><Button id='ok' onClick={() => this.enterLoading('OK0')}>hook click；inject store; store++</Button></div>
                    <div className='tool_bar'><Button id='ok1' onClick={() => this.enterLoading('OK1')}>hook click；import store; store++</Button></div>
                    <div className='tool_bar'><Button id='ok2' onClick={() => this.enterLoading2('OK2')}>ok2</Button></div>
                    <div className='tool_bar'><Button id='ok3' onClick={() => this.enterLoading2('OK3')}>ok3</Button></div>
                    <div className='tool_bar'><MyHookController></MyHookController></div> */}
                </div>
                
                {/* （2）列表 */}
                <ManufacturingbomTable checkStatus={this.props.checkStatus} />

                {/* （3）模式对话框 */}
                {
                    this.store.manufacturingbomModalVis && <ManufacturingbomModal visible={this.store.manufacturingbomModalVis} />
                }


                
            </div>);
    }

    /**
     * <Input/>
     */
    onChangeInput = (key, e) => {
        this.store.searchOptions[key] = e.target.value
    }

    /**
     * 查询按钮
     */
    onSearch = () => {
        this.store.getManufacturingbomList({
            ...this.store.searchOptions,
            pageSize: 10,
            pageIndex: 1,
        });
    }

    // 导入Excel(.xlsx)文件
    upLoad = (type) => {
        this.setState({
            url:type === 'add'?1:0
        })
    }

    // 导出Excel(.xlsx)文件
    downLoad =() => {
        fetch(`//${window.location.host}/iiot/datatable/manufacturingbom/export`, {
            headers:{
                Authorization:sessionStorage.getItem('token') || null
              }
        }).then(res => res.blob().then(blob => {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(new Blob([blob], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));   // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
            a.href = url;
            a.download = "制造BOM";  //定义导出的文件名
            a.click();
            window.URL.revokeObjectURL(url);
        })).catch(err => message.error("导出失败！"))
    }

    // 同步
    synchronize=() => {
        console.log("synchronize");
    }

    /**
	 * 删除
	 */
	onDelete = (selectedIdsList)=>{
        if (this.store.selectedIdsList.length>0) {
            Modal.confirm({
                title:'批量删除',
                content:'确定要删除选中的记录？',
                okText:'确定',
                cancelText:'取消',
                onOk:()=>{
                    this.store.deleteManufacturingbom({
                        ids:selectedIdsList
                    },'single');

                    // 删除->数据库恢复->翻页->原来选中删除的标记不出现
                    this.store.selectedIdsList=[];
                }
            })
        }
        else {
            Modal.warning({
                title: '批量删除',
                content: '请选择需要批量删除的记录！',
              });
        }
	};

    componentDidMount() {
        this.setState({percent: 0});
        this.setState({progressVisible: 'none'});
    }

    // mobx+hook
    // enterLoading = index => {
    //     // 需要 @inject('ProductionStore')
    //     if (index==='OK0') {
    //       this.props.ManufacturingbomStore.hooktest++;
    //     }
    //     // 需要 import ManufacturingbomStore from '../../../stores/ProductionStore'
    //     else if (index === 'OK1') {
    //         ManufacturingbomStore.hooktest++;
    //     }
    //     else if (index === 'OK2') {
    //       alert(index);
    //     }
    
    //     console.log(index);
    //   }
    
    //   enterLoading2 = index => {
    //     this.props.ManufacturingbomStore.onClickFunction(index)
    //   }
}

export default ManufacturingbomList;

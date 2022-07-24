/**
 * @author zyn on 0513
 * @description 实现弹窗的拖拽、最大化、还原、关闭
 * @basic-params 基本实现参数可参照antd组件库Modal API
 * @param {Boolean} maxmin -是否支持最大化 - 默认值 false; 
 * @param {Boolean} dragable -是否支持拖拽 - 默认值 false;
 * @param {String || ReactNode} children - Modal组件添加的content内容 - 默认 null     
 */
import React,{ Component } from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import './index.less';

export default class GlobalModal extends Component{
  state = {
    isFullScreen:false,
    isMouseMove:false,
    rootWidth:0,
    rootHeight:0,
    top:50,
    left:0,
  };

  render(){
    const { children, title, width, bodyStyle, style, maskStyle, className, okText, cancelText, ...otherProps } = this.props;
    const dragable = !isEmpty(this.props.dragable) ? this.props.dragable : true;
    const maxmin = !isEmpty(this.props.maxmin) ? this.props.maxmin : true;
    const curBodyStyle = {
      height:this.state.isFullScreen && this.state.rootHeight - 110  + 'px',
      ...bodyStyle,
    };
    const wholeStyle = {
      top: this.state.isFullScreen ? '0' : this.state.top+'px',
      left: !this.state.isFullScreen && dragable && this.state.left+'px',
      margin: this.state.isMouseMove && dragable && '0',
      paddingBottom:(this.state.isFullScreen || dragable) && '0',
      ...otherProps.style
    }

    //
    return (
      <Modal
        // 样式
        wrapClassName={                                                                // 对话框外层容器的类名:覆盖下层页面的灰色部分
          classnames({
            'global-modal-zyn':true,
          })
        }
        style={{...wholeStyle}}
        bodyStyle={{...curBodyStyle}}
        maskStyle={{position: 'absolute',...maskStyle}}
        width={this.state.isFullScreen ? this.state.rootWidth+'px' : (width || '800px')}  // 对话框宽度

        // 标题：新增 & 新增
        title={<div style={{cursor:'move'}} onMouseDown={(e)=>this.onMouseDown(e)}>
          {title}
          {
            maxmin &&
            // 最大化按钮 
            <span onClick={this.onFullScreen}> {
                this.state.isFullScreen ? 
                <FullscreenExitOutlined className='icon' />  :
                <FullscreenOutlined className='icon' />
            }
            </span>
          }
        </div>}

        // 挂载：指定 Modal 挂载的 HTML 节点, false 为挂载在当前 dom
        getContainer={()=>document.getElementById('home_content')}         // 表格区域

        // 操作
        destroyOnClose={true}                                  // 关闭时销毁 Modal 里的子元素
        maskClosable={false}                                   // 点击蒙层是否允许关闭
        okText = { okText || '确定'}
        cancelText = {cancelText || '取消'}

        {...otherProps}                                        // visible
                                                               // onCancel()
                                                               // onOk()
      >
        {children}
      </Modal>
    );
  }

  /**
   * 启动最大最小化模式
   */
  onFullScreen = ()=>{
    let content = document.getElementById('home_content');
    this.setState({
      isFullScreen:!this.state.isFullScreen,
      rootHeight:content.offsetHeight,
      rootWidth:content.offsetWidth,
      top:100,
      isMouseMove:false
    });
  }

  /**
   * 启动组件拖拽功能
   */
  onMouseDown = (event)=>{
    let et = event || window.event;
    et.persist();

    let oModal = document.getElementsByClassName('ant-modal')[0]
    //let oMenu = document.getElementsByClassName('ant-sider-menu-content')[0]        // 菜单在顶部时“ant-sider-menu-content”不存在
    let oHeader = document.getElementsByClassName('header_layout')[0]
    let oCrumbs = document.getElementsByClassName('crumb_layout')[0]
    let oContent = document.getElementById('home_content')

    let oCmarginWidth = parseFloat(oContent.style.marginLeft) + parseFloat(oContent.style.marginRight)
    let oCmarginHeight = parseFloat(oContent.style.marginTop) + parseFloat(oContent.style.marginBottom)
    let diffX = et.clientX - oModal.offsetLeft
    let diffY = et.clientY - oModal.offsetTop 

    document.onmousemove = (e)=>{
      let ev = e || window.event;
      let minL = ev.clientX - diffX
      let minT = ev.clientY - diffY
      let maxL = document.documentElement.clientWidth;// - oModal.offsetWidth - oMenu.offsetWidth - oCmarginWidth
      let maxT = document.documentElement.clientHeight;// - oModal.offsetHeight - oHeader.offsetHeight - oCrumbs.offsetHeight - oCmarginHeight
      
      minL <= 0 && (minL = 0);
      minT <= 0 && (minT = 0);
      minL >= maxL && (minL = maxL);
      minT >= maxT && (minT = maxT);

      this.setState({
        left:minL, top:minT,
        isMouseMove:true
      });
      
      return false;
    }

    document.onmouseup = ()=>{
      document.onmousemove = null;
      document.onmouseup = null;
      this.releaseCapture && this.releaseCapture();
    };

    this.setCapture && this.setCapture();
    return false;
  }

  /* 启动组件实现可拉伸窗口功能 : 八个方向的拉伸 */
  /* 后续更新 */

}

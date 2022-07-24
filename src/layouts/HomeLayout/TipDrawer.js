import React from 'react';
import { CloseOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { Drawer, Switch, message, Tag } from 'antd';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import { inject,observer } from 'mobx-react'
import { THEME_LIST } from 'constants/theme_config'
const { CheckableTag } = Tag

@inject('HomeStore')
@observer
class TipDrawer extends React.Component {
  state = { 
    visible: false,
  };
  componentDidMount(){
    let customTheme = sessionStorage.getItem('ownTheme');
    if(customTheme){
      for(let theme of THEME_LIST){
        if(theme.color === customTheme){
          this.props.HomeStore.isSwitchTheme = theme
        }
      }
    }else{
      this.props.HomeStore.isSwitchTheme = THEME_LIST[0]
    }
  }
  showDrawer = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  onMenuClick = (actionId)=>{
    this.props.toggleMenu(actionId);
    this.showDrawer();
  }
  onSwitchTheme = (tag,checked) =>{
    this.props.HomeStore.isSwitchTheme = tag
    sessionStorage.setItem('ownTheme',tag.color)
    window.less.modifyVars(
      {
        '@primary-color': tag.color,
        '@menu-dark-item-active-bg':tag.color,
        '@link-color': tag.color,
        '@text-color':tag.color,
        '@btn-primary-bg': tag.color,
        '@layout-header-background':tag.color === '#6236FF' ? 'linear-gradient(137deg, #674dc5 0%, #150f23 100%)' : 
          '#001529',
        '@menu-dark-submenu-bg':'transparent',
      }
    )
    .then(() => { 
      message.success('主题切换成功')
    })
    .catch(error => {
      message.error(`主题切换失败`);
      console.log(error)
    });
  }
  
  render() {
    const customMenu = this.props.menuList;
    const lastMenuList = this.props.lastMenuList;
    const actionKey = this.props.actionKey;
    return (
      <React.Fragment>
        <div className={
          classnames({
            tipmenu_trigger_btn_position:true,
            tip_initbtn:this.state.visible,
            tipmenu_initstyle:true
          })
        } onClick={this.showDrawer}>
          <DoubleLeftOutlined style={{fontSize: '16px',color:'#fff'}} />
        </div>
        
        <Drawer
          title="最近浏览"
          placement={'right'}
          closable={false}
          onClose={this.showDrawer}
          visible={this.state.visible}
          bodyStyle={{
            padding:0
          }}
        >
          <div className='tipmenu_trigger_btn' onClick={this.showDrawer}>
            {
              this.state.visible ? <CloseOutlined style={{fontSize: '16px',color:'#fff'}} /> : 
                <DoubleLeftOutlined style={{fontSize: '16px',color:'#fff'}} />
            }
          </div>
          <ul className='follow_menu_list'>
            {
              !isEmpty(lastMenuList) ? lastMenuList.map(item=>{
                return <li key={item.id}
                  className={
                    classnames({
                      'li_menu_active':actionKey === item.id
                    })
                  }
                  onClick={()=>this.onMenuClick(item.id)}
                >
                  {item.name}
                </li>
              }) : <span style={{paddingLeft: '26px'}}>暂无浏览记录</span>
            }
          </ul>
          <h3 style={{margin:'20px 0 16px 26px'}}>最近关注</h3>
          <div className='type_line' />
          <ul className='follow_menu_list'>
            {
              !isEmpty(customMenu) ? customMenu.map(menu=>{
                return <li key={menu.id}  
                  className={
                    classnames({
                      'li_menu_active':actionKey === menu.id
                    })
                  }
                  onClick={()=>this.onMenuClick(menu.id)}>
                  {menu.name}
                </li>
              }) : <span style={{paddingLeft: '26px'}}>暂无关注记录</span>
            }
          </ul>
          {/* <div style={{marginLeft:'20px'}}>
            <p>选择切换主题：</p>
            {
              THEME_LIST && THEME_LIST.map((tag,index) =>{
                return <CheckableTag 
                  style={{background:this.props.HomeStore.isSwitchTheme.name === tag.name && tag.color,
                    color:this.props.HomeStore.isSwitchTheme.name === tag.name &&'#fff'}}
                  key = {index}
                  onChange = {checked => this.onSwitchTheme(tag, checked)}
                  checked = {this.props.HomeStore.isSwitchTheme.name === tag.name}
                >
                {tag.name}
                </CheckableTag>
              })
            }
           
          </div> */}
        </Drawer>
      </React.Fragment>
    );
  }
}

export default TipDrawer;
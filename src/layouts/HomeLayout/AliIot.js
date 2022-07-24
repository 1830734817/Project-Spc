import React from 'react';
import { Empty } from 'antd';
import { inject,observer } from 'mobx-react'
import { isEmpty } from 'lodash'
import { initSearchQuery } from 'utils/dataTools';

@inject('HomeStore')
@observer
class AliIot extends React.Component {
  UNSAFE_componentWillMount(){
    /* 判断登录接口 */
    let query = initSearchQuery(this.props.location.search)
    if(!isEmpty(query)){
			if(query.ali_iot_token){
				this.props.HomeStore.setAutoAuth({token:query.ali_iot_token}).then((result)=>{
          if(result){
            this.props.history.push('/plan')
          }
        })
			}
		}
  }
  render(){
    return <div style={{paddingTop:'10%'}}>
      <Empty description='暂无权限'/>
    </div>
  }
  
}

export default AliIot;
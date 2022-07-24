/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-12-28 15:42:32
 * @LastEditors: shoen
 * @LastEditTime: 2021-05-10 11:29:23
 */

// 引入react组件
import React from 'react';
import ReactDOM from 'react-dom';

// 引入总的样式文件
import './css/index.less';

// 引入store组件
import { Provider } from 'mobx-react';
import store from './stores';

// 引入router根组件
import RootRouter from './routes';

// 引入最外层组件
import * as serviceWorker from './serviceWorker';

// 引入和设置组件国际化配置
import 'constants/global_config';    
import 'moment/locale/zh-cn';        
import moment from 'moment';
moment.locale('zh-cn');

// 在根组件通过Provider注入来自“./stores"下的store
ReactDOM.render(
  <Provider {...store}>    
    <RootRouter/>
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

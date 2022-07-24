/*
 * @Description: 演示 hook + mobx-react 6.3
 * @version: 
 * @Author: shoen
 * @Date: 2020-12-23 10:37:25
 * @LastEditors: shoen
 * @LastEditTime: 2020-12-23 12:06:24
 */
import React,{useState,useEffect} from 'react'
import {MobXProviderContext,observer } from 'mobx-react'
import { Button, Input} from 'antd'
import './index.less'

function useStores(name) {
    return React.useContext(MobXProviderContext)[name];
}

// export default function MyHookController() {}
export const MyHookController = () => { 
    const [count, setCount] = useState(200);
    const store = useStores('ProductionStore');

    // hooks
    // Similar to componentDidMount and componentDidUpdate:
    // useEffect 第二个参数含义 https://www.jianshu.com/p/7b7e7ca12416
    // useEffect(() => { 
    //     
    // },[])

    return (
        <React.Fragment>
            {/* state */}
            <Button onClick={() => setCount(count + 1)}>
                state test
            </Button>
            <Input
                allowClear
                style={{width:200}}
                placeholder='请输入'
                size='small'
                value={count || undefined}
            />

            {/* store */}
            <Input
                allowClear
                style={{width:200}}
                placeholder='请输入'
                size='small'
                value={store.hooktest || undefined}
            />
        </React.Fragment>
    )
}

export default observer(MyHookController);


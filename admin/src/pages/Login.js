import React, { useState } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Spin, Card, Input,Icon ,Button, message  } from 'antd';
import apiUrl from '../config/apiUrl';
import '../static/css/Login.css'

function Login(props){
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const checkLogin = () =>{
        
        if(!userName){
            message.error('用户名不能为空')
            return false
        } else if (!password) {
            message.error('密码不能为空')
            return false
        }
        let postData = {
            userName,
            password,
        }
        setIsLoading(true)
        axios({
            method:'post',
            url:`${apiUrl}/checkLogin`,
            data:postData,
            withCredentials:true,
        }).then(({data})=>{
            if(data.data === 'success'){
                localStorage.setItem('openId',data.openId)
                props.history.push('/index')
            } else {
                message.error('用户名密码错误!')
            }
            setIsLoading(false)
        })

        // setTimeout(() => {
        //   setIsLoading(false)
        // }, 2*1000);

    }
    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card className="login-card" title="星星眼的Blog后台系统" bordered={true} style={{width: 400}}>
                    <Input
                        id="userName"
                        size="large"
                        placeholder="请输入用户名"
                        // prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={e=>{setUserName(e.target.value)}}
                    />
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="请输入密码"
                        // prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin} >Login</Button>
                
                </Card>

            </Spin>
        </div>
    )
}


export default Login
import React from 'react';
import {Avatar, Divider} from 'antd';
import {QqOutlined,GithubOutlined,WechatOutlined} from '@ant-design/icons'
import '../static/style/components/avatar.css'

const MyAvatar = () =>{
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1305353222,2352820043&fm=26&gp=0.jpg"></Avatar>
            </div>
            <div className="author-introduction">
                hand宸汐缘,爹大结局看电视了附加赛附近的宋美 v 圣克鲁斯家啊
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className="account" />
                <Avatar size={28} icon={<QqOutlined />} className="account" />
                <Avatar size={28} icon={<WechatOutlined />} className="account" />
            </div>
        </div>
    )
}

export default MyAvatar
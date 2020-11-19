import React,{useEffect,useState} from 'react';
import {Row,Col,Menu} from 'antd';
import { CameraOutlined, BankOutlined , SmileOutlined } from '@ant-design/icons';
import '../static/style/components/header.css';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import ipUrl from '../config/apiUrl';

const Header = () => {
    
    const [navArray,setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async () =>{
            const result = await axios(`${ipUrl}getTypeInfo`).then(
                (res)=>{
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    },[])

    const handleClick = (e) =>{
        console.log(e.key===`0`)
        if(e.key===`0`){
            Router.push('/list')
        }else{
            Router.push('/list?id='+e.key)
        }
    }

    return (
        <div className='header'>
            <Row type='flex' justify='center'>
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <span className="header-logo">
                        <Link href={{pathname:'index'}}>
                            <a>希望小学</a>
                        </Link>
                    </span>
                    <span className="header-txt">这是希望小学的官网</span>
                </Col>
                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <BankOutlined />
                            全部
                        </Menu.Item>
                        {
                            navArray.map(item=>{
                                return (
                                    <Menu.Item key={item.id}>
                                    <CameraOutlined />
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
    }

export default Header
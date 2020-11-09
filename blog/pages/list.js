import React,{useState, useEffect} from 'react';
import Head from 'next/head';
import {Row,Col,List} from 'antd'
import Link from 'next/link';
import axios from 'axios';
import { CameraOutlined, BankOutlined , SmileOutlined } from '@ant-design/icons';
import Header from '../components/Header'
import MyAvatar from '../components/Avatar'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import ipUrl from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const MyList=(list)=>{
  const [mylist,setMylist] = useState(
    list.data,
  )
  useEffect(()=>{
    setMylist(list.data)
  })

  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer:renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item=>(
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/content',query:{id:item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CameraOutlined />{item.addTime}</span>
                  <span><BankOutlined />{item.typeName}</span>
                  <span><SmileOutlined />{item.view_count}人</span>
                </div>
                <div 
                  className="list-context"
                  dangerouslySetInnerHTML={{__html:marked(item.introduce)}} 
                />
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <MyAvatar />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </>
  )
}

MyList.getInitialProps = async (context) =>{
  const id = context.query.id
  let url = `${ipUrl}getArticleList`
  if(id)  url = `${ipUrl}getArticleListByTypeId/${id}`
  const promise = new Promise((resolve)=>{
    axios(url).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default MyList
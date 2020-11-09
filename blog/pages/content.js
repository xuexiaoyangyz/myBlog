import React from 'react';
import Head from 'next/head';
import {Row,Col, Breadcrumb,Affix} from 'antd'
import axios from 'axios'
import Header from '../components/Header'
import MyAvatar from '../components/Avatar'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import 'markdown-navbar/dist/navbar.css'
import '../static/style/pages/content.css'
import ipUrl from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import Tocify from '../components/tocify.tsx'
import 'highlight.js/styles/monokai-sublime.css'

const Content=(props)=>{
  
  const renderer = new marked.Renderer();

  const tocify = new Tocify
  renderer.heading = function (text,level,raw){
    const anchor = tocify.add(text,level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>`
  }

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

  const html = marked(props.content)

  return (
    <>
      <Head>
        <title>Content</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-dev">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/">视屏列表</a></Breadcrumb.Item>
                <Breadcrumb.Item>>xxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                {props.title}
              </div>
              <div className="list-icon center">
                <span>{props.addTime}</span>
                <span>{props.introduce}</span>
                <span>{props.view_count}</span>
              </div>
              <div className="detailed-content"
                dangerouslySetInnerHTML={{__html:html}}
              >
              </div>
            </div>
            
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <MyAvatar />
          <Advert />
          <Affix offsetTop={5}>
          <div className="detailed-nav comm-box">
            <div className="nav-title">文章目录</div>
            <div className="toc-list">
              {tocify && tocify.render()}
            </div>
          </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

Content.getInitialProps = async (context) =>{
  console.log(context)
  const id = context.query.id
  const promise = new Promise((resolve)=>{
    axios(`${ipUrl}getArticleListById/`+id).then(
      (res)=>{
        console.log(res.data.data[0])
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}

export default Content
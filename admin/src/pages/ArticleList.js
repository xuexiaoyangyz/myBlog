import React, { useState, useEffect } from 'react';
import {Table, Divider, Modal, message } from 'antd'
import httpFetch from '../utils/fetchhttp'

const { confirm } = Modal

function ArticleList(props){
    const [dataSource,setDataSource] = useState([])
    const [columns, setColumns] = useState([
        {
            title: '序号',
            dataIndex: 'xuhao',
            width: 50,
            align: 'center',
            render: (_,v,i) => i+1,
          },
          {
            title: '标题',
            dataIndex: 'title',
            width: 100,
            align: 'center',
          },
          {
            title: '内容',
            dataIndex: 'articleContent',
            width: 100,
            align: 'center',
          },
          {
            title: '类型',
            dataIndex: 'typeName',
            width: 100,
            align: 'center',
          },
          {
            title: '描述',
            dataIndex: 'introduce',
            width: 100,
            align: 'center',
          },
          {
            title: '添加时间',
            dataIndex: 'addTime',
            width: 100,
            align: 'center',
          },
          {
            title: '观看人数',
            dataIndex: 'viewCount',
            width: 100,
            align: 'center',
          },
          {
            title: '编辑',
            dataIndex: 'edit',
            width: 100,
            align: 'center',
            render: (value,record) =>{
                return (
                    <div>
                        <a onClick={event => {
                            event.stopPropagation();
                            editArticle(record.id)}
                        }
                            >编辑
                        </a>
                        <Divider type="vertical" />
                        <a onClick={event => {
                            event.stopPropagation();
                            showDeleteConfirm(record.id)}
                        }
                            >删除
                        </a>
                    </div>
                )
            }
          },
    ])

    useEffect (()=>{
        getList()
    },[])

    const getList = () => {
        httpFetch.get('/getArticleList').then(res=>{
            console.log(res.data.data)
            setDataSource(res.data.data)
        })
    }

    const showDeleteConfirm = (id) => {
        confirm({
          title: '确定删除?',
        //   icon: <ExclamationCircleOutlined />,
          content: '删除后将不可恢复!',
          okText: '是',
          okType: 'danger',
          cancelText: '否',
          onOk() {
            deleteArticle(id)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    const deleteArticle = (id) => {
        httpFetch.get(`/deleteArticle/${id}`).then(()=>{
            message.info('删除成功!')
            getList()
        }).catch(err=>{
            if (err.response.data.data === 'no access') {
                localStorage.removeItem('openId')
                props.history.push('/')
            }
        })
    }

    const editArticle = (id) => {
        props.history.push(`/index/edit/${id}`)
    }


    return(
        <div>
            <Table
                key='articleTable'
                dataSource={dataSource}
                columns={columns}
                size="middle"
            />
        </div>
    )
}

export default ArticleList
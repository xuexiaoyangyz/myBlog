import React,{useState, useEffect} from 'react';
import marked from 'marked'
import moment from 'moment'
import '../static/css/AddArticle.css'
import { Row, Col ,Input ,Select, Button, DatePicker, message } from 'antd';
import httpFetch from '../utils/fetchhttp';


const {Option} = Select
const {TextArea} = Input

function AddArticle(props){
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState(moment())   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState(1) //选择的文章类别

    useEffect(()=>{
        getTypeInfo()
        let tmpId = props.match.params.id
        if(tmpId){
            setArticleId(tmpId)
            getArticleById(tmpId)
        }
    },[])

     const getTypeInfo=()=>{
        httpFetch.get('/getTypeInfo').then(res=>{
            setTypeInfo(res.data.data)
        }).catch(err=>{
            if (err.response.data.data === 'no access') {
                localStorage.removeItem('openId')
                props.history.push('/')
            }
        })
    }

    const getArticleById = (id) => {
        httpFetch.get(`/getArticleListById/${id}`).then(res=>{
            console.log(res.data.data[0])
            setArticleTitle(res.data.data[0].title)
            setArticleContent(res.data.data[0].articleContent)
            let html = marked(res.data.data[0].articleContent)
            setMarkdownContent(html)
            setIntroducemd(res.data.data[0].introduce)
            let tmpInt = marked(res.data.data[0].introduce)
            setIntroducehtml(tmpInt)
            setShowDate(res.data.data[0].addTime)
            setSelectType(res.data.data[0].id)
        })
    }

    marked.setOptions({
        renderer:new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
      }); 

    const changeContent = (e) =>{
        setArticleContent(e.target.value)
        const html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce =(e)=>{
        setIntroducemd(e.target.value)
        const html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const selectTypeHandler = (value) =>{
        setSelectType(value)
    }

    const saveArticle = () =>{
        if(!selectedType){
            message.error('必须选择文章类别')
            return false
        }else if(!articleTitle){
            message.error('文章名称不能为空')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false
        }else if(!introducemd){
            message.error('简介不能为空')
            return false
        }else if(!showDate){
            message.error('发布日期不能为空')
            return false
        }
        const saveObj = {
            type_id:selectedType,
            title:articleTitle,
            article_content:articleContent,
            introduce:introducemd,
            addTime:showDate,
            id:articleId!==0&&articleId
        }
            httpFetch.post('/addorUpdateArticle',saveObj).then(res=>{
                if(res.data.isScussess==true){
                    setArticleId(res.data.insertId)
                    message.success('save success')
                }
            }).catch(err=>{
                if (err.response.data.data === 'no access') {
                    localStorage.removeItem('openId')
                    props.history.push('/')
                }
            })
        
    }

    
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={18}>
                            <Input
                                placeholder="博客标题"
                                size="large"
                                value={articleTitle}
                                onChange={e=>setArticleTitle(e.target.value)}
                             />
                        </Col>
                        <Col span={6}>
                            &nbsp;
                            <Select placeholder="选择类别" value={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item,index)=>{
                                        return (
                                            <Option key={index} value={item.id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea 
                                value={articleContent}
                                className="markdown-content"
                                rows={30}
                                placeholder="文章内容"
                                onPressEnter={changeContent}
                                onChange={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div 
                                className="show-html"
                                dangerouslySetInnerHTML = {{__html:markdownContent}}
                            >
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span="24">
                            <Button onClick={saveArticle}>暂存文章</Button>
                            &nbsp;
                            <Button type="primary" >发布文章</Button>
                        </Col>
                        <Col span="24">
                            <TextArea
                                rows={4}
                                value={introducemd}
                                placeholder="文章简介"
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                            />
                            <br/><br/>
                            <div className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}></div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="发布时间"
                                    size="large"
                                    value={moment(showDate)}
                                    onChange={(date,_)=>{
                                        setShowDate(moment(date).format('YYYY-MM-DD HH:mm:ss'))
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default AddArticle
import React from 'react';
import Head from 'next/head';
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../static/style/pages/index.css'

const Home=()=>{
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <div>首页</div>
      <Footer />
    </>
  )
}



export default Home
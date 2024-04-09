import Header from '@/component/Header';
import Marquee from '@/component/Marquee';
import Head from 'next/head'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <>
      <Head>
        <title>E-Commerce</title>
        <meta name="description" content="E-Commerce" />
        <meta name='robots' content='noindex, nofollow' />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header user={{ name: 'Shubham'}} />
      <Marquee />
      <main>{children}</main>
    </>
  )
}

export default Layout
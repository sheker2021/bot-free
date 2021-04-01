import Head from 'next/head'
import { useEffect } from 'react'
import Router from 'next/router'

export default function Home() {

  useEffect(() => {
    Router.push('/dashboard');
  }, [])

  return (
      <Head>
        <title>Início - Bot Free</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
  )
}

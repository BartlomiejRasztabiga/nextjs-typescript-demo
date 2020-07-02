import Head from 'next/head'
import Header from '../components/Header'
import Login from '../components/Login'

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Login />
      </main>
    </>
  )
}
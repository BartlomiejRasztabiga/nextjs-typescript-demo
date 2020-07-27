import Head from 'next/head'
import MainLayout from '../layouts/MainLayout'

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Fridgy</title>
      </Head>

      <MainLayout>
        Hello world!
      </MainLayout>
    </>
  )
}
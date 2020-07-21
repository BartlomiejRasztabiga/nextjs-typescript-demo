import Header from '../components/Header'
import Home from '../components/Home'

export default function IndexPage() {
  return (
    <>
      <Header />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Home />
      </main>
    </>
  )
}
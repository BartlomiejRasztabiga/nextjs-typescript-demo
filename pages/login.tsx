import Login from '../components/Login'
import Header from '../components/Header'

export default function LoginPage() {
  return (
    <>
      <Header />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Login />
      </main>
    </>
  )
}
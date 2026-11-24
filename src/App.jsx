import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import Home from './pages/Home'
import { ROUTES } from './constants/routes'
import DocumentLanguage from './components/DocumentLanguage'

function App() {
  return (
    <>
      <DocumentLanguage />
      <main className="overflow-hidden bg-light text-tertiary">
        <ToastContainer />
        <Header />
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.HOME} element={<Home />} />
          {/* <Route path="/menu" element={<Menu />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/place-order" element={<PlaceOrder />}/>
          <Route path="/orders" element={<Orders />}/>
          <Route path="/verify" element={<Verify />}/> */}
        </Routes>
      </main>
    </>
  )
}

export default App

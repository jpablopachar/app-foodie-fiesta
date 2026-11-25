import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import Home from './pages/Home'
import { ROUTES } from './constants/routes'
import DocumentLanguage from './components/DocumentLanguage'
import Menu from './pages/Menu'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Verify from './pages/Verify'

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
          <Route path={ROUTES.MENU} element={<Menu />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route path={ROUTES.PLACE_ORDER} element={<PlaceOrder />} />
          <Route path={ROUTES.ORDERS} element={<Orders />} />
          <Route path={ROUTES.VERIFY} element={<Verify />} />
        </Routes>
      </main>
    </>
  )
}

export default App

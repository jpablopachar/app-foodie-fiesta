import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <main className="overflow-hidden bg-light text-[#404040]">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/login" element={<Login />}/>
        {/* <Route path="/" element={<Home />}/>
        <Route path="/menu" element={<Menu />}/>
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

import { HashRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import AddProduct from "./pages/AddProduct"
import ManageProduct from "./pages/ManageProduct"
import Mobile from "./pages/Mobile"
import Laptop from "./pages/Laptop"
import Others from "./pages/Others"
import Analytics from "./pages/Analytics"

function App() {

  return (
    <HashRouter>

      <div className="flex">
        <NavBar />
        <div className="w-full p-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/add-products' element={<AddProduct />} />
            <Route path='/manage-products' element={<ManageProduct />} />
            <Route path='/mobiles' element={<Mobile />} />
            <Route path='/laptops' element={<Laptop />} />
            <Route path='/others' element={<Others />} />
            <Route path='/analytics' element={<Analytics />} />
          </Routes>
        </div>
      </div>

    </HashRouter>
  )
}

export default App

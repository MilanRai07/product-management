import { HashRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import AddProduct from "./pages/AddProduct"

function App() {

  return (
    <HashRouter>

      <div className="flex">
        <NavBar />
        <div className="w-full p-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/add-products' element={<AddProduct />} />
          </Routes>
        </div>
      </div>

    </HashRouter>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Caravans from './pages/Caravans'
import CaravanDetails from './pages/CaravanDetails'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/caravans' element={<Caravans />} />
          <Route path='/login' element={<Login />} />
          <Route path='/caravans/:id' element={<CaravanDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

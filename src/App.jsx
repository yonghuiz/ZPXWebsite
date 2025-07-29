import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Apartment from './pages/Markets/Apartment'
import Office from './pages/Markets/Office'
import School from './pages/Markets/School'
import GroceryStore from './pages/Markets/GroceryStore'
import MarketAssetManagement from './pages/Markets/AssetManagement'
import Food from './pages/Markets/Food'
import ECommerce from './pages/Markets/ECommerce'
import PackageLocker from './pages/Products/PackageLocker/PackageLocker'
import TakeoutLocker from './pages/Products/TakeoutLocker'
import RefrigeratedLocker from './pages/Products/RefrigeratedLocker'
import AssetManagement from './pages/Products/AssetManagement'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import FAQ from './pages/FAQ/FAQ'
import Register from './pages/Register/Register'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/markets/apartment" element={<Apartment />} />
          <Route path="/markets/office" element={<Office />} />
          <Route path="/markets/school" element={<School />} />
          <Route path="/markets/grocery-store" element={<GroceryStore />} />
          <Route path="/markets/asset-management" element={<MarketAssetManagement />} />
          <Route path="/markets/food" element={<Food />} />
          <Route path="/markets/ecommerce" element={<ECommerce />} />
          <Route path="/products/package-locker" element={<PackageLocker />} />
          <Route path="/products/takeout-locker" element={<TakeoutLocker />} />
          <Route path="/products/refrigerated-locker" element={<RefrigeratedLocker />} />
          <Route path="/products/asset-management" element={<AssetManagement />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

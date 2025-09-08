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
import TakeoutLocker from './pages/Products/TakeoutLocker/TakeoutLocker'
import RefrigeratedLocker from './pages/Products/RefrigeratedLocker'
import AssetManagement from './pages/Products/AssetManagement'
import About from './pages/About/About'
import Gallery from './pages/Gallery/Gallery'
import Contact from './pages/Contact/Contact'
import FAQ from './pages/FAQ/FAQ'
import Register from './pages/Register/Register'

// Account-related imports
import Login from './components/Account/Login.jsx'
import Account from './components/Account/Account.jsx'
import Transactions from './components/Account/Transactions.jsx'
import Profile from './components/Account/Profile.jsx'
import ChangePassword from './components/Account/ChangePassword.jsx'
import Support from './components/Account/Support.jsx'
import Demo from './components/Account/Demo.jsx'
import ForgotPassword from './components/Account/ForgotPassword.jsx'
import Logout from './components/Account/Logout.jsx'
import UserAgreement from './components/UserAgreement.jsx'

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
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/register" element={<Register />} />
          
          {/* Account routes */}
          <Route path="/account" element={<Login />} />
          <Route path="/account/dashboard" element={<Account />} />
          <Route path="/account/transactions" element={<Transactions />} />
          <Route path="/account/Profile" element={<Profile />} />
          <Route path="/account/changepassword" element={<ChangePassword />} />
          <Route path="/account/support" element={<Support />} />
          <Route path="/account/demo" element={<Demo />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/UserAgreement" element={<UserAgreement />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

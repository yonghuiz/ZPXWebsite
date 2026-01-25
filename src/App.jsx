import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ConfigProvider, message, App as AntApp } from 'antd'
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
import Quote from './pages/Register/Quote'
// Account-related imports
import Login from './components/Account/Login'
import Register from './components/Account/Register'
import Account from './components/Account/Account'
import Transactions from './components/Account/Transactions'
import Profile from './components/Account/Profile'
import ChangePassword from './components/Account/ChangePassword'
import Support from './components/Account/Support'
import Demo from './components/Account/Demo'
import ForgotPassword from './components/Account/ForgotPassword'
import Logout from './components/Account/Logout'
import UserAgreement from './components/UserAgreement'

import './App.css'

function AppContent() {
  const location = useLocation();
  // Don't show footer on account pages
  const isAccountPage = location.pathname.startsWith('/account');

  return (
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
        <Route path="/register" element={<Quote />} />
        
        <Route path="/account" element={<Login />} />
        <Route path="/account/dashboard" element={<Account />} />
        <Route path="/account/logout" element={<Logout />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/account/transactions" element={<Transactions />} />
        <Route path="/account/Profile" element={<Profile />} />
        <Route path="/account/changepassword" element={<ChangePassword />} />
        <Route path="/account/support" element={<Support />} />
        <Route path="/account/demo" element={<Demo />} />
        <Route path="/account/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/UserAgreement" element={<UserAgreement />} />
       
      </Routes>
      {!isAccountPage && <Footer />}
    </div>
  );
}

function App() {
  // Configure message globally
  message.config({
    top: 100,
    duration: 3,
    maxCount: 3,
  });

  return (
    <ConfigProvider>
      <AntApp>
        <Router>
          <AppContent />
        </Router>
      </AntApp>
    </ConfigProvider>
  )
}

export default App

import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import Home from './components/Home'
//import Pricing from './components/Pricing'

import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'

import ForgotPassword from './components/ForgotPassword'
import Account from './components/Account/Account'

import Transactions from './components/Account/Transactions'
// import Recharge from './components/Account/Recharge'
import Profile from './components/Account/Profile'

import ChangePassword from './components/Account/ChangePassword'
import Support from './components/Account/Support'
import Demo from './components/Account/Demo'
import UserAgreement from './components/UserAgreement'
// import RechargeRecords from './components/Account/RechargeRecords'
//import UserAgreement from './components/UserAgreement'

import {
  HashRouter as Router,
  Route,
   
} from 'react-router-dom'


class App extends Component {

  renderMainMenu(){
    // if(process.env.REACT_APP_LOCATION==='CHINESE'){
    //   return(
    //     <div>
    //       <Route exact path="/" component={Login} />
         
     
    //     </div>
    //   )
    // } else{
    //   return(
    //     <div>
    //       <Route exact path="/" component={Home} />
          
     
    //     </div>
    //   )
    // }
    return(
          <div>
            <Route exact path="/" component={Login} />
           
       
          </div>
        )
  }
  render() {
    return (
      <Router>
        <div >
          {this.renderMainMenu()}
      
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/account/dashboard" component={Account} />
          <Route path="/account/transactions" component={Transactions} />
          <Route path="/account/demo" component={Demo} />
      
          <Route path="/account/profile" component={Profile} />
          <Route path="/account/changepassword" component={ChangePassword} />
          <Route path="/UserAgreement" component={UserAgreement} />
          {/* <Route path="/account/recharge" component={Recharge} /> */}
          <Route path="/account/support" component={Support} />
          {/* <Route path="/account/rechargerecords" component={RechargeRecords} /> */}
        </div>
      </Router>
    );
  }
}

export default App;

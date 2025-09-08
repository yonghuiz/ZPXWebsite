import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import './Register.css'
 import { Link,Redirect,} from 'react-router-dom'
 import { 
    login,
} from '../config/network.jsx'
import Md5 from '../config/md5.js'
import {Button} from 'reactstrap'
import { showErrorMessage, ModalBox } from './MessageBox';

class Login extends Component {
    constructor(props) {
        super(props);
        let redict_init=false;
        let redictTo_init = null;
        if(localStorage.getItem('accessToken')!=null){
           redict_init=true;
           redictTo_init='/account/dashboard';
        }
        this.state = {
            phone:'',
            email:'',
            psw:'',
            redict:redict_init,
            redictTo:redictTo_init,
        };
        // console.log('accessToken',localStorage.getItem('accessToken'),this.state.redict);

        this.login = this.login.bind(this);
    }
    login(){ 
        //login(this.state.email,this.state.psw)
       login(this.state.email,Md5.digest_s(this.state.psw))
        .then(data=>{
            let isprofile= localStorage.getItem('isProfileCompleted');
            let isemail= localStorage.getItem(' isEmailVerified');
           
            if(isprofile==='1')
             this.setState({redict:true,redictTo:'/account/dashboard'});
            else
            {
             //showErrorMessage.call(this,'Please fill in your personal information');
             this.setState({redict:true,redictTo:'/account/Profile'});
            }
        })
        .catch(error=>{
            //showErrorMessage.call(this,window.appLocale.messages['page.login.submit.err']||'Login error:'+error);
           showErrorMessage.call(this,'Login error:'+error);
        })
    }
    render() {
        if (this.state.redict) {
            return <Redirect to={this.state.redictTo} />;
          }
        return (
            <div >
                <Header page='Login' />
                <div className='register-form'>
                    <form action="/action_page.php">
                        <div>
                        <span className="form-title">
                        {window.appLocale.messages['page.login']||'Login'}                        
                        </span >
                        {process.env.REACT_APP_LOCATION==='CHINESE'?null:
                        <Link className="right" to="/register">  {window.appLocale.messages['page.login.register']||'Register'}</Link>
                        }
                        </div>
                        
                        <hr/>
              {/*          <div className="input-container">
                            <i className="fa fa-phone icon"></i>
                            <input className="input-field" type="text" placeholder={window.appLocale.messages['page.user.phone']||"Phone Number"} name="phone" 
                                onChange={(event)=>this.setState({phone:event.target.value})}
                            />
                    </div> */}
                     <div className="input-container">
                            <i className="fa fa-envelope icon"></i>
                            <input className="input-field" type="text" placeholder={window.appLocale.messages['page.user.email']||"Email"} name="email" 
                                onChange={(event)=>this.setState({email:event.target.value})}
                            />
                    </div>

                        <div className="input-container">
                            <i className="fa fa-key icon"></i>
                            <input className="input-field" type="password" placeholder={window.appLocale.messages['page.user.password']||"Password"} name="psw" 
                                onChange={(event)=>this.setState({psw:event.target.value})}
                            />
                        </div>
                        
                        <Button color='primary' onClick={this.login} block>{window.appLocale.messages['page.login']||'Login'}</Button>
                        
                        <Link to="/ForgotPassword"> {window.appLocale.messages['page.login.forgotpassword']||'Forgot password?'} </Link>
                        
                    </form>
                    { ModalBox.call(this)}
                    
                </div>

                <Footer />
            </div>
        );
    }
}

export default Login;
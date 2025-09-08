import React, { Component } from 'react';
import './Register.css'
import Header from './Header'
import Footer from './Footer'
import { Link, Redirect, } from 'react-router-dom'
import {
    post_data,
    post_data1,
    LOGIN_REGISTER_URL,
    VCODE_SEND_URL,
    LOGIN_CHECKEMAIL_URL,
} from '../config/network.jsx'
import Md5 from '../config/md5.js'
import { Form, Input, Button, Card, Typography, Divider, Space, message, Row, Col } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, SafetyOutlined } from '@ant-design/icons'
import { showErrorMessage, showSuccessMessage, ModalBox } from './MessageBox';

const { Title, Text } = Typography;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            phone: '',
            vcode: '',
            psw: '',
            psw2: '',
            loading: false,
            loading1: false,
            redict: false,
            redictTo: null,
        };
    }

    onFinish = (values) => {
        this.setState({ loading: true });
        
        // Check if email is available
        post_data1(LOGIN_CHECKEMAIL_URL, {
            email: values.email,
        }).then(data => {
            // Register user
            post_data(LOGIN_REGISTER_URL, {
                email: values.email,
                phone: values.phone || '',
                psd1: Md5.digest_s(values.password),
                psd2: Md5.digest_s(values.confirmPassword),
                vcode: values.vcode,
            }).then(data => {
                this.setState({ loading: false });
                message.success('Registration successful! Please login.');
                this.setState({ redict: true, redictTo: '/login' });
            }).catch(error => {
                this.setState({ loading: false });
                message.error('Registration failed: ' + error);
            });
        }).catch(error => {
            this.setState({ loading: false });
            message.error('The email is already registered or invalid');
        });
    };

    sendVCode = () => {
        const form = this.formRef.current;
        const email = form.getFieldValue('email');
        
        if (!email) {
            message.warning('Please enter your email first');
            return;
        }

        this.setState({ loading1: true });
        
        post_data1(LOGIN_CHECKEMAIL_URL, {
            email: email,
        }).then(data => {
            post_data(VCODE_SEND_URL, { email: email })
                .then((data) => {
                    this.setState({ loading1: false });
                    message.success('Verification code sent successfully!');
                })
                .catch((error) => {
                    this.setState({ loading1: false });
                    message.error('Failed to send verification code: ' + error);
                });
        }).catch((error) => {
            this.setState({ loading1: false });
            message.error('The email is already registered or invalid');
        });
    };

    formRef = React.createRef();
   /* sendVCode() {
        post_data(VCODE_SEND_URL, { phone: this.state.phone, type: 1 })
            .then((data) => {
                this.vid = data.vid;
                showSuccessMessage.call(this, window.appLocale.messages['page.user.vcode.send.success'] || "Sent vcode success!");
            })
            .catch((error) => {
                showErrorMessage.call(this, this, window.appLocale.messages['page.user.vcode.send.err'] || "Sent vcode fail," + error);
                console.error(error);
            });
    } */

    sendVCode() {
        if (this.state.email === '') 
        {
            showErrorMessage.call(this, 'Please fill in email information') ;
            return;
        }
        //判断email是否可用  LOGIN_CHECKEMAIL_URL
        this.setState({ loading1: true });
        post_data1(LOGIN_CHECKEMAIL_URL, {
                email: this.state.email,
        
        }).then(data => {
           
        post_data(VCODE_SEND_URL, { email: this.state.email})
            .then((data) => {
                this.setState({ vcode: data.vcode });
                showSuccessMessage.call(this, window.appLocale.messages['page.user.vcode.send.success'] || "Sent vcode success!");
                this.setState({ loading1: false });
            })
            .catch((error) => {
                showErrorMessage.call(this, this, window.appLocale.messages['page.user.vcode.send.err'] || "Sent vcode fail," + error);
                // console.error(error);
                this.setState({ loading1: false });
            });
        
        // setTimeout(() => {
                // this.setState({ loading1: false });
            //   }, 2000);   
    })
    .catch((error) => {
        showErrorMessage.call(this,"The email is already registered or it is not a valid email address");
        
        this.setState({ loading1: false });
    });

}
    check(name, value) {
        if (name === 'email' && value === '') {
            this.setState({ email_err: window.appLocale.messages['page.user.email.err'] || 'Please input valid email address' });
      //      console.log(this.state.email_err);
            
        }else if

        (name === 'phone' && value !=='' && !value.match(/^\d{10,11}$/)) {
       //     this.setState({ phone_err: window.appLocale.messages['page.user.phone.err'] || 'Please input 10 digit phone number' });
       this.setState({ phone_err: 'Please input 10 digit phone number' });
     //       console.log(this.state.phone_err);
        }
        else if (name === 'vcode' && value === '') {
            this.setState({ vcode_err: window.appLocale.messages['page.user.vcode.err'] || 'Please input vcode' });
        }
        else if (name === 'psw' && value.length < 6) {
            this.setState({ psw_err: window.appLocale.messages['page.user.password.err.length'] || 'Please input at least 6 digit password' });
        }
        else if (name === 'psw2' && value !== this.state.psw) {
            this.setState({ psw2_err: window.appLocale.messages['page.user.password.err.notmatch'] || 'Please input the same password' });
        }
        else {
            this.setState({ [name + '_err']: '' })
        }
    }
    handleBlur(name) {
        let value = this.state[name];
        console.log(value, name);
        this.check(name, value);
    }
    handleChange(event) {
        let name = event.target.name;
        let errName = name + '_err';
        let value = event.target.value
        this.setState({ [name]: value });
        //       console.log (value,name,this.state[errName]+'1');
        if (this.state[errName] !== '')
            this.check(name, value);
    }
    handleSubmit(event) {
        event.preventDefault();
        if (!this.canSubmit()) {
            return;
        }
        this.setState({ loading: true });
        //判断email是否可用  LOGIN_CHECKEMAIL_URL
        post_data1(LOGIN_CHECKEMAIL_URL, {
            email: this.state.email,

        }).then(data => {
            post_data(LOGIN_REGISTER_URL, {
                email: this.state.email,
                phone: this.state.phone,
                //psd1: this.state.psw,
                //psd2: this.state.psw2,
                psd1: Md5.digest_s(this.state.psw),
                psd2: Md5.digest_s(this.state.psw2),
                vcode: this.state.vcode,
            }).then(data => {
                this.setState({ loading: false });
                this.setState({ redict: true, redictTo: '/login' });
            }).catch(error => {
                this.setState({ loading: false });
                showErrorMessage.call(this, 'Register error: the code does not match' + error);
            })
            
        }).catch(error => {
            showErrorMessage.call(this,"The email is already registered");
            this.setState({ loading: false });

        })
        /*
        setTimeout(() => {
            this.setState({ loading: false });
          }, 2000);
          */
        //
        /*
        post_data(LOGIN_REGISTER_URL, {
            email: this.state.email,
            phone: this.state.phone,
            //psd1: this.state.psw,
            //psd2: this.state.psw2,
            psd1: Md5.digest_s(this.state.psw),
            psd2: Md5.digest_s(this.state.psw2),
            vcode: this.state.vcode,
            vid: this.vid,
        }).then(data => {
            this.setState({ redict: true, redictTo: '/login' });
        }).catch(error => {
            showErrorMessage.call(this, 'Register error:' + error);
        })
        */


    }
    renderLine(name, placeholder, type, icon) {
        let errName = name + '_err'
        return (
            <div>
                <div className="input-container">
                    <i className={'fa ' + icon + ' icon'}></i>
                    <input className="input-field" type={type} placeholder={placeholder} name={name} onChange={this.handleChange} onBlur={() => this.handleBlur(name)} />
                </div>
                {

                    this.state[errName] === '' ? null :
                        <p className="error-info" id={errName}>{this.state[errName]}</p>
                }
            </div>
        )
    }
    canSubmit() {
        return  this.state.email !== ''
     //       && this.state.vcode !== ''
            && this.state.psw !== ''
       //     && this.state.phone !== ''
            && this.state.psw2 !== ''
            && this.state.email_err === ''
            && this.state.phone_err === ''
    //        && this.state.vcode_err === ''
            && this.state.psw_err === ''
            && this.state.psw2_err === ''
    }
    render_button() {
        if (this.canSubmit())
            return (
            <Button color="primary" type="submit" block onClick={this.handleSubmit} >
               {/*{window.appLocale.messages['page.submit'] || 'Submit'} */}
                    {this.state.loading && <span>Waiting</span>}
                    {!this.state.loading && <span>Submit</span>}
            </Button>)
        else
            return (<Button color="secondary" type="submit" block onClick={this.handleSubmit}>
                {/*{window.appLocale.messages['page.submit'] || 'Submit'} */}
                    {this.state.loading && <span>Waiting</span>}
                    {!this.state.loading && <span>Submit</span>}
            </Button>)
    }
    render() {
        if (this.state.redict) {
            return <Redirect to={this.state.redictTo} />;
        }
        return (
            <div >
                <Header page='Register' />
                <div className='register-form'>
                    <div>
                        <span className="form-title">
                            {window.appLocale.messages['page.register'] || 'Register'}
                        </span >
                        <Link className="right" to="/login"> {window.appLocale.messages['page.login'] || 'Login'}</Link>
                        <p className='form-note'>Note: In order to receive email notification, please add notification@zipcodexpress.com to your email contact list</p>
                      
                    </div>

                    <hr />
                    {this.renderLine('email', window.appLocale.messages['page.user.email'] || 'email', 'email', 'fa-envelope')}
                    {/*this.renderLine('phone', window.appLocale.messages['page.user.phone'] || 'Phone Number', 'text', 'fa-phone')*/}

                    <div className="input-container">
                        <i className="fa fa-commenting icon"></i>
                        <input className="input-field" type="text" placeholder={window.appLocale.messages['page.user.vcode'] || "Verifiation code"} name="vcode" onChange={this.handleChange} onBlur={() => this.handleBlur('vcode')} />
                        <button className="send-code-btn" onClick={this.sendVCode}>
                           {/* {window.appLocale.messages['page.user.vcode.send'] || 'Send Code'}*/}
                           {this.state.loading1 && <span>Waiting</span>}
                           {!this.state.loading1 && <span>Send Code</span>}
                        </button>
                    </div>
                    {
                        this.state.vcode_err === '' ? null :
                            <p className="error-info" id="vcode_err">{this.state.vcode_err}</p>
                    }

                    {this.renderLine('psw', window.appLocale.messages['page.user.password'] || 'Password', 'password', 'fa-key')}
                    {this.renderLine('psw2', window.appLocale.messages['page.user.password2'] || 'Re-enter Password', 'password', 'fa-key')}

                    <p>{window.appLocale.messages['page.register.term.a'] || 'By creating an account you agree to our '}
                        <Link to="/UserAgreement"> {window.appLocale.messages['page.register.term.b'] || 'Terms &amp; Conditions'}</Link>.
                        </p>
                    {
                        
                        this.render_button()
                    }
                    {ModalBox.call(this)}

                </div>
                <Footer />
            </div>
        );
    }
}

export default Register;
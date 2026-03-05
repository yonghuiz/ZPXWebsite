import React, { Component } from 'react';
import './Register.css'
import Header from '../Header/Header'
import { Link, Navigate, } from 'react-router-dom'
import {
    post_data,
    LOGIN_FORGET_PSD,
    LOGIN_RESETPSD_URL,
} from '../../config/network'
import Md5 from '../../config/md5.js'
import { Button } from 'reactstrap'
import { MessageOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { showErrorMessage, showSuccessMessage, ModalBox, openSuccessBox } from './MessageBox';


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.memberId = ''
        this.state = {
            phone: '',
            email: '',
            vcode: '',
            psw: '',
            psw2: '',
            vcode_err: '',
            phone_err: '',
            psw_err: '',
            psw2_err: '',
            loading: false,
        };
        this.sendVCode = this.sendVCode.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.check = this.check.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

    }
    sendVCode(event) {
        if (!this.canSendCode()) return;
        this.setState({ loading: true });
        post_data(LOGIN_FORGET_PSD, { email: this.state.email })
            .then((data) => {
                this.memberId = data.memberId;
                // console.log(this.memberId);
                showSuccessMessage.call(this, window.appLocale.messages['page.user.vcode.send.success'] || "Sent vcode success!");
                this.setState({ loading: false });
            })
            .catch((error) => {
                showErrorMessage.call(this, window.appLocale.messages['page.user.vcode.send.err'] || "Sent vcode fail:" + error);
                console.error(error);
                this.setState({ loading: false });
            });
        event.preventDefault();
    }
    check(name, value) {
        if (name === 'email' && value === '') {
            this.setState({ email_err: window.appLocale.messages['page.user.email.err'] || 'Please input valid email' })
        }
        // if(name==='phone'&&!/^\d{10}$/.test(value)){
        //    if(name==='phone'&&!value.match(/^\d{10,11}$/)){
        //      this.setState({phone_err:window.appLocale.messages['page.user.phone.err']||'Please input 10 digit phone number'})
        //   }
        else if (name === 'vcode' && value === '') {
            this.setState({ vcode_err: window.appLocale.messages['page.user.vcode.err'] || 'Please input vcode' })
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
        this.check(name, value);
    }
    handleChange(event) {
        let name = event.target.name;
        let errName = name + '_err';
        let value = event.target.value
        this.setState({ [name]: value });
        if (this.state[errName] !== '')
            this.check(name, value);
    }
    handleSubmit(event) {
        if (!this.canSubmit()) return;
        // console.log(this.memberId);

        if (this.memberId === '') {
            showErrorMessage.call(this, 'Please enter the correct vcode');
            // return;
        }
        else {
            post_data(LOGIN_RESETPSD_URL, {
                email: this.state.email,
                memberId: this.memberId,
                psd1: Md5.digest_s(this.state.psw),
                psd2: Md5.digest_s(this.state.psw2),
                vcode: this.state.vcode,
                //     vid:this.vid,
            }).then(data => {
                openSuccessBox.call(this, {
                    content: window.appLocale.messages['page.changepassword.submit.success'] || 'Reset password sucessfully.Please relogin.',
                    onOK: () => { this.setState({ redict: true, redictTo: '/account/login' }); }
                })

            }).catch(error => {
                showErrorMessage.call(this, window.appLocale.messages['page.changepassword.submit.err'] || 'Reset password error:' + error);
            })
        }
        event.preventDefault();

    }
    renderLine(name, placeholder, type, icon) {
        let errName = name + '_err'

        // Map FontAwesome classes to Ant Design icons
        let IconComponent;
        if (icon === 'fa-envelope') IconComponent = MailOutlined;
        else if (icon === 'fa-key') IconComponent = LockOutlined;
        else IconComponent = MailOutlined; // fallback

        return (
            <div>
                <div className="input-container">
                    <IconComponent className="icon" />
                    <input className="input-field" type={type} placeholder={placeholder} name={name} onChange={this.handleChange} onBlur={() => this.handleBlur(name)} />
                </div>
                {

                    this.state[errName] === '' ? null :
                        <p className="error-info" id={errName}>{this.state[errName]}</p>
                }
            </div>
        )
    }
    canSendCode() {
        return this.state.email !== ''
    }

    canSubmit() {
        return this.state.email !== ''
            && this.state.vcode !== ''
            && this.state.psw !== ''
            && this.state.psw2 !== ''
            //     &&this.state.phone_err===''
            && this.state.vcode_err === ''
            && this.state.psw_err === ''
            && this.state.psw2_err === ''
    }
    render_button() {
        if (this.canSubmit())
            return (<Button color="primary" type="submit" block >{window.appLocale.messages['page.submit'] || 'Submit'}</Button>)
        else
            return (<Button color="secondary" type="submit" block >{window.appLocale.messages['page.submit'] || 'Submit'}</Button>)
    }
    render() {
        if (this.state.redict) {
            return <Navigate to={this.state.redictTo} replace />;
        }
        return (
            <div className="register-page">
                <Header page='ForgotPassword' />
                <div className='register-form'>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <span className="form-title">
                                {window.appLocale.messages['page.login.forgotpassword'] || 'Forgot Password'}
                            </span >
                            <Link className="right" to="/account/login"> {window.appLocale.messages['page.login'] || 'Login'}</Link>
                        </div>

                        <hr />
                        {this.renderLine('email', window.appLocale.messages['page.user.email'] || 'Phone Number', 'text', 'fa-envelope')}

                        <div className="input-container">
                            <MessageOutlined className="icon" />
                            <input className="input-field" type="text" placeholder={window.appLocale.messages['page.user.vcode'] || "Verifiation code"} name="vcode" onChange={this.handleChange} onBlur={() => this.handleBlur('vcode')} />
                            <button className="send-code-btn" onClick={this.sendVCode}>
                                {/*{window.appLocale.messages['page.user.vcode.send']||'Send Code'}*/}
                                {this.state.loading && <span>Waiting</span>}
                                {!this.state.loading && <span>Send Code</span>}
                            </button>
                        </div>
                        {
                            this.state.vcode_err === '' ? null :
                                <p className="error-info" id="vcode_err">{this.state.vcode_err}</p>
                        }

                        {this.renderLine('psw', window.appLocale.messages['page.user.password'] || 'Password', 'password', 'fa-key')}
                        {this.renderLine('psw2', window.appLocale.messages['page.user.password2'] || 'Re-enter Password', 'password', 'fa-key')}


                        {
                            this.render_button()
                        }
                        {ModalBox.call(this)}

                    </form>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;
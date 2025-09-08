import React, { Component } from 'react';
import './Header.css'
import {
    Link
} from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    renderLogout() {
        if (localStorage.getItem('accessToken') != null) {
            return (
                <li className={this.props.page === 'Logout' ? "current" : "noselect"}> <Link to="/logout">{window.appLocale.messages['page.logout'] || 'Logout'}</Link></li>
            )
        }
        return null;
    }
    renderLogin() {
        if (localStorage.getItem('accessToken') != null) {
            return (

                <li className={this.props.page === 'Login' ? "current" : "noselect"}> <Link to="/account/dashboard"><i class="fa fa-user-circle"></i>{ window.appLocale.messages['page.account'] || 'Account'}</Link></li>
            )
        }
        else {
            return (
                <li className={this.props.page === 'Login' ? "current" : "noselect"}> <Link to="/login">{window.appLocale.messages['page.login'] || 'Login'}</Link></li>
            );
        }

    }
    renderProduct() {
        if (localStorage.getItem('accessToken') != null) {
            return (

                <li className={this.props.page === 'Product' ? "current" : null}> <Link to="/ProductSelect">{window.appLocale.messages['page.product'] || 'Product'}</Link></li>
            )
        }
        else {
            return (
                null
            );
        }

    }
    render_menu() {
        if (process.env.REACT_APP_LOCATION === 'CHINESE') return;
        return (
            <nav>
                <ul>
                    <li className={this.props.page === 'Home' ? "current home" : "home"}> <a href={"https://www.zipcodexpress.com"} >{window.appLocale.messages['page.home'] || 'Home'}</a></li>

                    {/*      <li className={this.props.page==='Pricing'?"current":null}> <Link to="/pricing">{window.appLocale.messages['page.pricing']||'Pricing'}</Link></li>
                   <li className={this.props.page==='Api'?"current":null}> <Link to="/api">API</Link></li> */}
                   
                   {/* this.renderProduct()*/}
                    {this.renderLogin()}
                    {this.renderLogout()}
                </ul>
            </nav>
        )
    }
    render() {
        return (
            <header className="myheader">
                <div className="mycontainer">
                    <div id="branding">
                        <img alt='' src={require("../img/zipcodexpress_logo.png")} />
                    </div>
                    {this.render_menu()}
                </div>
            </header>
        );
    }
}

export default Header;
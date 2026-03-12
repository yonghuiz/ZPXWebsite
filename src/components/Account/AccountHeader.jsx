import React, { Component } from 'react';
import './AccountHeader.css'

import { Navigate, } from 'react-router-dom'
import { logout } from '../../config/network'
import SideNav from './SideNav'
import { FormattedMessage } from 'react-intl';
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons';



class AccountHeader extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('accessToken') == null)
            this.state = {
                redict: true,
                redictTo: '/login',
                sidenav_show: false,
            }
        else
            this.state = {
                redict: false,
                redictTo: null,
                sidenav_show: false,
            };
        this.handleLogout = this.handleLogout.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    handleMenu() {
        this.setState({ sidenav_show: !this.state.sidenav_show });
    }
    handleOverlayClick = () => {
        this.setState({ sidenav_show: false });
    }
    handleLogout() {
        logout();
        this.setState({ redict: true, redictTo: '/login' });
    }
    render() {
        if (this.state.redict) {
            return <Navigate to={this.state.redictTo} replace />;
        }
        return (
            <div>
                <SideNav page={this.props.page}
                    memberData={this.props.memberData}
                    sidenav_show={this.state.sidenav_show}
                    toggle={this.handleMenu}
                    onOverlayClick={this.handleOverlayClick}
                />
                <div className="account-header">
                    <span className="account-title menu" onClick={this.handleMenu}><MenuOutlined />  </span>
                    <span className="account-title">{this.props.title}</span>

                    <span className="logout" onClick={this.handleLogout}><LogoutOutlined /> <FormattedMessage id="page.logout" defaultMessage="Logout" /></span>

                </div>
            </div>
        );
    }
}

export default AccountHeader;
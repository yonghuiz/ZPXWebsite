import React, { Component } from 'react';
import './Account.css'
import './SideNav.css'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';
import { Layout, Menu, Avatar, Typography, Divider } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    UnorderedListOutlined,
    KeyOutlined,
    QuestionCircleOutlined,
    LogoutOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { GET_MEMBER_INFO_URL, get_data_token } from '../../config/network.jsx';

const { Sider } = Layout;
const { Text } = Typography;

class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMinimumProfile: false,
            profileData: null
        };
    }

    componentDidMount() {
        this.checkMinimumProfile();
    }

    checkMinimumProfile = () => {
        // Check if user has minimum required fields: first name, last name, email, phone
        get_data_token(GET_MEMBER_INFO_URL, {})
            .then(data => {
                const profile = data.profile || {};
                const member = data.member || {};
                
                const hasFirstName = profile.firstName && profile.firstName.trim() !== '';
                const hasLastName = profile.lastName && profile.lastName.trim() !== '';
                const hasEmail = member.email && member.email.trim() !== '';
                const hasPhone = member.phone && member.phone.trim() !== '';
                
                const hasMinimumProfile = hasFirstName && hasLastName && hasEmail && hasPhone;
                
                this.setState({ 
                    hasMinimumProfile,
                    profileData: { profile, member }
                });
            })
            .catch(error => {
                console.error('Error checking profile:', error);
                this.setState({ hasMinimumProfile: false });
            });
    }

    getSelectedKey() {
        switch(this.props.page) {
            case 'Account':
                return 'dashboard';
            case 'Profile':
                return 'profile';
            case 'Transactions':
                return 'transactions';
            case 'ChangePassword':
                return 'changepassword';
            case 'Support':
                return 'support';
            default:
                return 'dashboard';
        }
    }

    render() {
        let isprofile = localStorage.getItem('isProfileCompleted');
        const selectedKey = this.getSelectedKey();
        const userEmail = localStorage.getItem('userEmail') || 'User';
        
        // Get user's display name from profile data
        let displayName = userEmail;
        if (this.state.profileData && this.state.profileData.profile) {
            const { firstName, lastName } = this.state.profileData.profile;
            if (firstName && lastName) {
                displayName = `${firstName} ${lastName}`;
            } else if (firstName) {
                displayName = firstName;
            } else if (lastName) {
                displayName = lastName;
            }
        }
        
        // Show full menu if profile is complete OR if user has minimum required fields
        if (isprofile === '1' || this.state.hasMinimumProfile) {
            return (
                <>
                    {/* Mobile Overlay */}
                    {this.props.sidenav_show && (
                        <div 
                            className="mobile-overlay show"
                            onClick={this.props.onOverlayClick}
                        />
                    )}
                    
                    <Sider 
                        width={250}
                        className={this.props.sidenav_show ? 'mobile-show' : ''}
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            zIndex: 999,
                            boxShadow: '2px 0 6px rgba(0,0,0,0.1)'
                        }}
                        theme="light"
                    >
                    {/* Brand Header */}
                    <div className="modern-side-header">
                        <Link to="/" className="brand-link">
                            <img 
                                alt="ZipcodeXpress" 
                                className="modern-brand-img" 
                                src={require("../../img/zipcodexpress_logo.png")} 
                            />
                        </Link>
                    </div>

                    {/* User Profile Section */}
                    <div className="user-profile-section">
                        <Avatar size={48} icon={<UserOutlined />} className="user-avatar" />
                        <div className="user-info">
                            <Text strong className="user-name">{displayName}</Text>
                            <Text type="secondary" className="user-status">
                                {isprofile === '1' ? 'Active Member' : 'Basic Profile'}
                            </Text>
                        </div>
                    </div>

                    <Divider style={{ margin: '16px 0' }} />

                    {/* Navigation Menu */}
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        className="modern-menu"
                        items={[
                            {
                                key: 'dashboard',
                                icon: <DashboardOutlined />,
                                label: <Link to="/account/dashboard">
                                    <FormattedMessage id="d" defaultMessage="Dashboard" />
                                </Link>
                            },
                            {
                                key: 'profile',
                                icon: <UserOutlined />,
                                label: <Link to="/account/profile">
                                    <FormattedMessage id="page.sidnav.title.Profile" defaultMessage="Profile" />
                                </Link>
                            },
                            {
                                key: 'transactions',
                                icon: <UnorderedListOutlined />,
                                label: <Link to="/account/transactions">
                                    <FormattedMessage id="page.sidnav.title.Transactions" defaultMessage="Transactions" />
                                </Link>
                            },
                            {
                                type: 'divider'
                            },
                            {
                                key: 'settings',
                                icon: <SettingOutlined />,
                                label: 'Settings',
                                children: [
                                    {
                                        key: 'changepassword',
                                        icon: <KeyOutlined />,
                                        label: <Link to="/account/changepassword">
                                            <FormattedMessage id="page.sidnav.title.ChangePassword" defaultMessage="Change Password" />
                                        </Link>
                                    },
                                    {
                                        key: 'support',
                                        icon: <QuestionCircleOutlined />,
                                        label: <Link to="/account/support">
                                            <FormattedMessage id="page.sidnav.title.Support" defaultMessage="Support" />
                                        </Link>
                                    }
                                ]
                            },
                            {
                                type: 'divider'
                            },
                            {
                                key: 'logout',
                                icon: <LogoutOutlined />,
                                label: <Link to="/logout">
                                    <FormattedMessage id="page.logout" defaultMessage="Logout" />
                                </Link>,
                                danger: true
                            }
                        ]}
                    />
                </Sider>
                </>
            );
        }
        else {
            // Incomplete profile version
            return (
                <>
                    {/* Mobile Overlay */}
                    {this.props.sidenav_show && (
                        <div 
                            className="mobile-overlay show"
                            onClick={this.props.onOverlayClick}
                        />
                    )}
                    
                    <Sider 
                        width={250}
                        className={this.props.sidenav_show ? 'mobile-show' : ''}
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            zIndex: 999,
                            boxShadow: '2px 0 6px rgba(0,0,0,0.1)'
                        }}
                        theme="light"
                >
                    {/* Brand Header */}
                    <div className="modern-side-header">
                        <Link to="/" className="brand-link">
                            <img 
                                alt="ZipcodeXpress" 
                                className="modern-brand-img" 
                                src={require("../../img/zipcodexpress_logo.png")} 
                            />
                        </Link>
                    </div>

                    {/* User Profile Section */}
                    <div className="user-profile-section">
                        <Avatar size={48} icon={<UserOutlined />} className="user-avatar" />
                        <div className="user-info">
                            <Text strong className="user-name">{displayName}</Text>
                            <Text type="warning" className="user-status">Profile Incomplete</Text>
                        </div>
                    </div>

                    <Divider style={{ margin: '16px 0' }} />

                    {/* Limited Navigation Menu */}
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        className="modern-menu"
                        items={[
                            {
                                key: 'profile',
                                icon: <UserOutlined />,
                                label: <Link to="/account/profile">
                                    <FormattedMessage id="page.sidnav.title.Profile" defaultMessage="Complete Profile" />
                                </Link>
                            },
                            {
                                type: 'divider'
                            },
                            {
                                key: 'logout',
                                icon: <LogoutOutlined />,
                                label: <Link to="/logout">
                                    <FormattedMessage id="page.logout" defaultMessage="Logout" />
                                </Link>,
                                danger: true
                            }
                        ]}
                    />
                </Sider>
                </>
            );
        }
    }
}

export default SideNav;
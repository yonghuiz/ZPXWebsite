import React, { Component } from 'react';
import './Account.css'
import AccountHeader from './AccountHeader';
import { Link, Redirect, } from 'react-router-dom'
import {
    post_data_token,
    LOGIN_CHANGE_PASSWORD,
} from '../../config/network.jsx'
import Md5 from '../../config/md5.js'
import { Card, Form, Input, Button, Row, Col } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { showErrorMessage, ModalBox, openSuccessBox } from '../MessageBox';
import { FormattedMessage } from 'react-intl';



class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redict: false,
            redictTo: '/login',
            loading: false,
        };
        this.formRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.setState({ loading: true });
        
        post_data_token(LOGIN_CHANGE_PASSWORD, {
            oldPsd: Md5.digest_s(values.oldPassword),
            psd1: Md5.digest_s(values.newPassword),
            psd2: Md5.digest_s(values.confirmPassword),
        }).then(data => {
            this.setState({ loading: false });
            openSuccessBox.call(this, {
                content: window.appLocale.messages['page.changepassword.submit.success'] || 'Change password success, please relogin.',
                onOK: () => {
                    localStorage.clear();
                    this.setState({ redict: true, redictTo: '/login' });
                }
            });

        }).catch(error => {
            this.setState({ loading: false });
            showErrorMessage.call(this, window.appLocale.messages['page.changepassword.submit.err'] || 'Change password error: ' + error);
        });
    }
    render() {
        if (this.state.redict) {
            return <Redirect to={this.state.redictTo} />;
        }
        return (
            <div >
                <div className="main">
                    <AccountHeader page={"ChangePassword"} title={<FormattedMessage id="page.sidnav.title.ChangePassword" defaultMessage="Change Password" />} />
                    <div className="main-body">
                        <Row justify="center">
                            <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                                <Card title={<FormattedMessage id="page.sidnav.title.ChangePassword" defaultMessage="Change Password" />}>
                                    <Form
                                        ref={this.formRef}
                                        name="changePassword"
                                        layout="vertical"
                                        onFinish={this.handleSubmit}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label={window.appLocale.messages['page.user.oldpassword'] || 'Old Password'}
                                            name="oldPassword"
                                            rules={[
                                                { required: true, message: window.appLocale.messages['page.user.oldpassword.err'] || 'Please input old password' }
                                            ]}
                                        >
                                            <Input.Password 
                                                prefix={<LockOutlined />} 
                                                placeholder={window.appLocale.messages['page.user.oldpassword'] || 'Old Password'}
                                                size="large"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label={window.appLocale.messages['page.user.newPassword'] || 'New Password'}
                                            name="newPassword"
                                            rules={[
                                                { required: true, message: 'Please input new password' },
                                                { min: 6, message: window.appLocale.messages['page.user.password.err.length'] || 'Please input at least 6 digit password' },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('oldPassword') !== value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('New password cannot be the same as old password'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password 
                                                prefix={<LockOutlined />} 
                                                placeholder={window.appLocale.messages['page.user.newPassword'] || 'New Password'}
                                                size="large"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label={window.appLocale.messages['page.user.newPassword2'] || 'Re-enter New Password'}
                                            name="confirmPassword"
                                            dependencies={['newPassword']}
                                            rules={[
                                                { required: true, message: 'Please confirm your new password' },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('newPassword') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error(window.appLocale.messages['page.user.password.err.notmatch'] || 'Please input the same password'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password 
                                                prefix={<LockOutlined />} 
                                                placeholder={window.appLocale.messages['page.user.newPassword2'] || 'Re-enter New Password'}
                                                size="large"
                                            />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button 
                                                type="primary" 
                                                htmlType="submit" 
                                                size="large"
                                                loading={this.state.loading}
                                                style={{ width: '100%' }}
                                            >
                                                <FormattedMessage id="page.sidnav.title.ChangePassword" defaultMessage="Change Password" />
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    
                                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                                        <Link to="/login">
                                            <FormattedMessage id="page.login" defaultMessage="Login" />
                                        </Link>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
                {ModalBox.call(this)}
            </div>
        );
    }
}

export default ChangePassword;
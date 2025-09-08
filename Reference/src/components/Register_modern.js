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

    render() {
        if (this.state.redict) {
            return <Redirect to={this.state.redictTo} />;
        }
        
        return (
            <div className="register-page">
                <Header page='Register' />
                <div className="register-container">
                    <Card className="register-card" bordered={false}>
                        <div className="register-header">
                            <Title level={2} className="register-title">
                                {window.appLocale.messages['page.register'] || 'Create Account'}
                            </Title>
                            <Text className="register-subtitle">
                                Join us today and start your journey
                            </Text>
                            <div className="register-note">
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                    Note: Please add notification@zipcodexpress.com to your email contact list
                                </Text>
                            </div>
                        </div>

                        <Divider />

                        <Form
                            ref={this.formRef}
                            name="register"
                            className="register-form-modern"
                            onFinish={this.onFinish}
                            layout="vertical"
                            size="large"
                            scrollToFirstError
                        >
                            <Form.Item
                                name="email"
                                label="Email Address"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please enter a valid email!' }
                                ]}
                            >
                                <Input 
                                    prefix={<MailOutlined />} 
                                    placeholder="Enter your email address" 
                                />
                            </Form.Item>

                            <Form.Item
                                name="vcode"
                                label="Verification Code"
                                rules={[{ required: true, message: 'Please input verification code!' }]}
                            >
                                <Row gutter={8}>
                                    <Col span={16}>
                                        <Input 
                                            prefix={<SafetyOutlined />} 
                                            placeholder="Enter verification code" 
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <Button 
                                            type="default" 
                                            onClick={this.sendVCode}
                                            loading={this.state.loading1}
                                            style={{ width: '100%' }}
                                        >
                                            Send Code
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    { required: true, message: 'Please input your password!' },
                                    { min: 6, message: 'Password must be at least 6 characters!' }
                                ]}
                                hasFeedback
                            >
                                <Input.Password 
                                    prefix={<LockOutlined />} 
                                    placeholder="Enter your password" 
                                />
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Please confirm your password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password 
                                    prefix={<LockOutlined />} 
                                    placeholder="Confirm your password" 
                                />
                            </Form.Item>

                            <Form.Item>
                                <Text type="secondary" style={{ fontSize: '13px' }}>
                                    By creating an account you agree to our{' '}
                                    <Link to="/UserAgreement">Terms & Conditions</Link>.
                                </Text>
                            </Form.Item>

                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    className="register-button" 
                                    loading={this.state.loading}
                                    block
                                >
                                    Create Account
                                </Button>
                            </Form.Item>
                        </Form>

                        <div className="register-footer">
                            <Text>Already have an account? </Text>
                            <Link to="/login">
                                {window.appLocale.messages['page.login'] || 'Sign in here'}
                            </Link>
                        </div>
                    </Card>
                    {ModalBox.call(this)}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Register;

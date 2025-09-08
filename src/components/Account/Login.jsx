import React, { Component } from 'react';
import Header from '../Header/Header'
import './Login.css'
 import { Link, Navigate} from 'react-router-dom'
 import { 
    login,
} from '../../config/network'
import Md5 from '../../config/md5.js'
import { Form, Input, Button, Card, Typography, Divider, message } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { showErrorMessage, ModalBox } from './MessageBox';

const { Title, Text } = Typography;

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
            loading: false,
        };

        this.login = this.login.bind(this);
        this.formRef = React.createRef();
    }

    onFinish = (values) => {
        this.setState({ loading: true });
        login(values.email, Md5.digest_s(values.password))
            .then(data => {
                this.setState({ loading: false });
                let isprofile = localStorage.getItem('isProfileCompleted');
                
                if(isprofile === '1') {
                    message.success('Login successful!');
                    this.setState({redict: true, redictTo: '/account/dashboard'});
                } else {
                    message.info('Please complete your profile');
                    this.setState({redict: true, redictTo: '/account/Profile'});
                }
            })
            .catch(error => {
                this.setState({ loading: false });
                message.error('Login error: ' + error);
                showErrorMessage.call(this, 'Login error: ' + error);
            });
    };

    login(){ 
        login(this.state.email,Md5.digest_s(this.state.psw))
        .then(data=>{
            let isprofile= localStorage.getItem('isProfileCompleted');
            let isemail= localStorage.getItem(' isEmailVerified');
           
            if(isprofile==='1')
             this.setState({redict:true,redictTo:'/account/dashboard'});
            else
            {
             this.setState({redict:true,redictTo:'/account/Profile'});
            }
        })
        .catch(error=>{
           showErrorMessage.call(this,'Login error:'+error);
        })
    }
    render() {
        if (this.state.redict) {
            return <Navigate to={this.state.redictTo} replace />;
        }
        
        return (
            <div className="login-page">
                <Header page='Login' />
                <div className="login-container">
                    <Card className="login-card" variant="outlined">
                        <div className="login-header">
                            <Title level={2} className="login-title">
                                {window.appLocale.messages['page.login'] || 'Welcome Back'}
                            </Title>
                            <Text className="login-subtitle">
                                Sign in to your account to continue
                            </Text>
                        </div>

                        <Divider />

                        <Form
                            ref={this.formRef}
                            className="login-form"
                            onFinish={this.onFinish}
                            layout="vertical"
                        >
                            <Form.Item
                                label="Email Address"
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please enter a valid email!' }
                                ]}
                            >
                                <Input 
                                    prefix={<MailOutlined />} 
                                    placeholder={window.appLocale.messages['page.user.email'] || "Enter your email"} 
                                />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password 
                                    prefix={<LockOutlined />} 
                                    placeholder={window.appLocale.messages['page.user.password'] || "Enter your password"} 
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    className="login-button" 
                                    loading={this.state.loading}
                                    block
                                >
                                    {window.appLocale.messages['page.login'] || 'Sign In'}
                                </Button>
                            </Form.Item>
                        </Form>

                        <div className="login-footer">
                            <div className="login-footer-content">
                                <Link to="/ForgotPassword" className="forgot-password-link">
                                    {window.appLocale.messages['page.login.forgotpassword'] || 'Forgot password?'}
                                </Link>
                                
                                {import.meta.env.VITE_LOCATION !== 'CHINESE' && (
                                    <div className="register-link">
                                        <Text>Don't have an account? </Text>
                                        <Link to="/register">
                                            {window.appLocale.messages['page.login.register'] || 'Register here'}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                    {ModalBox.call(this)}
                </div>
            </div>
        );
    }
}

export default Login;
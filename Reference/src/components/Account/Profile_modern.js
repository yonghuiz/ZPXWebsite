import React, { Component } from 'react';
import './Account.css'
import './Profile.css'
import 'antd/dist/antd.css';
import AccountHeader from './AccountHeader';
import {
    Form,
    Input,
    Button,
    message,
    Modal,
    Card,
    Row,
    Col,
    Select,
    Typography,
    Divider,
    Space,
    Avatar,
    Progress,
    Tag,
    Steps
} from 'antd';
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    HomeOutlined,
    EditOutlined,
    SaveOutlined,
    CheckCircleOutlined,
    SafetyOutlined,
    LockOutlined
} from '@ant-design/icons';
import {
    GET_MEMBER_INFO_URL,
    MODIFY_PROFILE,
    get_data_token,
    post_data_token,
    GET_STATELIST,
    post_data,
    VCODE_SEND_URL,
    EMAIL_VERIFY_URL
} from '../../config/network.jsx'

import { Link, Redirect, } from 'react-router-dom'
import { showErrorMessage, ModalBox, showSuccessMessage } from '../MessageBox';

const { Title, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

class Profile extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            memberId: '',
            phone: '',
            email: '',
            first_name: '',
            last_name: '',
            emailverified: false,
            city: '',
            state: '',
            zipcode: '',
            addressline1: '',
            addressline2: '',
            birth: '',
            nickname: '',
            statenames: [],
            selectedState: '',
            selectedStateCode: '',
            householdermember: '',
            redict: false,
            redictTo: null,
            visible: false,
            loading1: false,
            vcode_got: '',
            vcode: '',
            loading: false
        }
    }

    componentDidMount() {
        let isemail = localStorage.getItem('isEmailVerified');
        if (isemail === '1') { 
            this.setState({ emailverified: true }) 
        }
        
        // Load profile data
        get_data_token(GET_MEMBER_INFO_URL, {})
            .then(data => {
                this.setState({
                    memberId: data.member.memberId,
                    phone: data.member.phone,
                    email: data.member.email,
                    first_name: data.profile.firstName,
                    last_name: data.profile.lastName,
                    city: data.profile.city,
                    state: data.profile.state,
                    selectedState: data.profile.state,
                    birth: data.profile.birth,
                    zipcode: data.profile.zipcode,
                    addressline1: data.profile.addressline1,
                    addressline2: data.profile.addressline2,
                    nickname: data.profile.nickName,
                    householdermember: data.profile.householderMember
                });
                
                // Set form values
                if (this.formRef.current) {
                    this.formRef.current.setFieldsValue({
                        phone: data.member.phone,
                        nickname: data.profile.nickName,
                        first_name: data.profile.firstName,
                        last_name: data.profile.lastName,
                        addressline1: data.profile.addressline1,
                        addressline2: data.profile.addressline2,
                        city: data.profile.city,
                        state: data.profile.state,
                        zipcode: data.profile.zipcode,
                        householdermember: data.profile.householderMember
                    });
                }
            })
            .catch(err => showErrorMessage.call(this, 'Get profile error: ' + err));

        // Load states
        post_data(GET_STATELIST, {})
            .then(data => {
                const stateOptions = data.states.map(state => ({
                    key: state.stateName,
                    value: state.stateCode
                }));
                this.setState({ statenames: stateOptions });
            })
            .catch(err => showErrorMessage.call(this, 'Get states error: ' + err));
    }

    onFinish = (values) => {
        this.setState({ loading: true });
        
        const profileData = {
            phone: values.phone || '',
            nickName: values.nickname,
            firstName: values.first_name,
            lastName: values.last_name,
            addressline1: values.addressline1 || '',
            addressline2: values.addressline2 || '',
            city: values.city || '',
            state: values.state || this.state.selectedState,
            zipcode: values.zipcode || '',
            householderMember: values.householdermember || ''
        };

        post_data_token(MODIFY_PROFILE, profileData)
            .then(data => {
                this.setState({ loading: false });
                message.success('Profile updated successfully!');
                // Update local storage if needed
                localStorage.setItem('isProfileCompleted', '1');
            })
            .catch(error => {
                this.setState({ loading: false });
                message.error('Failed to update profile: ' + error);
            });
    };

    sendVCode = () => {
        this.setState({ loading1: true });
        
        post_data(VCODE_SEND_URL, { email: this.state.email })
            .then((data) => {
                this.setState({ 
                    loading1: false,
                    vcode_got: data.vcode,
                    visible: true 
                });
                message.success('Verification code sent successfully!');
            })
            .catch((error) => {
                this.setState({ loading1: false });
                message.error('Failed to send verification code: ' + error);
            });
    };

    handleEmailVerification = (values) => {
        post_data_token(EMAIL_VERIFY_URL, { 
            email: this.state.email, 
            vcode: values.vcode 
        })
        .then(data => {
            this.setState({ 
                emailverified: true, 
                visible: false 
            });
            localStorage.setItem('isEmailVerified', '1');
            message.success('Email verified successfully!');
        })
        .catch(error => {
            message.error('Verification failed: ' + error);
        });
    };

    calculateProfileCompletion = () => {
        const fields = [
            this.state.first_name,
            this.state.last_name,
            this.state.nickname,
            this.state.phone,
            this.state.addressline1,
            this.state.city,
            this.state.state,
            this.state.zipcode
        ];
        
        const completedFields = fields.filter(field => field && field.trim() !== '').length;
        return Math.round((completedFields / fields.length) * 100);
    };

    render() {
        if (this.state.redict) {
            return <Redirect to={this.state.redictTo} />;
        }

        const profileCompletion = this.calculateProfileCompletion();
        const isEmailVerified = this.state.emailverified;

        return (
            <div className="profile-container">
                <AccountHeader page={"Profile"} title="Profile Settings" />
                
                <div className="profile-content">
                    {/* Profile Header */}
                    <Card className="profile-header-card" bordered={false}>
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={8}>
                                <div className="profile-avatar-section">
                                    <Avatar size={120} icon={<UserOutlined />} className="profile-avatar" />
                                    <div className="profile-basic-info">
                                        <Title level={3}>
                                            {this.state.first_name} {this.state.last_name}
                                        </Title>
                                        <Text type="secondary">{this.state.email}</Text>
                                        <div style={{ marginTop: 8 }}>
                                            {isEmailVerified ? (
                                                <Tag color="success" icon={<CheckCircleOutlined />}>
                                                    Email Verified
                                                </Tag>
                                            ) : (
                                                <Tag color="warning">
                                                    Email Not Verified
                                                </Tag>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} md={8}>
                                <Card size="small" className="completion-card">
                                    <div style={{ textAlign: 'center' }}>
                                        <Title level={4}>Profile Completion</Title>
                                        <Progress
                                            type="circle"
                                            percent={profileCompletion}
                                            width={100}
                                            status={profileCompletion === 100 ? "success" : "active"}
                                        />
                                        <div style={{ marginTop: 16 }}>
                                            <Text type="secondary">
                                                Complete your profile to access all features
                                            </Text>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={24} md={8}>
                                <Card size="small" className="quick-actions-small">
                                    <Title level={4}>Quick Actions</Title>
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        {!isEmailVerified && (
                                            <Button 
                                                type="primary" 
                                                icon={<MailOutlined />}
                                                onClick={this.sendVCode}
                                                loading={this.state.loading1}
                                                block
                                            >
                                                Verify Email
                                            </Button>
                                        )}
                                        <Link to="/account/changepassword">
                                            <Button icon={<LockOutlined />} block>
                                                Change Password
                                            </Button>
                                        </Link>
                                    </Space>
                                </Card>
                            </Col>
                        </Row>
                    </Card>

                    {/* Profile Steps */}
                    <Card className="profile-steps-card" bordered={false}>
                        <Steps current={isEmailVerified ? 1 : 0} size="small">
                            <Step 
                                title="Verify Email" 
                                description="Verify your email address"
                                icon={<MailOutlined />}
                            />
                            <Step 
                                title="Complete Profile" 
                                description="Fill in your personal information"
                                icon={<UserOutlined />}
                            />
                            <Step 
                                title="Setup Complete" 
                                description="You're ready to use all features"
                                icon={<CheckCircleOutlined />}
                            />
                        </Steps>
                    </Card>

                    {/* Profile Form */}
                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={16}>
                            <Card 
                                title={
                                    <Space>
                                        <UserOutlined />
                                        <span>Personal Information</span>
                                    </Space>
                                }
                                className="profile-form-card"
                            >
                                <Form
                                    ref={this.formRef}
                                    layout="vertical"
                                    onFinish={this.onFinish}
                                    size="large"
                                >
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="first_name"
                                                label="First Name"
                                                rules={[{ required: true, message: 'Please enter your first name!' }]}
                                            >
                                                <Input prefix={<UserOutlined />} placeholder="Enter your first name" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="last_name"
                                                label="Last Name"
                                                rules={[{ required: true, message: 'Please enter your last name!' }]}
                                            >
                                                <Input prefix={<UserOutlined />} placeholder="Enter your last name" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="nickname"
                                                label="Nickname"
                                                rules={[{ required: true, message: 'Please enter your nickname!' }]}
                                            >
                                                <Input prefix={<UserOutlined />} placeholder="What do you want others to call you?" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="phone"
                                                label="Phone Number"
                                            >
                                                <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Divider orientation="left">Address Information</Divider>

                                    <Form.Item
                                        name="addressline1"
                                        label="Address Line 1"
                                    >
                                        <Input prefix={<HomeOutlined />} placeholder="Enter your street address" />
                                    </Form.Item>

                                    <Form.Item
                                        name="addressline2"
                                        label="Address Line 2"
                                    >
                                        <Input prefix={<HomeOutlined />} placeholder="Apartment, suite, etc. (optional)" />
                                    </Form.Item>

                                    <Row gutter={16}>
                                        <Col xs={24} md={8}>
                                            <Form.Item
                                                name="city"
                                                label="City"
                                            >
                                                <Input placeholder="Enter your city" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Form.Item
                                                name="state"
                                                label="State"
                                            >
                                                <Select
                                                    placeholder="Select your state"
                                                    showSearch
                                                    optionFilterProp="children"
                                                >
                                                    {this.state.statenames.map(state => (
                                                        <Option key={state.value} value={state.key}>
                                                            {state.key}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Form.Item
                                                name="zipcode"
                                                label="ZIP Code"
                                            >
                                                <Input placeholder="Enter your ZIP code" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item
                                        name="householdermember"
                                        label="Householder Member"
                                    >
                                        <Input placeholder="Enter householder member (optional)" />
                                    </Form.Item>

                                    <Form.Item>
                                        <Space>
                                            <Button 
                                                type="primary" 
                                                htmlType="submit" 
                                                icon={<SaveOutlined />}
                                                loading={this.state.loading}
                                                size="large"
                                                disabled={!isEmailVerified}
                                            >
                                                Save Profile
                                            </Button>
                                            {!isEmailVerified && (
                                                <Text type="warning">
                                                    Please verify your email to save changes
                                                </Text>
                                            )}
                                        </Space>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>

                        <Col xs={24} lg={8}>
                            <Card 
                                title="Account Security" 
                                className="security-card"
                            >
                                <Space direction="vertical" style={{ width: '100%' }} size="large">
                                    <div className="security-item">
                                        <div className="security-item-header">
                                            <MailOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
                                            <div>
                                                <Text strong>Email Verification</Text>
                                                <br />
                                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                                    {this.state.email}
                                                </Text>
                                            </div>
                                        </div>
                                        <div>
                                            {isEmailVerified ? (
                                                <Tag color="success" icon={<CheckCircleOutlined />}>
                                                    Verified
                                                </Tag>
                                            ) : (
                                                <Button 
                                                    size="small" 
                                                    type="primary"
                                                    onClick={this.sendVCode}
                                                    loading={this.state.loading1}
                                                >
                                                    Verify Now
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    <Divider />

                                    <div className="security-item">
                                        <div className="security-item-header">
                                            <LockOutlined style={{ fontSize: '20px', color: '#722ed1' }} />
                                            <div>
                                                <Text strong>Password</Text>
                                                <br />
                                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                                    Last changed: Never
                                                </Text>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to="/account/changepassword">
                                                <Button size="small">Change</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                    </Row>

                    {/* Email Verification Modal */}
                    <Modal
                        title="Verify Your Email"
                        open={this.state.visible}
                        footer={null}
                        onCancel={() => this.setState({ visible: false })}
                    >
                        <div style={{ textAlign: 'center', marginBottom: 24 }}>
                            <MailOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                            <div style={{ marginTop: 16 }}>
                                <Text>We've sent a verification code to:</Text>
                                <br />
                                <Text strong>{this.state.email}</Text>
                            </div>
                        </div>
                        
                        <Form onFinish={this.handleEmailVerification} layout="vertical">
                            <Form.Item
                                name="vcode"
                                label="Verification Code"
                                rules={[{ required: true, message: 'Please enter the verification code!' }]}
                            >
                                <Input 
                                    prefix={<SafetyOutlined />} 
                                    placeholder="Enter verification code"
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block size="large">
                                    Verify Email
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>

                    {ModalBox.call(this)}
                </div>
            </div>
        );
    }
}

export default Profile;

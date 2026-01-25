import React, { Component } from 'react';
import './Account.css'
import './Profile.css'
import AccountHeader from './AccountHeader.jsx';
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
    Avatar,
    Progress,
    Tag,
    Steps
} from 'antd';
import {
    CheckCircleOutlined,
    UserOutlined,
    PhoneOutlined,
    HomeOutlined,
    WarningOutlined,
    MailOutlined,
    LockOutlined,
    SafetyCertificateOutlined,
    QuestionCircleOutlined,
    SaveOutlined
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
} from '../../config/network'

import { Link, Navigate, } from 'react-router-dom'
import { showErrorMessage, ModalBox, showSuccessMessage } from './MessageBox';
import { checkAuthToken, handleAuthError, isAuthError } from '../../utils/authUtils';

const { Title, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToLogin: false,
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
            loading: false,
            dataLoaded: false
        }
        this.formRef = React.createRef();
    }

    populateForm = () => {
        // Only populate form if data is loaded and form ref is available
        if (this.state.dataLoaded && this.formRef.current) {
            console.log('Populating form with data:', this.state);

            this.formRef.current.setFieldsValue({
                phone: this.state.phone || '',
                nickname: this.state.nickname || '',
                first_name: this.state.first_name || '',
                last_name: this.state.last_name || '',
                addressline1: this.state.addressline1 || '',
                addressline2: this.state.addressline2 || '',
                city: this.state.city || '',
                state: this.state.state || '',
                zipcode: this.state.zipcode || '',
                householdermember: this.state.householdermember || ''
            });

            // Set selectedStateCode based on the loaded state
            if (this.state.state && this.state.statenames.length > 0) {
                const stateOption = this.state.statenames.find(s => s.key === this.state.state);
                if (stateOption) {
                    this.setState({ selectedStateCode: stateOption.value });
                }
            }
        }
    }

    componentDidMount() {
        if (!checkAuthToken()) {
            this.setState({ redirectToLogin: true });
            return;
        }

        let isemail = localStorage.getItem('isEmailVerified');
        if (isemail === '1') {
            this.setState({ emailverified: true })
        }

        // Load profile data
        get_data_token(GET_MEMBER_INFO_URL, {})
            .then(data => {
                console.log('Profile API response:', data); // Debug log

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
                    householdermember: data.profile.householderMember,
                    dataLoaded: true
                }, () => {
                    // Populate form after state is updated
                    setTimeout(() => this.populateForm(), 100);
                });

                console.log('Profile data loaded successfully');
            })
            .catch(err => {
                if (isAuthError(err)) {
                    handleAuthError(this);
                } else {
                    showErrorMessage.call(this, 'Get profile error: ' + err);
                }
            });

        // Load states
        post_data_token(GET_STATELIST, {})
            .then(data => {
                console.log('States API response:', data); // Debug log
                let stateOptions = [];

                if (data && data.states && Array.isArray(data.states)) {
                    stateOptions = data.states.map(state => ({
                        key: state.stateName,
                        value: state.stateCode
                    }));
                } else if (data && Array.isArray(data)) {
                    // If data is directly an array
                    stateOptions = data.map(state => ({
                        key: state.stateName,
                        value: state.stateCode
                    }));
                } else {
                    console.warn('Unexpected states data format:', data);
                    // Fallback with common US states
                    stateOptions = [
                        { key: 'California', value: 'CA' },
                        { key: 'New York', value: 'NY' },
                        { key: 'Texas', value: 'TX' },
                        { key: 'Florida', value: 'FL' },
                        // Add more states as needed
                    ];
                }

                this.setState({ statenames: stateOptions }, () => {
                    // Try to populate form again now that states are loaded
                    if (this.state.dataLoaded) {
                        setTimeout(() => this.populateForm(), 50);
                    }
                });
            })
            .catch(err => {
                console.error('Get states error:', err);
                showErrorMessage.call(this, 'Get states error: ' + err);
                // Set fallback states even on error
                this.setState({
                    statenames: [
                        { key: 'California', value: 'CA' },
                        { key: 'New York', value: 'NY' },
                        { key: 'Texas', value: 'TX' },
                        { key: 'Florida', value: 'FL' },
                    ]
                }, () => {
                    // Try to populate form again with fallback states
                    if (this.state.dataLoaded) {
                        setTimeout(() => this.populateForm(), 50);
                    }
                });
            });
    }

    componentDidUpdate(prevProps, prevState) {
        // If data just finished loading or form ref just became available, populate the form
        if ((this.state.dataLoaded && !prevState.dataLoaded) ||
            (this.formRef.current && !prevState.dataLoaded && this.state.dataLoaded)) {
            setTimeout(() => this.populateForm(), 100);
        }
    }

    onFinish = (values) => {
        console.log('onFinish called with values:', values); // Debug log
        this.setState({ loading: true });

        // Fix addressline2 format - API expects '**' for empty values
        let addressline2 = values.addressline2;
        if (!addressline2 || addressline2.trim() === '') {
            addressline2 = '**';
        }

        // Find the selected state code from statenames
        let stateCode = this.state.selectedStateCode;
        if (values.state && this.state.statenames.length > 0) {
            const selectedState = this.state.statenames.find(s => s.key === values.state);
            if (selectedState) {
                stateCode = selectedState.value;
            }
        }

        const profileData = {
            firstName: values.first_name,
            lastName: values.last_name,
            nickName: values.nickname || '',
            email: this.state.email, // API requires email field
            phone: values.phone || '',
            zipcode: values.zipcode || '',
            city: values.city || '',
            state: stateCode || this.state.selectedStateCode || '', // Use state code, not name
            addressline1: values.addressline1 || '',
            addressline2: addressline2,
            householderMember: values.householdermember || ''
        };

        console.log('Sending profile data:', profileData); // Debug log

        post_data_token(MODIFY_PROFILE, profileData)
            .then(data => {
                console.log('Profile update successful:', data); // Debug log
                this.setState({ loading: false });
                message.success('Profile updated successfully!');
                // Update local storage if needed
                localStorage.setItem('isProfileCompleted', '1');
            })
            .catch(error => {
                console.error('Profile update failed:', error); // Debug log
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
                    vcode_got: data.vid,
                    visible: true
                });
                message.success('Verification code sent successfully!');
            })
            .catch((error) => {
                this.setState({ loading1: false });
                message.error('Failed to send verification code: ' + error);
            });
    };

    onFinishEmailVerification = (values) => {
        post_data_token(EMAIL_VERIFY_URL, {
            email: this.state.email,
            vcode: values.vcode,
            vid: this.state.vcode_got
        })
            .then(data => {
                this.setState({
                    emailverified: true,
                    visible: false
                });
                localStorage.setItem('isEmailVerified', '1');
                message.success('Email verified successfully!');
                if (this.formRef.current) {
                    this.formRef.current.resetFields(['vcode']);
                }
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
        // Check if we need to redirect to login
        if (this.state.redirectToLogin) {
            return <Navigate to="/login" replace />;
        }

        if (this.state.redict) {
            return <Navigate to={this.state.redictTo} replace />;
        }

        const profileCompletion = this.calculateProfileCompletion();
        const isEmailVerified = this.state.emailverified;

        return (
            <div className="profile-container">
                <AccountHeader page={"Profile"} title="Profile Settings" />

                <div className="profile-content">
                    {/* Profile Header */}
                    <Card className="profile-header-card" variant="outlined">
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
                                                <Tag color="green"><CheckCircleOutlined />Email Verified</Tag>
                                            ) : (
                                                <Tag color="orange">
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
                                    <div className="space-vertical" style={{ width: '100%' }}>
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
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Card>

                    {/* Profile Steps */}
                    <Card className="profile-steps-card" variant="outlined">
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
                                    <div className="space-horizontal">
                                        <UserOutlined />
                                        <span>Personal Information</span>
                                    </div>
                                }
                                className="profile-form-card"
                            >
                                <Form
                                    ref={this.formRef}
                                    layout="vertical"
                                    onFinish={this.onFinish}
                                >
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="First Name"
                                                name="first_name"
                                            >
                                                <Input prefix={<UserOutlined />} placeholder="Enter your first name" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Last Name"
                                                name="last_name"
                                            >
                                                <Input prefix={<UserOutlined />} placeholder="Enter your last name" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Nickname"
                                                name="nickname"
                                            >
                                                <Input prefix={<UserOutlined />} placeholder="What do you want others to call you?" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Phone Number"
                                                name="phone"
                                            >
                                                <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Divider orientation="left">Address Information</Divider>

                                    <Form.Item
                                        label="Address Line 1"
                                        name="addressline1"
                                    >
                                        <Input prefix={<HomeOutlined />} placeholder="Enter your street address" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Address Line 2"
                                        name="addressline2"
                                    >
                                        <Input prefix={<HomeOutlined />} placeholder="Apartment, suite, etc. (optional)" />
                                    </Form.Item>

                                    <Row gutter={16}>
                                        <Col xs={24} md={8}>
                                            <Form.Item
                                                label="City"
                                                name="city"
                                            >
                                                <Input placeholder="Enter your city" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Form.Item
                                                label="State"
                                                name="state"
                                            >
                                                <Select
                                                    placeholder="Select your state"
                                                    showSearch
                                                    optionFilterProp="children"
                                                    onChange={(value) => {
                                                        const selectedState = this.state.statenames.find(s => s.key === value);
                                                        if (selectedState) {
                                                            this.setState({
                                                                selectedState: value,
                                                                selectedStateCode: selectedState.value
                                                            });
                                                        }
                                                    }}
                                                >
                                                    {this.state.statenames && this.state.statenames.map(state => (
                                                        <Option key={state.value} value={state.key}>
                                                            {state.key}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Form.Item
                                                label="ZIP Code"
                                                name="zipcode"
                                            >
                                                <Input placeholder="Enter your ZIP code" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item
                                        label="Householder Member"
                                        name="householdermember"
                                    >
                                        <Input placeholder="Enter householder member (optional)" />
                                    </Form.Item>

                                    <Form.Item>
                                        <div className="space-horizontal">
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                icon={<SaveOutlined />}
                                                loading={this.state.loading}
                                                size="large"
                                                onClick={(e) => {
                                                    console.log('Save button clicked'); // Debug log
                                                    // Let the form handle the submission via htmlType="submit"
                                                }}
                                            >
                                                Save Profile
                                            </Button>
                                            {!isEmailVerified && (
                                                <Text type="warning">
                                                    <WarningOutlined /> Please verify your email for full account access
                                                </Text>
                                            )}
                                        </div>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>

                        <Col xs={24} lg={8}>
                            <Card
                                title="Account Security"
                                className="security-card"
                            >
                                <div className="space-vertical">
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
                                                <Tag color="success">
                                                    <CheckCircleOutlined /> Verified
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
                                </div>
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

                        <Form onFinish={this.onFinishEmailVerification} layout="vertical">
                            <Form.Item
                                label="Verification Code"
                                name="vcode"
                                rules={[{ required: true, message: 'Please enter the verification code!' }]}
                            >
                                <Input
                                    prefix={<SafetyCertificateOutlined />}
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

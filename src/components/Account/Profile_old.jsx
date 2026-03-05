import React, { Component } from 'react';
import './Account.css'
import './Profile.css'
import 'antd/dist/antd.css';
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
    Space,
    Avatar,
    Upload,
    Progress,
    Tag,
    Tooltip
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
    CameraOutlined,
    QuestionCircleOutlined
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
import { showErrorMessage, ModalBox, showSuccessMessage } from './MessageBox.jsx';

const { Title, Text } = Typography;
const { Option } = Select;

class Profile extends Component {

    constructor(props) {
        let redict_init = false;
        let redictTo_init = null;
        super(props);
        this.state = {
            memberId: '',
            phone: '',
            email: '',
            first_name: '',
            last_name: '',
            emailverified: false,
            // company: '',
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
            redict: redict_init,
            redictTo: redictTo_init,
            visible: false,
            loading1: false,
            vcode_got: '',
            vcode: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.rendersendcode = this.rendersendcode.bind(this);
        this.sendVCode = this.sendVCode.bind(this);
        this.handleVcodeSubmit = this.handleVcodeSubmit.bind(this);
        this.handleVcodeChange = this.handleVcodeChange.bind(this);

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    componentDidMount() {
        let isemail = localStorage.getItem('isEmailVerified');
        if (isemail === '1') { this.setState({ emailverified: true }) };
        get_data_token(GET_MEMBER_INFO_URL, {})
            .then(data => {
                this.setState({
                    memberId: data.member.memberId,
                    phone: data.member.phone,
                    email: data.member.email,
                    first_name: data.profile.firstName,
                    last_name: data.profile.lastName,
                    // company: data.profile.company,
                    city: data.profile.city,
                    state: data.profile.state,
                    selectedState: data.profile.state,
                    birth: data.profile.birth,
                    sex: data.profile.sex,
                    nickname: data.profile.nickName,
                    zipcode: data.profile.zipcode,
                    addressline1: data.profile.addressline1,
                    addressline2: data.profile.addressline2,
                    householdermember: data.profile.householderMember
                })

            })
            .catch(err => {
                showErrorMessage.call(this, 'Get member info error,' + err);
            })

        get_data_token(GET_STATELIST, {})
            .then(data => {
                this.setState({ statenames: data.stateList });
                let statesFromApi = data.stateList.map(statename => { return { value: statename.stateCode, key: statename.state } })
                this.setState({ statenames: statesFromApi });
                // this.setState({ selectedStateCode: statesFromApi[0].key });
            })
            .catch(err => {
                showErrorMessage.call(this, 'Get states info,' + err);
            })
        let isprofile = localStorage.getItem('isProfileCompleted');

        if (isprofile === '1') { }
        else
            showErrorMessage.call(this, 'Please complete your profile');
    }

    handleSubmit(event) {

        event.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                // console.log(this.state.selectedState);
                //  console.log(values.addressline2 );
                let addressline2 = values.addressline2;
                if (addressline2 === '') { addressline2 = '**' };
                post_data_token(MODIFY_PROFILE, {
                    firstName: values.first_name,
                    lastName: values.last_name,
                    nickName: values.nickname,
                    email: this.state.email,
                    phone: values.phone,
                    zipcode: values.zipcode,
                    city: values.city,
                    state: this.state.selectedStateCode,
                    addressline1: values.addressline1,
                    addressline2: addressline2,
                    householderMember: values.householdermember
                })
                    .then(data => message.success("Update Success！"),
                        localStorage.setItem('isProfileCompleted', 1),

                        setTimeout(() => {
                            this.setState({ redict: true, redictTo: '/account/dashboard' })
                        }, 1500)
                    )
                    .catch(msg => showErrorMessage.call(this, 'Update error:' + msg))

            }
        });

    }

    handleVcodeChange(event) {

        let name = event.target.name;
        // let errName = name + '_err';
        let value = event.target.value
        this.setState({ [name]: value, ModalText: '' });
        //       console.log (value,name,this.state[errName]+'1');
        // if (this.state[errName] !== '')
        //     this.check(name, value);

    }

    handleVcodeSubmit() {
        let vcode_got = this.state.vcode_got;

        if (vcode_got === undefined || vcode_got === null || vcode_got === '') {
            this.setState({
                ModalText: 'please click Get Code button again',
                // loadcancel: false,
            })
            return;
        }

        if (vcode_got.toString() !== this.state.vcode) {
            this.setState({
                ModalText: 'please input right code',
            })
            return;
        }
        else {
            this.setState({
                ModalText: 'Email verification is successful',

            })
            post_data_token(EMAIL_VERIFY_URL, {
                email: this.state.email,

            })
                .then(data => message.success("Update Success！"),
                    localStorage.setItem('isEmailVerified', 1),
                    this.setState({ emailverified: 1 }))
                .catch(err => showErrorMessage.call(this, 'Update error:' + err))

            setTimeout(() => {
                this.setState({ visible: false, })
            }, 1500);

            return;
        }

    }
    handleCancel = () => {
        // console.log('Clicked cancel button');
        this.setState({
            visible: false
        });
    };

    rendersendcode() {

        return (
            <Modal
                title="Input the verification code "
                visible={this.state.visible}
                onOk={this.handleVcodeSubmit}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" onClick={this.handleVcodeSubmit}>
                        Submit
                    </Button>,
                    <Button
                        type="secondary"
                        onClick={this.sendVCode}
                    >
                        {this.state.loading1 && <span>Waiting</span>}
                        {!this.state.loading1 && <span>Get Code</span>}
                    </Button>,
                ]}
            >
                <Form >
                    <Form.Item label="Verification Code">
                        <Input type="number" placeholder={window.appLocale.messages['page.user.vcode'] || "Verifiation code"} name="vcode" onChange={this.handleVcodeChange} />
                    </Form.Item>
                </Form>
                <p>{this.state.ModalText}</p>
            </Modal>
        )
    }


    sendVCode() {
        this.setState({ loading1: true });

        post_data(VCODE_SEND_URL, { email: this.state.email })
            .then((data) => {
                this.setState({ vcode_got: data.vcode });
                showSuccessMessage.call(this, window.appLocale.messages['page.user.vcode.send.success'] || "Sent vcode success!");
                this.setState({ loading1: false });
            })
            .catch((error) => {
                showErrorMessage.call(this, window.appLocale.messages['page.user.vcode.send.err'] || "Sent vcode fail," + error);
                // console.error(error);
                this.setState({ loading1: false });
            });
    }
    handleStateChange(event) {
        let Vstate = this.state.statenames;
        let selectedstatecode = Vstate.filter(stateitem => (stateitem.key === event.target.value))
        console.log(selectedstatecode[0].value)
        this.setState({ selectedState: event.target.value });
        this.setState({ selectedStateCode: selectedstatecode[0].value });

    }
    render() {
        const { visible, loading } = this.state;
        const { getFieldDecorator } = this.props.form;
        let states = this.state.statenames;
        let optionItems = states.map((item) =>
            <option key={item.value} value={item.key}>{item.key}</option>
        );
        const formItemLayout = {
            labelCol: {
                xs: { span: 16 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 12 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 16,
                    offset: 8,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        if (this.state.redict) {
            return <Redirect to={this.state.redictTo} />;
        }
        return (
            <div>
                <div className="main">
                    <AccountHeader page={"Profile"} title="Profile" />
                    <div className="main-body">
                        <div class="dcard">

                            <div Class="dcard-titile">
                                Sign In Info
                            </div>
                            <div className="dcard-body">
                                <p>
                                    Login Email:        {this.state.email}
                                </p>
                                <p>

                                    {!this.state.emailverified && <Button type="primary" style={{ marginRight: 3 }} onClick={this.showModal}><span>Please verify email</span> </Button>}

                                    {this.rendersendcode()}
                                    {this.state.emailverified && <Button type="secondary" style={{ marginRight: 3 }} disabled><span>Verified</span> </Button>}

                                    {/* <Button type="primary" onClick={this.sendVCode}>

                                        {this.state.emailverified && <span>verifed</span>}  
                                        {!this.state.emailverified && <span>please verify email</span>}
                                    </Button> */}
                                    <Link to="/account/ChangePassword" Class="pull-middle title-link"><Button type="primary">
                                        Change Password
                                    </Button>
                                    </Link>
                                </p>
                            </div>


                        </div>
                        <br /> <br />
                        <div class="dcard">
                            <div Class="dcard-titile">
                                <h4 Class="left">Personal Information</h4>
                            </div>
                            <div className="dcard-body" align='left'>

                                <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                                    <Form.Item label="phone">
                                        {getFieldDecorator('phone', {
                                            initialValue: this.state.phone,
                                            //rules: [{ required: true, message: 'Please input your phone!', whitespace: true }],
                                            rules: [{ required: false, message: '', whitespace: true }],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label={<span> Nickname&nbsp;<Tooltip title="What do you want others to call you?"> <QuestionCircleOutlined /> </Tooltip> </span>}>
                                        {getFieldDecorator('nickname', {
                                            initialValue: this.state.nickname,
                                            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="First Name">
                                        {getFieldDecorator('first_name', {
                                            initialValue: this.state.first_name,
                                            rules: [{ required: true, message: 'Please input your firstname!', whitespace: true }],
                                        })(<Input />)}

                                    </Form.Item>
                                    <Form.Item label="Last Name">
                                        {getFieldDecorator('last_name', {
                                            initialValue: this.state.last_name,
                                            rules: [{ required: true, message: 'Please input your lastname!', whitespace: true }],
                                        })(<Input />)}
                                    </Form.Item>

                                    <Form.Item label="addressline1">
                                        {getFieldDecorator('addressline1', {
                                            initialValue: this.state.addressline1,
                                            //rules: [{ required: true, message: 'Please input your address!', whitespace: true }],
                                            rules: [{ required: false, message: '', whitespace: true }],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="addressline2">
                                        {getFieldDecorator('addressline2', {
                                            initialValue: this.state.addressline2,
                                            rules: [{ required: false, message: '' }],
                                        })
                                            (<Input />)}

                                    </Form.Item>
                                    <Form.Item label="Householder Member">
                                        {getFieldDecorator('householdermember', {
                                            initialValue: this.state.householdermember,
                                            rules: [{ required: false, message: '', whitespace: true }],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="city">
                                        {getFieldDecorator('city', {
                                            initialValue: this.state.city,
                                            //rules: [{ required: true, message: 'Please input your city!', whitespace: true }],
                                            rules: [{ required: false, message: '', whitespace: true }],
                                        })(<Input />)}

                                    </Form.Item>
                                    <Form.Item label="state">

                                        <select value={this.state.selectedState} onChange={this.handleStateChange}>
                                            {optionItems}
                                        </select>
                                    </Form.Item>
                                    <Form.Item label="zipcode">
                                        {getFieldDecorator('zipcode', {
                                            initialValue: this.state.zipcode,
                                            //rules: [{ required: true, message: 'Please input your zipcode!', whitespace: true }],
                                            rules: [{ required: false, message: '', whitespace: true }],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item {...tailFormItemLayout}>
                                        {!this.state.emailverified && <Button key="submit" type="primary" style={{ marginRight: 3 }} disabled><span>Please verify email</span> </Button>}

                                        {this.state.emailverified && <Button key="submit" type="primary" htmlType="submit" ><span>Submit</span> </Button>}
                                        {/* <Button key="submit" type="primary" htmlType="submit">      Submit         </Button> */}

                                    </Form.Item>
                                </Form>
                                {ModalBox.call(this)}
                            </div>
                        </div>
                    </div>
                </div>

            </div >


        );
    }
}

export default Profile;
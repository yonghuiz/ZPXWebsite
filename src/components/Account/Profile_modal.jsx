import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Account.css'
import $ from 'jquery';

import {
    Modal,
    Button,
    Form,
    message,
    Input,

    AutoComplete,
} from 'antd';
//import { Col, Button, Form, FormGroup, Label, Input, } from 'reactstrap';
//import './Profile.css'
import AccountHeader from './AccountHeader';
import {
    GET_MEMBER_INFO_URL,
    MODIFY_PROFILE,
    get_data_token,
    post_data_token,
} from '../../config/network.jsx'
import { Link, Redirect, } from 'react-router-dom'
import { showErrorMessage, showSuccessMessage, ModalBox } from './MessageBox';
import { FormattedMessage } from 'react-intl';
//import './unibox_user.css';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberId: '',
            phone: '',
            email: '',
            first_name: '',
            last_name: '',
            company: '',
            city: '',
            state: '',
            zipcode: '',
            addressline1: '',
            addressline2: '',
            birth: '',
            nickname: '',
            Visible: false,
            action: 'login',
            hasLogined: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        //  console.log (this.state.memberId,this.state.email);
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    componentDidMount() {
        get_data_token(GET_MEMBER_INFO_URL, {})
            .then(data => {
                this.setState({
                    memberId: data.member.memberId,
                    phone: data.member.phone,
                    email: data.member.email,
                    first_name: data.profile.firstName,
                    last_name: data.profile.lastName,
                    company: data.profile.company,
                    city: data.profile.city,
                    state: data.profile.state,
                    birth: data.profile.birth,
                    sex: data.profile.sex,
                    nickname: data.profile.nickName,
                    zipcode: data.profile.zipcode,
                    addressline1: data.profile.addressline1,
                    addressline2: data.profile.addressline2,
                })
              
                //     console.log (this.state.nickname);
            })
           
            .catch(err => {
                message.success("Failed update！");
		this.setModalVisible(false);
              //  showErrorMessage.call(this, 'Get member info error,' + err);
            })
    }
    handleSubmit = e => {
      
        post_data_token(MODIFY_PROFILE, {

            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone: this.state.phone,
            //  _company: this.state.company,
            city: this.state.city,
            state: this.state.state,
            nickname: this.state.nickname,
            zipcode: this.state.zipcode,
            addressline1: this.state.addressline1,
            addressline2: this.state.addressline2,
        })
       .then( message.success("update Success！"))
        this.setState({visible: false,});
      //      .then(data => showSuccessMessage.call(this, <FormattedMessage id="page.profile.update.success" defaultMessage="Update success!" />))
     //       .catch(err => showErrorMessage.call(this, 'Update error:' + err))
        e.preventDefault();
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <div>
                <div className="main">
                    <AccountHeader page={"Profile"} title="Profile" />
                    <div className="main-body">
                        <div class="container-fluid">
                            <div Class="row">
                                <div Class="user_home_body">

                                    <div Class="clearfix">
                                        <h4 Class="pull-left">Sign In Info</h4>
                                        <Link to="/account/ChangePassword" Class="pull-right title-link"><Button type="primary">
                                            Change Password
                                         </Button>
                                        </Link>

                                    </div>

                                    <p>
                                        Login Email:        {this.state.email}
                                    </p>
                                    <hr />
                                    <div Class="clearfix">
                                        <h4 Class="pull-left">Personal Information</h4>
                                        <p Class="pull-right"> <Button type="primary" onClick={this.showModal}>
                                            EDIT
                                         </Button></p>
                                        <Modal
                                            title="Edit Personal information"
                                            visible={this.state.visible}
                                            onOk={this.handleOk}
                                            onCancel={this.handleCancel}
                                        >
                                            <Form id="myForm" {...formItemLayout} onSubmit={this.handleSubmit}>
                                                <Form.Item label="email">
                                                    <Input type="text" id="email" value={this.state.email} onChange={this.handleChange} />
                                                </Form.Item>
                                                <Form.Item label="phone">
                                                    <Input type="phone" id="Phone" value={this.state.phone} onChange={this.handleChange} />
                                                </Form.Item>
                                                <Form.Item label="Nickname">
                                                    <Input type="text" id="nickname" value={this.state.nickname} onChange={this.handleChange} />
                                                </Form.Item>
                                                <Form.Item label="First Name">
                                                    <Input type="text" id="first_name" value={this.state.first_name} onChange={this.handleChange} />
                                                </Form.Item>
                                                <Form.Item label="Last Name">
                                                    <Input type="text" id="last_name" value={this.state.last_name} onChange={this.handleChange} />
                                                </Form.Item>
                                                <Form.Item label="city">
                                                    <Input type="text" id="city" value={this.state.city} onChange={this.handleChange} />
                                                </Form.Item>
                                                <Form.Item label="state">
                                                    <Input type="text" id="state" value={this.state.state} onChange={this.handleChange} />
                                                </Form.Item>
                                                <Form.Item label="zipcode">
                                                    <Input type="text" id="zipcode" value={this.state.zipcode} onChange={this.handleChange} /> </Form.Item>
                                                <Form.Item label="addressline1">
                                                    <Input type="text" id="addressline1" value={this.state.addressline1} onChange={this.handleChange} /> </Form.Item>
                                                <Form.Item label="addressline2">
                                                    <Input type="text" id="addressline2" value={this.state.addressline2} onChange={this.handleChange} /> </Form.Item>
                                                <Form.Item {...tailFormItemLayout}>
                                                    <Button form="myForm" key="submit" type="primary" htmlType="submit">
                                                        Submit
                                                   </Button>
                                                </Form.Item>
                                            </Form>
                                        </Modal>
                                    </div>

                                    <div Class="clearfix row text-userinfo">
                                        <div Class="col-xs-6"><span>Nick Name :</span>{this.state.nickname} </div>
                                        <div Class="col-xs-6"><span>Sex :</span>{this.state.sex} </div>
                                        <div Class="col-xs-6"><span>First Name: </span>{this.state.first_name}</div>
                                        <div Class="col-xs-6"><span>Last Name :</span>{this.state.last_name} </div>
                                        <div Class="col-xs-12"><span>Address 1 :</span>{this.state.addressline1}</div>
                                        <div Class="col-xs-12"><span>Address 2 :</span>{this.state.addressline2}</div>
                                        <div Class="col-xs-6"><span>City :</span>{this.state.city} </div>
                                        <div Class="col-xs-6"><span>State :</span>{this.state.state}</div>
                                        <div Class="col-xs-6"><span>Zip Code :</span>{this.state.zipcode}</div>
                                        <div Class="col-xs-6"><span>Birth :</span>{this.state.birth}</div>
                                        <div Class="col-xs-6"><span>Phone :</span>{this.state.phone}</div>
                                    </div>
                                    <hr />
                                    <div >
                                    </div>
                                </div>
                            </div>
                        </div>
                       <hr />
                    </div>
                </div>
            </div>


        );
    }
}

export default Profile;
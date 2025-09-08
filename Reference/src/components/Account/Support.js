import React, { Component } from 'react';
import { showSuccessMessage, showErrorMessage, ModalBox } from '../MessageBox';
import AccountHeader from './AccountHeader';
import { Card, Form, Input, Button, Row, Col } from 'antd';
import { MailOutlined, MessageOutlined } from '@ant-design/icons';
import {POST_SUPPORT_URL,post_data_token} from '../../config/network.jsx'
import {FormattedMessage} from 'react-intl';


class Support extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: false,
         };
         this.formRef = React.createRef();
         this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(values) {
        this.setState({ loading: true });
        
        post_data_token(POST_SUPPORT_URL, {
            email: values.email,
            content: values.content,
        })
        .then(data => {
            this.setState({ loading: false });
            showSuccessMessage.call(this, window.appLocale.messages['page.support.submit.success'] || 'Submit successfully! We will reply you as soon as possible.');
            this.formRef.current.resetFields();
        })
        .catch(err => {
            this.setState({ loading: false });
            showErrorMessage.call(this, window.appLocale.messages['page.user.support.submit.err'] || 'Submit error: ' + err);
        });
    }
    render() {
        return (
            <div >
                <div className="main">
                    <AccountHeader page={"Support"} title='Support' />
                    <div className="main-body">
                        <Row justify="center">
                            <Col xs={24} sm={20} md={18} lg={16} xl={14}>
                                <Card title="Support" style={{ borderRadius: '8px' }}>
                                    <Form
                                        ref={this.formRef}
                                        name="support"
                                        layout="vertical"
                                        onFinish={this.handleSubmit}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label={<FormattedMessage id="page.support.email" defaultMessage="Your Email"/>}
                                            name="email"
                                            rules={[
                                                { required: true, message: window.appLocale.messages['page.support.email.err'] || 'Please input your email' },
                                                { type: 'email', message: 'Please input a valid email address' }
                                            ]}
                                        >
                                            <Input 
                                                prefix={<MailOutlined />}
                                                placeholder={window.appLocale.messages['page.support.email'] || 'Your Email'}
                                                size="large"
                                            />
                                        </Form.Item>
                                        
                                        <Form.Item
                                            label={<FormattedMessage id="page.support.content" defaultMessage="Content"/>}
                                            name="content"
                                            rules={[
                                                { required: true, message: window.appLocale.messages['page.support.content.err'] || 'Please input content' },
                                                { min: 10, message: 'Please input at least 10 characters' }
                                            ]}
                                        >
                                            <Input.TextArea 
                                                placeholder={window.appLocale.messages['page.support.content'] || 'Please describe your issue or question...'}
                                                rows={6}
                                                showCount
                                                maxLength={1000}
                                            />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button 
                                                type="primary" 
                                                htmlType="submit" 
                                                size="large"
                                                loading={this.state.loading}
                                                icon={<MessageOutlined />}
                                                style={{ width: '100%' }}
                                            >
                                                <FormattedMessage id="page.submit" defaultMessage="Submit"/>
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                        {ModalBox.call(this)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Support;
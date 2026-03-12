import React, { Component } from 'react';
import './Account.css';
import AccountHeader from './AccountHeader';
import { Navigate } from 'react-router-dom';
import {
    Card,
    Button,
    List,
    Modal,
    Form,
    Input,
    message,
    Tag,
    Space,
    Typography,
    Popconfirm,
    Empty,
    Spin,
    Row,
    Col,
    Alert
} from 'antd';
import {
    CreditCardOutlined,
    PlusOutlined,
    DeleteOutlined,
    StarOutlined,
    StarFilled,
    SafetyCertificateOutlined
} from '@ant-design/icons';
import {
    GET_CARD_LIST_URL,
    ADD_CARD_URL,
    SET_DEFAULT_CARD_URL,
    DELETE_CARD_URL,
    get_data_token,
    post_data_token
} from '../../config/network.jsx';
import { checkAuthToken } from '../../utils/authUtils';

const { Title, Text } = Typography;

class PaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToLogin: false,
            loading: true,
            cardList: [],
            addCardModalVisible: false,
            processing: false
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        if (!checkAuthToken()) {
            this.setState({ redirectToLogin: true });
            return;
        }
        this.loadCardList();
    }

    loadCardList = () => {
        this.setState({ loading: true });
        get_data_token(GET_CARD_LIST_URL, {})
            .then(data => {
                this.setState({
                    cardList: data.cardList || [],
                    loading: false
                });
            })
            .catch(err => {
                message.error('Failed to load payment methods: ' + err);
                this.setState({ loading: false });
            });
    }

    showAddCardModal = () => {
        this.setState({ addCardModalVisible: true });
    }

    handleAddCard = (values) => {
        this.setState({ processing: true });

        const cardData = {
            cardNum: values.cardNum.replace(/\s/g, ''), // Remove spaces
            cardHolderName: values.cardHolderName,
            expDate: values.expDate, // Format: MMYY
            cvv2: values.cvv2,
            zipcode: values.zipcode,
            isDefault: this.state.cardList.length === 0 ? '1' : '0' // First card is default
        };

        post_data_token(ADD_CARD_URL, cardData)
            .then(data => {
                message.success('Payment method added successfully');
                this.setState({
                    addCardModalVisible: false,
                    processing: false
                });
                this.formRef.current?.resetFields();
                this.loadCardList();
            })
            .catch(err => {
                message.error('Failed to add payment method: ' + err);
                this.setState({ processing: false });
            });
    }

    handleSetDefault = (cardId) => {
        post_data_token(SET_DEFAULT_CARD_URL, { cardId })
            .then(data => {
                message.success('Default payment method updated');
                this.loadCardList();
            })
            .catch(err => {
                message.error('Failed to set default payment method: ' + err);
            });
    }

    handleDeleteCard = (cardId) => {
        post_data_token(DELETE_CARD_URL, { cardId })
            .then(data => {
                message.success('Payment method removed');
                this.loadCardList();
            })
            .catch(err => {
                message.error('Failed to remove payment method: ' + err);
            });
    }

    getCardIcon = (cardType) => {
        // Return appropriate icon or image based on card type
        return <CreditCardOutlined style={{ fontSize: '24px' }} />;
    }

    formatCardNumber = (value) => {
        // Format card number as user types: XXXX XXXX XXXX XXXX
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    }

    formatExpDate = (value) => {
        // Format expiry date as MM/YY
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
        }
        return v;
    }

    render() {
        if (this.state.redirectToLogin) {
            return <Navigate to="/account/login" />;
        }

        const { loading, cardList, addCardModalVisible, processing } = this.state;

        return (
            <div className="main">
                <AccountHeader page="PaymentMethod" title="Payment Methods" />

                <div className="main-body" style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
                    {/* Security Notice */}
                    <Alert
                        message="Secure Payment Processing"
                        description="Your payment information is encrypted and processed securely through Authorize.Net. We never store your full card number or CVV."
                        type="info"
                        icon={<SafetyCertificateOutlined />}
                        showIcon
                        style={{ marginBottom: '24px' }}
                    />

                    {/* Add Card Button */}
                    <div style={{ marginBottom: '24px' }}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={this.showAddCardModal}
                            size="large"
                        >
                            Add Payment Method
                        </Button>
                    </div>

                    {/* Card List */}
                    <Card title="Your Payment Methods">
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '50px' }}>
                                <Spin size="large" />
                            </div>
                        ) : cardList.length === 0 ? (
                            <Empty
                                description="No payment methods yet"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            >
                                <Button type="primary" onClick={this.showAddCardModal}>
                                    Add Your First Card
                                </Button>
                            </Empty>
                        ) : (
                            <List
                                itemLayout="horizontal"
                                dataSource={cardList}
                                renderItem={card => (
                                    <List.Item
                                        actions={[
                                            card.isDefault !== '1' && (
                                                <Button
                                                    type="link"
                                                    icon={<StarOutlined />}
                                                    onClick={() => this.handleSetDefault(card.cardId)}
                                                >
                                                    Set Default
                                                </Button>
                                            ),
                                            <Popconfirm
                                                title="Remove this payment method?"
                                                description="This action cannot be undone."
                                                onConfirm={() => this.handleDeleteCard(card.cardId)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button
                                                    type="link"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                >
                                                    Remove
                                                </Button>
                                            </Popconfirm>
                                        ].filter(Boolean)}
                                    >
                                        <List.Item.Meta
                                            avatar={this.getCardIcon(card.cardType)}
                                            title={
                                                <Space>
                                                    <Text strong>{card.cardType}</Text>
                                                    <Text type="secondary">•••• {card.cardLast4}</Text>
                                                    {card.isDefault === '1' && (
                                                        <Tag icon={<StarFilled />} color="blue">
                                                            Default
                                                        </Tag>
                                                    )}
                                                    {card.status === '1' && (
                                                        <Tag color="warning">Inactive</Tag>
                                                    )}
                                                </Space>
                                            }
                                            description={
                                                <Space direction="vertical" size={0}>
                                                    <Text type="secondary">{card.cardHolderName}</Text>
                                                    <Text type="secondary" style={{ fontSize: '12px' }}>
                                                        Added {new Date(card.createTime * 1000).toLocaleDateString()}
                                                    </Text>
                                                </Space>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        )}
                    </Card>
                </div>

                {/* Add Card Modal */}
                <Modal
                    title="Add Payment Method"
                    open={addCardModalVisible}
                    onCancel={() => {
                        this.setState({ addCardModalVisible: false });
                        this.formRef.current?.resetFields();
                    }}
                    footer={null}
                    width={600}
                >
                    <Form
                        ref={this.formRef}
                        layout="vertical"
                        onFinish={this.handleAddCard}
                    >
                        <Form.Item
                            label="Card Number"
                            name="cardNum"
                            rules={[
                                { required: true, message: 'Please enter card number' },
                                {
                                    pattern: /^[0-9\s]{13,19}$/,
                                    message: 'Please enter a valid card number'
                                }
                            ]}
                        >
                            <Input
                                prefix={<CreditCardOutlined />}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                                onChange={(e) => {
                                    const formatted = this.formatCardNumber(e.target.value);
                                    this.formRef.current?.setFieldsValue({ cardNum: formatted });
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Cardholder Name"
                            name="cardHolderName"
                            rules={[
                                { required: true, message: 'Please enter cardholder name' }
                            ]}
                        >
                            <Input placeholder="John Doe" />
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Expiry Date"
                                    name="expDate"
                                    rules={[
                                        { required: true, message: 'Required' },
                                        {
                                            pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                                            message: 'Format: MMYY'
                                        }
                                    ]}
                                    tooltip="Format: MMYY (e.g., 1025 for October 2025)"
                                >
                                    <Input
                                        placeholder="MMYY"
                                        maxLength={5}
                                        onChange={(e) => {
                                            const formatted = this.formatExpDate(e.target.value);
                                            // Remove slash for API submission
                                            const apiFormat = formatted.replace('/', '');
                                            this.formRef.current?.setFieldsValue({ expDate: apiFormat });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="CVV"
                                    name="cvv2"
                                    rules={[
                                        { required: true, message: 'Required' },
                                        {
                                            pattern: /^[0-9]{3,4}$/,
                                            message: '3-4 digits'
                                        }
                                    ]}
                                >
                                    <Input
                                        placeholder="123"
                                        maxLength={4}
                                        type="password"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="ZIP Code"
                            name="zipcode"
                            rules={[
                                { required: true, message: 'Please enter ZIP code' },
                                {
                                    pattern: /^[0-9]{5}$/,
                                    message: 'Please enter a valid 5-digit ZIP code'
                                }
                            ]}
                        >
                            <Input placeholder="12345" maxLength={5} />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 0 }}>
                            <Space>
                                <Button type="primary" htmlType="submit" loading={processing}>
                                    Add Card
                                </Button>
                                <Button onClick={() => {
                                    this.setState({ addCardModalVisible: false });
                                    this.formRef.current?.resetFields();
                                }}>
                                    Cancel
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default PaymentMethod;

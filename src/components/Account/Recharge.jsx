import React, { Component } from 'react';
import './Account.css'
import AccountHeader from './AccountHeader';
import { Navigate } from 'react-router-dom'
import {
    Alert,
    Button,
    Card,
    Col,
    Empty,
    List,
    Modal,
    Row,
    Space,
    Spin,
    Tag,
    Typography,
    message,
} from 'antd';
import {
    CreditCardOutlined,
    DollarOutlined,
    PlusOutlined,
    SafetyCertificateOutlined,
    StarFilled,
} from '@ant-design/icons';
import {
    GET_CARD_LIST_URL,
    GET_RECHARGE_CONFIG_URL,
    RECHARGE_WALLET_URL,
    get_data_token,
} from '../../config/network.jsx'
import { ModalBox } from './MessageBox'
import { checkAuthToken } from '../../utils/authUtils';

const { Title, Text } = Typography;

class Recharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null,
            redirectToLogin: false,
            loading: true,
            processing: false,
            cardList: [],
            rechargeOptions: [],
            selectedCardId: null,
            selectedAmount: null,
            confirmVisible: false,
        };
    }

    componentDidMount() {
        if (!checkAuthToken()) {
            this.setState({ redirectToLogin: true, redirectTo: '/account/login' });
            return;
        }

        this.loadRechargeData();
    }

    loadRechargeData = () => {
        this.setState({ loading: true });

        Promise.all([
            get_data_token(GET_CARD_LIST_URL, {}),
            get_data_token(GET_RECHARGE_CONFIG_URL, {}),
        ])
            .then(([cardData, rechargeData]) => {
                const cardList = cardData.cardList || [];
                const rechargeOptions = Array.isArray(rechargeData)
                    ? rechargeData
                    : rechargeData.amountList || rechargeData.list || [];
                const defaultCard = cardList.find(card => card.isDefault === '1') || cardList[0] || null;
                const defaultAmount = rechargeOptions[0]?.amount || null;

                this.setState({
                    cardList,
                    rechargeOptions,
                    selectedCardId: defaultCard ? defaultCard.cardId : null,
                    selectedAmount: defaultAmount,
                    loading: false,
                });
            })
            .catch(err => {
                message.error('Failed to load recharge options: ' + err);
                this.setState({ loading: false });
            });
    }

    handleRecharge = () => {
        const { selectedAmount, selectedCardId } = this.state;

        if (!selectedCardId) {
            message.error('Please add or select a payment method first.');
            return;
        }

        if (!selectedAmount) {
            message.error('Please select a recharge amount.');
            return;
        }

        this.setState({ confirmVisible: true });
    }

    confirmRecharge = () => {
        const { selectedAmount, selectedCardId } = this.state;

        this.setState({ processing: true, confirmVisible: false });

        get_data_token(RECHARGE_WALLET_URL, {
            cardId: selectedCardId,
            amount: selectedAmount,
        })
            .then(data => {
                const newBalance = data.money ?? data.total ?? selectedAmount;
                message.success(`Recharge successful. Wallet balance: $${Number(newBalance).toFixed(2)}`);
                this.setState({
                    processing: false,
                    redirectToLogin: true,
                    redirectTo: '/account/wallet',
                });
            })
            .catch(err => {
                message.error('Recharge failed: ' + err);
                this.setState({ processing: false });
            });
    }

    getSelectedCard() {
        return this.state.cardList.find(card => card.cardId === this.state.selectedCardId) || null;
    }

    renderAmountOptions() {
        if (this.state.rechargeOptions.length === 0) {
            return (
                <Empty
                    description="No recharge amounts available right now"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            );
        }

        return (
            <Row gutter={[16, 16]}>
                {this.state.rechargeOptions.map(option => {
                    const isSelected = this.state.selectedAmount === option.amount;
                    return (
                        <Col xs={24} sm={12} lg={8} key={option.amount}>
                            <Card
                                hoverable
                                className={isSelected ? 'amount-card selected' : 'amount-card'}
                                onClick={() => this.setState({ selectedAmount: option.amount })}
                            >
                                <div className="amount-card-content">
                                    <Title level={3} style={{ marginBottom: 8 }}>${option.amount}</Title>
                                    <div className="bonus-info">
                                        {option.plus > 0 && <Tag color="green">+${option.plus} bonus</Tag>}
                                        {option.plusUbi > 0 && <Tag color="gold">+{option.plusUbi} UBI</Tag>}
                                        {(!option.plus || option.plus <= 0) && (!option.plusUbi || option.plusUbi <= 0) && (
                                            <Text type="secondary">Standard recharge</Text>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        );
    }

    renderCardList() {
        if (this.state.cardList.length === 0) {
            return (
                <Empty
                    description="No saved Authorize.Net payment methods"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                >
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => this.setState({ redirectToLogin: true, redirectTo: '/account/paymentmethod' })}
                    >
                        Add Payment Method
                    </Button>
                </Empty>
            );
        }

        return (
            <List
                itemLayout="horizontal"
                dataSource={this.state.cardList}
                renderItem={card => {
                    const isSelected = this.state.selectedCardId === card.cardId;
                    return (
                        <List.Item
                            onClick={() => this.setState({ selectedCardId: card.cardId })}
                            style={{
                                cursor: 'pointer',
                                border: isSelected ? '1px solid #1677ff' : '1px solid #f0f0f0',
                                borderRadius: 8,
                                padding: 16,
                                marginBottom: 12,
                                background: isSelected ? '#f0f7ff' : '#fff',
                            }}
                        >
                            <List.Item.Meta
                                avatar={<CreditCardOutlined style={{ fontSize: 24, color: '#1677ff' }} />}
                                title={
                                    <Space>
                                        <Text strong>{card.cardType}</Text>
                                        <Text type="secondary">•••• {card.cardLast4}</Text>
                                        {card.isDefault === '1' && (
                                            <Tag color="blue" icon={<StarFilled />}>
                                                Default
                                            </Tag>
                                        )}
                                        {isSelected && <Tag color="processing">Selected</Tag>}
                                    </Space>
                                }
                                description={card.cardHolderName}
                            />
                        </List.Item>
                    );
                }}
            />
        );
    }

    render() {
        if (this.state.redirectToLogin) {
            return <Navigate to={this.state.redirectTo} replace />;
        }

        const selectedCard = this.getSelectedCard();

        return (
            <div>
                <div className="main">
                    <AccountHeader page={"Recharge"} title="Recharge" />
                    <div className="main-body" style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
                        {this.state.loading ? (
                            <div style={{ textAlign: 'center', padding: '60px 0' }}>
                                <Spin size="large" />
                            </div>
                        ) : (
                            <Space direction="vertical" size={24} style={{ width: '100%' }}>
                                <Alert
                                    message="Secure Recharge"
                                    description="Wallet recharges use your saved Authorize.Net payment methods. Select a saved card and recharge amount to continue."
                                    type="info"
                                    icon={<SafetyCertificateOutlined />}
                                    showIcon
                                />

                                <Card title="1. Choose Recharge Amount">
                                    {this.renderAmountOptions()}
                                </Card>

                                <Card
                                    title="2. Choose Payment Method"
                                    extra={
                                        <Button
                                            type="link"
                                            onClick={() => this.setState({ redirectToLogin: true, redirectTo: '/account/paymentmethod' })}
                                        >
                                            Manage Cards
                                        </Button>
                                    }
                                >
                                    {this.renderCardList()}
                                </Card>

                                <Card>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                                        <div>
                                            <Text type="secondary">Selected amount</Text>
                                            <Title level={3} style={{ margin: 0 }}>
                                                {this.state.selectedAmount ? `$${this.state.selectedAmount}` : 'Not selected'}
                                            </Title>
                                        </div>
                                        <Button
                                            type="primary"
                                            size="large"
                                            icon={<DollarOutlined />}
                                            onClick={this.handleRecharge}
                                            loading={this.state.processing}
                                            disabled={!this.state.selectedCardId || !this.state.selectedAmount}
                                        >
                                            Recharge Now
                                        </Button>
                                    </div>
                                </Card>
                            </Space>
                        )}
                    </div>
                    <Modal
                        title="Confirm Recharge"
                        open={this.state.confirmVisible}
                        onCancel={() => this.setState({ confirmVisible: false })}
                        footer={[
                            <Button key="cancel" onClick={() => this.setState({ confirmVisible: false })}>
                                Cancel
                            </Button>,
                            <Button
                                key="add-card"
                                onClick={() => this.setState({
                                    confirmVisible: false,
                                    redirectToLogin: true,
                                    redirectTo: '/account/paymentmethod'
                                })}
                            >
                                Add New Card
                            </Button>,
                            <Button
                                key="confirm"
                                type="primary"
                                icon={<DollarOutlined />}
                                loading={this.state.processing}
                                onClick={this.confirmRecharge}
                            >
                                Confirm Recharge
                            </Button>
                        ]}
                    >
                        <Space direction="vertical" size={12} style={{ width: '100%' }}>
                            <Alert
                                type="info"
                                showIcon
                                message="Review your recharge details"
                                description="Authorize.Net will charge the selected saved card and add the amount to your wallet."
                            />
                            <div>
                                <Text type="secondary">Amount</Text>
                                <Title level={4} style={{ margin: 0 }}>
                                    {this.state.selectedAmount ? `$${this.state.selectedAmount}` : 'Not selected'}
                                </Title>
                            </div>
                            <div>
                                <Text type="secondary">Payment Method</Text>
                                <Title level={5} style={{ margin: 0 }}>
                                    {selectedCard
                                        ? `${selectedCard.cardType || 'Card'} •••• ${selectedCard.cardLast4}`
                                        : 'No card selected'}
                                </Title>
                                {selectedCard && (
                                    <Text type="secondary">{selectedCard.cardHolderName}</Text>
                                )}
                            </div>
                            <Text type="secondary">
                                Need a different card? Choose Add New Card to go to payment methods first.
                            </Text>
                        </Space>
                    </Modal>
                    {ModalBox.call(this)}
                </div>
            </div>
        );
    }
}

export default Recharge;
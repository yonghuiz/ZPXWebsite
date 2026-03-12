import React, { Component } from 'react';
import './Account.css';
import './Wallet.css';
import AccountHeader from './AccountHeader';
import { Navigate } from 'react-router-dom';
import {
    Card,
    Button,
    Row,
    Col,
    Statistic,
    Space,
    Table,
    Tag,
    message,
    Alert,
    Spin,
    Typography,
    Empty
} from 'antd';
import {
    WalletOutlined,
    DollarOutlined,
    InfoCircleOutlined,
    GiftOutlined
} from '@ant-design/icons';
import {
    GET_WALLET_URL,
    GET_STATEMENT_LIST,
    get_data_token
} from '../../config/network.jsx';
import { checkAuthToken } from '../../utils/authUtils';

const { Title, Text, Paragraph } = Typography;

const isUbiChannel = (channel) => String(channel || '').toLowerCase().includes('ubi');

const stripDollarSign = (value) => String(value || '').replace(/\$/g, '').trim();

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToLogin: false,
            redirectTo: null,
            loading: true,
            walletData: null,
            transactionHistory: []
        };
    }

    componentDidMount() {
        console.log('Wallet component mounted');
        if (!checkAuthToken()) {
            console.log('Auth check failed, redirecting to login');
            this.setState({ redirectToLogin: true });
            return;
        }
        console.log('Auth check passed, loading data...');
        this.loadWalletData();
        this.loadTransactionHistory();
    }

    loadWalletData = () => {
        this.setState({ loading: true });
        get_data_token(GET_WALLET_URL, {})
            .then(data => {
                this.setState({
                    walletData: data,
                    loading: false
                });
            })
            .catch(err => {
                message.error('Failed to load wallet data: ' + err);
                this.setState({ loading: false });
            });
    }

    loadTransactionHistory = (type = null) => {
        console.log('Loading transaction history, type filter:', type);

        // Build params - if type is provided, filter by type
        const params = {};
        if (type) {
            params.type = type; // 'zippora' for penalties/charges, 'recharge' for wallet recharges
        }

        get_data_token(GET_STATEMENT_LIST, params)
            .then(response => {
                console.log('Transaction history raw response:', response);

                // get_data_token already returns json.data, so response.list is the array
                const list = response.list || [];
                console.log('Transaction list:', list);

                // Map the API response to the table format
                const transactions = list.map((item, index) => ({
                    key: item.statementId || index,
                    date: item.createTime, // This is a datetime string "2026-03-06 18:37:42"
                    type: item.type || 'unknown', // e.g., "Zippora Charge", "Recharge"
                    amount: parseFloat(item.amount || 0),
                    balance: parseFloat(item.money || 0), // 'money' is the balance after transaction
                    amountDisplay: item.amountDisplay || '',
                    balanceAfterDisplay: item.balanceAfterDisplay || '',
                    description: item.desc || item.title || 'No description',
                    title: item.title || '',
                    channel: item.channel || '',
                    statementId: item.statementId
                }));

                console.log('Mapped transactions:', transactions);
                this.setState({ transactionHistory: transactions });
            })
            .catch(err => {
                console.error('Failed to load transaction history:', err);
                message.error('Failed to load transaction history: ' + err);
                this.setState({ transactionHistory: [] });
            });
    }

    renderTransactionHistory = () => {
        const columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                render: (date) => {
                    if (!date) return '-';
                    // Handle datetime string format "2026-03-06 18:37:42"
                    return date;
                },
                sorter: (a, b) => {
                    // Sort by date string
                    return new Date(a.date) - new Date(b.date);
                },
                defaultSortOrder: 'descend'
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                render: (type) => {
                    let color = 'default';
                    let text = type;

                    if (type === 'Recharge' || type === 'recharge') {
                        color = 'green';
                        text = 'RECHARGE';
                    } else if (type === 'Zippora Charge' || type === 'zippora') {
                        color = 'orange';
                        text = 'PENALTY';
                    } else if (type === 'Deduct' || type === 'deduct') {
                        color = 'red';
                        text = 'DEDUCTION';
                    } else {
                        text = type.toUpperCase();
                    }

                    return <Tag color={color}>{text}</Tag>;
                },
                filters: [
                    { text: 'Recharge', value: 'Recharge' },
                    { text: 'Penalty', value: 'Zippora Charge' },
                    { text: 'Deduction', value: 'Deduct' }
                ],
                onFilter: (value, record) => record.type === value
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                render: (amount, record) => {
                    if (isUbiChannel(record.channel) && record.amountDisplay) {
                        const displayAmount = stripDollarSign(record.amountDisplay);

                        return (
                            <Text strong style={{ color: amount > 0 ? '#52c41a' : '#fa8c16' }}>
                                {displayAmount}
                            </Text>
                        );
                    }

                    const isPositive = amount > 0;
                    return (
                        <Text strong style={{ color: isPositive ? '#52c41a' : '#fa8c16' }}>
                            {isPositive ? '+' : ''}${amount.toFixed(2)}
                        </Text>
                    );
                },
                sorter: (a, b) => a.amount - b.amount
            },
            {
                title: 'Balance After',
                dataIndex: 'balance',
                key: 'balance',
                render: (balance, record) => {
                    if (isUbiChannel(record.channel) && record.balanceAfterDisplay) {
                        return record.balanceAfterDisplay;
                    }

                    return `$${balance.toFixed(2)}`;
                },
                sorter: (a, b) => a.balance - b.balance
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                ellipsis: true
            },
            {
                title: 'Channel',
                dataIndex: 'channel',
                key: 'channel',
                render: (channel) => channel || '-'
            }
        ];

        return (
            <div>
                <Space style={{ marginBottom: 16 }}>
                    <Button onClick={() => this.loadTransactionHistory()}>
                        All Transactions
                    </Button>
                    <Button onClick={() => this.loadTransactionHistory('recharge')}>
                        Recharges Only
                    </Button>
                    <Button onClick={() => this.loadTransactionHistory('zippora')}>
                        Penalties & Charges
                    </Button>
                </Space>
                <Table
                    columns={columns}
                    dataSource={this.state.transactionHistory}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} transactions`
                    }}
                    locale={{
                        emptyText: (
                            <Empty
                                description="No transaction history yet"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        )
                    }}
                    size="middle"
                    bordered
                />
            </div>
        );
    }

    render() {
        if (this.state.redirectToLogin) {
            return <Navigate to={this.state.redirectTo || '/account/login'} />;
        }

        const { loading, walletData } = this.state;

        return (
            <div className="main">
                <AccountHeader page="Wallet" title="Wallet" />

                <div className="main-body wallet-container">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '50px' }}>
                            <Spin size="large" />
                        </div>
                    ) : (
                        <>
                            <div className="wallet-toolbar">
                                <div>
                                    <Title level={3} style={{ margin: 0 }}>Wallet Overview</Title>
                                </div>
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<DollarOutlined />}
                                    onClick={() => this.setState({ redirectToLogin: true, redirectTo: '/account/recharge' })}
                                >
                                    Recharge
                                </Button>
                            </div>

                            {/* Balance Cards */}
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12} lg={8}>
                                    <Card className="balance-card">
                                        <Statistic
                                            title="Available Balance"
                                            value={walletData?.money || 0}
                                            precision={2}
                                            prefix={<DollarOutlined />}
                                            valueStyle={{ color: '#3f8600' }}
                                        />
                                    </Card>
                                </Col>
                                <Col xs={24} sm={12} lg={8}>
                                    <Card className="balance-card">
                                        <Statistic
                                            title="Total Balance"
                                            value={walletData?.total || 0}
                                            precision={2}
                                            prefix={<WalletOutlined />}
                                            valueStyle={{ color: '#1890ff' }}
                                        />
                                    </Card>
                                </Col>
                                <Col xs={24} sm={12} lg={8}>
                                    <Card className="balance-card">
                                        <Statistic
                                            title="UBI Balance"
                                            value={walletData?.ubi || 0}
                                            prefix={<GiftOutlined />}
                                            valueStyle={{ color: '#cf1322' }}
                                        />
                                    </Card>
                                </Col>
                            </Row>

                            {/* Info Alert */}
                            <Alert
                                message="About Wallet"
                                description="Your wallet balance can be used to pay for services and fees."
                                type="info"
                                icon={<InfoCircleOutlined />}
                                showIcon
                                style={{ marginTop: '16px' }}
                            />

                            {/* Transaction History */}
                            <Card title="Transaction History" style={{ marginTop: '24px' }}>
                                {this.renderTransactionHistory()}
                            </Card>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default Wallet;

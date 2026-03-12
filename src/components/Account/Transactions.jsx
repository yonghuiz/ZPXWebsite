import React, { Component } from 'react';
import './Account.css'
import AccountHeader from './AccountHeader';
import { Navigate } from 'react-router-dom';
import {
    get_data_token,
    GET_STORE_LIST,
    GET_PICK_LIST,
    VALIDATE_PICKUP_CHARGE_URL,
    PAY_PICKUP_PENALTY_URL,
    post_data_token,

} from '../../config/network'
import { ModalBox, } from './MessageBox';
import { Card, Button, DatePicker, Row, Col, Tabs, Table, Spin, Tag, Modal, Alert, message } from 'antd';
import { SearchOutlined, ReloadOutlined, DollarOutlined, WarningOutlined } from '@ant-design/icons';
import { checkAuthToken, handleAuthError, isAuthError } from '../../utils/authUtils';

function callback(key) {
    // console.log(key);
}

class Transactions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirectToLogin: false,
            redirectTo: null,
            records: [],
            startDate: null,  // Let DatePicker handle default dates
            endDate: null,    // Let DatePicker handle default dates
            load: false,
            Confirmvisible: false,
            packagePenalties: {},
            payingPenalty: {},
        };

        this.getTransactions = this.getTransactions.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);

    }

    componentDidMount() {
        if (!checkAuthToken()) {
            this.setState({ redirectToLogin: true });
            return;
        }
        this.getTransactions();
    }

    //
    getTransactions() {
        // Helper function to convert any date to Unix timestamp
        const toUnixTimestamp = (date, defaultDate) => {
            if (!date) {
                return Math.floor(defaultDate.getTime() / 1000);
            }

            // If it's a moment/dayjs object with unix method
            if (typeof date.unix === 'function') {
                return date.unix();
            }

            // If it's a moment/dayjs object with valueOf method
            if (typeof date.valueOf === 'function') {
                return Math.floor(date.valueOf() / 1000);
            }

            // If it's a native Date object
            if (date instanceof Date) {
                return Math.floor(date.getTime() / 1000);
            }

            // If it's a string, try to parse it
            if (typeof date === 'string') {
                return Math.floor(new Date(date).getTime() / 1000);
            }

            // Fallback to default
            return Math.floor(defaultDate.getTime() / 1000);
        };

        // Create default dates - Use 3 months range like dashboard
        const defaultStartDate = new Date();
        defaultStartDate.setMonth(defaultStartDate.getMonth() - 3); // 3 months ago
        const defaultEndDate = new Date();

        // Convert to Unix timestamps
        const startUnix = toUnixTimestamp(this.state.startDate, defaultStartDate);
        const endUnix = toUnixTimestamp(this.state.endDate, defaultEndDate);

        this.setState({
            load: true,
            packagePenalties: {}
        })

        // Fetch both delivered packages and pending packages
        Promise.all([
            // Get delivered packages (with pickTime)
            get_data_token(GET_STORE_LIST, {
                startime: startUnix,
                endtime: endUnix,
            }),
            // Get pending packages (no pickTime yet)
            get_data_token(GET_PICK_LIST, {})
        ])
            .then(([storeData, pickData]) => {
                console.log("Store list (delivered):", storeData);
                console.log("Pick list (pending):", pickData);

                // Delivered packages - those with pickTime
                const deliveredPackages = (storeData.storeList || []).map(record => ({
                    ...record,
                    status: 'Delivered'
                }));

                // Pending packages - those without pickTime
                const pendingPackages = (pickData.storeList || []).map(record => ({
                    ...record,
                    status: 'Pending',
                    pickTime: '-' // Set as dash for display
                }));

                // Merge both lists
                const allPackages = [...pendingPackages, ...deliveredPackages];

                console.log("Total packages:", allPackages.length);

                this.setState({
                    records: allPackages,
                    load: false
                }, () => {
                    this.checkPackagePenalties(pendingPackages);
                });
            })
            .catch(err => {
                console.error('Get transactions error:', err);
                this.setState({ records: [], load: false });
                if (isAuthError(err)) {
                    handleAuthError(this);
                }
            });
    }

    checkPackagePenalties(packages) {
        const memberId = localStorage.getItem('memberId');

        if (!memberId || packages.length === 0) {
            return;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        const gracePeriodDays = 3;

        packages.forEach(pkg => {
            let storeTime = pkg.storeTime;

            if (typeof storeTime === 'string') {
                storeTime = parseInt(storeTime, 10);
            }

            if (storeTime > 4102444800) {
                storeTime = Math.floor(storeTime / 1000);
            }

            if (storeTime < 946684800) {
                const parsed = new Date(pkg.storeTime);
                if (!isNaN(parsed.getTime())) {
                    storeTime = Math.floor(parsed.getTime() / 1000);
                } else {
                    return;
                }
            }

            const daysStored = Math.floor((currentTime - storeTime) / (24 * 60 * 60));
            const overdueDays = Math.max(0, daysStored - gracePeriodDays);

            if (overdueDays > 0 && !pkg.penalty_paid_time) {
                this.setState(prevState => ({
                    packagePenalties: {
                        ...prevState.packagePenalties,
                        [pkg.storeId]: {
                            amount: 0,
                            days: 0,
                            isPastDue: true,
                            alreadyPaid: false,
                            checking: true
                        }
                    }
                }));

                get_data_token(VALIDATE_PICKUP_CHARGE_URL, {
                    memberId: memberId,
                    storeId: pkg.storeId
                })
                    .then(result => {
                        this.setState(prevState => {
                            const nextPenalties = { ...prevState.packagePenalties };

                            if (result.allowPickup === false && result.totalPenalty) {
                                const apiOverdueDays = result.packages && result.packages[0]
                                    ? result.packages[0].overdueDays
                                    : overdueDays;

                                nextPenalties[pkg.storeId] = {
                                    amount: parseFloat(result.totalPenalty),
                                    days: apiOverdueDays,
                                    isPastDue: true,
                                    alreadyPaid: false,
                                    checking: false
                                };
                            } else if (result.allowPickup === true) {
                                delete nextPenalties[pkg.storeId];
                            } else {
                                nextPenalties[pkg.storeId] = {
                                    amount: 0,
                                    days: 0,
                                    isPastDue: false,
                                    alreadyPaid: false,
                                    checking: false
                                };
                            }

                            return { packagePenalties: nextPenalties };
                        });
                    })
                    .catch(() => {
                        this.setState(prevState => {
                            const nextPenalties = { ...prevState.packagePenalties };

                            if (nextPenalties[pkg.storeId]) {
                                nextPenalties[pkg.storeId] = {
                                    ...nextPenalties[pkg.storeId],
                                    checking: false,
                                    isPastDue: false,
                                };
                            }

                            return { packagePenalties: nextPenalties };
                        });
                    });
            } else if (pkg.penalty_paid_time) {
                this.setState(prevState => ({
                    packagePenalties: {
                        ...prevState.packagePenalties,
                        [pkg.storeId]: {
                            amount: parseFloat(pkg.penalty_amount || 0),
                            days: overdueDays,
                            isPastDue: false,
                            alreadyPaid: true,
                            checking: false
                        }
                    }
                }));
            }
        });
    }

    handlePayPenalty = (storeId, penaltyAmount) => {
        const memberId = localStorage.getItem('memberId');

        if (!memberId) {
            message.error('Please login to pay penalty');
            return;
        }

        Modal.confirm({
            title: 'Pay Overdue Penalty',
            content: (
                <div>
                    <p>Package ID: {storeId}</p>
                    <p>Penalty Amount: <strong>${penaltyAmount.toFixed(2)}</strong></p>
                    <p style={{ marginTop: '16px', color: '#666' }}>
                        The penalty will be deducted from your wallet balance.
                    </p>
                    <Alert
                        message="Important"
                        description="Once paid, this amount is locked. You can pick up anytime without additional charges."
                        type="info"
                        showIcon
                        style={{ marginTop: '12px' }}
                    />
                </div>
            ),
            okText: 'Pay Now',
            cancelText: 'Cancel',
            onOk: () => {
                this.setState(prevState => ({
                    payingPenalty: {
                        ...prevState.payingPenalty,
                        [storeId]: true,
                    }
                }));

                post_data_token(PAY_PICKUP_PENALTY_URL, {
                    memberId: memberId,
                    storeId: storeId
                })
                    .then(data => {
                        message.success(`Penalty paid successfully! New balance: $${data.newBalance}`);

                        this.setState(prevState => ({
                            packagePenalties: {
                                ...prevState.packagePenalties,
                                [storeId]: {
                                    ...prevState.packagePenalties[storeId],
                                    isPastDue: false,
                                    alreadyPaid: true,
                                }
                            },
                            payingPenalty: Object.fromEntries(
                                Object.entries(prevState.payingPenalty).filter(([key]) => key !== String(storeId))
                            )
                        }));

                        this.getTransactions();
                    })
                    .catch(err => {
                        this.setState(prevState => ({
                            payingPenalty: Object.fromEntries(
                                Object.entries(prevState.payingPenalty).filter(([key]) => key !== String(storeId))
                            )
                        }));

                        if (err.includes('Insufficient')) {
                            Modal.confirm({
                                title: 'Insufficient Wallet Balance',
                                content: 'You need to add funds to your wallet to pay this penalty. Would you like to go to your wallet now?',
                                okText: 'Go to Wallet',
                                cancelText: 'Cancel',
                                onOk: () => {
                                    this.setState({ redirectToLogin: true, redirectTo: '/account/wallet' });
                                }
                            });
                        } else if (err.includes('already paid')) {
                            message.info('This penalty has already been paid');
                            this.getTransactions();
                        } else {
                            message.error('Failed to pay penalty: ' + err);
                        }
                    });
            }
        });
    }

    handleChangeStartDate(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangeEndDate(date) {
        this.setState({
            endDate: date
        });
    }


    //
    renderRecords() {
        if (this.state.load)
            return (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Spin size="large" />
                    <p>Loading...</p>
                </div>
            );

        if (this.state.records.length === 0)
            return (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <p>You have no package.</p>
                </div>
            );

        const columns = [
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status) => {
                    const color = status === 'Delivered' ? 'green' : 'orange';
                    return <Tag color={color}>{status}</Tag>;
                },
                filters: [
                    { text: 'Pending', value: 'Pending' },
                    { text: 'Delivered', value: 'Delivered' },
                ],
                onFilter: (value, record) => record.status === value,
            },
            {
                title: 'Penalty Status',
                key: 'penaltyStatus',
                render: (_, record) => {
                    if (record.status !== 'Pending') {
                        return <Tag color="default">Not applicable</Tag>;
                    }

                    const penaltyInfo = this.state.packagePenalties[record.storeId];

                    if (penaltyInfo && penaltyInfo.checking) {
                        return <Tag color="processing" icon={<ReloadOutlined spin />}>Checking...</Tag>;
                    }

                    if (penaltyInfo && penaltyInfo.isPastDue) {
                        return (
                            <div>
                                <Tag color="error" icon={<WarningOutlined />}>Past Due</Tag>
                                <div style={{ fontSize: '12px', color: '#ff4d4f', marginTop: '4px' }}>
                                    ${penaltyInfo.amount.toFixed(2)} ({penaltyInfo.days} days)
                                </div>
                            </div>
                        );
                    }

                    if (penaltyInfo && penaltyInfo.alreadyPaid) {
                        return (
                            <div>
                                <Tag color="success">Ready</Tag>
                                <div style={{ fontSize: '12px', color: '#52c41a', marginTop: '4px' }}>
                                    Penalty Paid
                                </div>
                            </div>
                        );
                    }

                    return <Tag color="green">No payment needed</Tag>;
                },
            },
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => {
                    if (record.status !== 'Pending') {
                        return '-';
                    }

                    const penaltyInfo = this.state.packagePenalties[record.storeId];
                    const isPaying = this.state.payingPenalty[record.storeId] || false;

                    if (!penaltyInfo || !penaltyInfo.isPastDue || penaltyInfo.alreadyPaid || penaltyInfo.checking) {
                        return '-';
                    }

                    return (
                        <Button
                            type="primary"
                            size="small"
                            danger
                            icon={<DollarOutlined />}
                            loading={isPaying}
                            onClick={() => this.handlePayPenalty(record.storeId, penaltyInfo.amount)}
                        >
                            Pay
                        </Button>
                    );
                },
            },
            {
                title: 'Store Id',
                dataIndex: 'storeId',
                key: 'storeId',
            },
            {
                title: 'Cabinet Id',
                dataIndex: 'cabinetId',
                key: 'cabinetId',
            },
            {
                title: 'Pickup Code',
                dataIndex: 'pickCode',
                key: 'pickCode',
            },
            {
                title: 'Store Time',
                dataIndex: 'storeTime',
                key: 'storeTime',
            },
            {
                title: 'Pickup Time',
                dataIndex: 'pickTime',
                key: 'pickTime',
            },
        ];

        const dataSource = this.state.records.map((record, index) => ({
            ...record,
            key: index,
        }));

        return (
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
            />
        );
    }
    render() {
        // Check if we need to redirect to login
        if (this.state.redirectToLogin) {
            const redirectPath = this.state.redirectTo || '/account/login';
            return <Navigate to={redirectPath} replace />;
        }

        const tabItems = [
            {
                key: '1',
                label: 'History',
                children: (
                    <div>
                        <Card size="small" style={{ marginBottom: 16 }}>
                            <Row gutter={16} align="middle">
                                <Col xs={24} sm={8} md={6}>
                                    <label style={{ marginBottom: 8, display: 'block', fontWeight: 'bold' }}>Start Date:</label>
                                    <DatePicker
                                        value={this.state.startDate}
                                        onChange={this.handleChangeStartDate}
                                        style={{ width: '100%' }}
                                    />
                                </Col>
                                <Col xs={24} sm={8} md={6}>
                                    <label style={{ marginBottom: 8, display: 'block', fontWeight: 'bold' }}>End Date:</label>
                                    <DatePicker
                                        value={this.state.endDate}
                                        onChange={this.handleChangeEndDate}
                                        style={{ width: '100%' }}
                                    />
                                </Col>
                                <Col xs={24} sm={8} md={6}>
                                    <label style={{ marginBottom: 8, display: 'block', color: 'transparent' }}>Action:</label>
                                    <Button
                                        type="primary"
                                        icon={<SearchOutlined />}
                                        onClick={this.getTransactions}
                                        style={{ width: '100%' }}
                                    >
                                        Search
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                        {this.renderRecords()}
                    </div>
                )
            }
        ];

        return (
            <div >
                <div className="main">
                    <AccountHeader page={"Transactions"} title="Transactions" />
                    <div className="main-body">
                        <Card>
                            <Tabs defaultActiveKey="1" onChange={callback} items={tabItems} />
                        </Card>
                    </div>
                </div>
                {ModalBox.call(this)}

            </div>
        );
    }
}

export default Transactions;
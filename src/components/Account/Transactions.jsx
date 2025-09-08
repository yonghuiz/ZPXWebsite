import React, { Component } from 'react';
import './Account.css'
import AccountHeader from './AccountHeader';
import { Navigate } from 'react-router-dom';
import {
  
    get_data_token,
    GET_STORE_LIST,

} from '../../config/network'
import { ModalBox,  } from './MessageBox';
import { Card, Button, DatePicker, Row, Col, Tabs, Table, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { checkAuthToken, handleAuthError, isAuthError } from '../../utils/authUtils';

function callback(key) {
    // console.log(key);
 }   

class Transactions extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            redirectToLogin: false,
            records: [],
            startDate: null,  // Let DatePicker handle default dates
            endDate: null,    // Let DatePicker handle default dates
            load:false,
            Confirmvisible:false,
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
        
        // Create default dates
        const defaultStartDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
        const defaultEndDate = new Date();
        
        // Convert to Unix timestamps
        const startUnix = toUnixTimestamp(this.state.startDate, defaultStartDate);
        const endUnix = toUnixTimestamp(this.state.endDate, defaultEndDate);

        this.setState({load:true})
        get_data_token( GET_STORE_LIST,{
            startime: startUnix,
            endtime: endUnix,
        })
        .then(data => {
            data.storeList.map(record => record.key);
            this.setState({ records: data.storeList,load:false });
            // console.log("getTransactions", data.storeList)
        })
        .catch(
            err => {
            this.setState({ records: [],load:false });
            if (isAuthError(err)) {
                handleAuthError(this);
            }
            //showErrorMessage.call(this, 'Get transactions error:' + err);
        })

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
            return <Navigate to="/login" replace />;
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
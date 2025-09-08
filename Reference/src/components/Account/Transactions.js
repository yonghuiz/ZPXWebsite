import React, { Component } from 'react';
import './Account.css'
import AccountHeader from './AccountHeader';
import {
  
    get_data_token,
    GET_STORE_LIST,

} from '../../config/network.jsx'
import { ModalBox,  } from '../MessageBox';
import { Card, Button, DatePicker, Row, Col, Tabs, Table, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TabPane } = Tabs;

function callback(key) {
    // console.log(key);
 }   

class Transactions extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            startDate: moment().subtract(30, 'days'),
            endDate: moment(),
            load:false,
            Confirmvisible:false,
        };
        
        this.getTransactions = this.getTransactions.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);

    }

    componentDidMount() {
        this.getTransactions();

    }

    //
    getTransactions() {

         this.setState({load:true})
            get_data_token( GET_STORE_LIST,{
            startime: this.state.startDate.unix(),
            endtime: this.state.endDate.unix(),
           })
            .then(data => {
                 data.storeList.map(record => record.key);
                 this.setState({ records: data.storeList,load:false });
                // console.log("getTransactions", data.storeList)
            })
             .catch(
                 err => {
                 this.setState({ records: [],load:false });
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
        return (
            <div >
                <div className="main">
                    <AccountHeader page={"Transactions"} title="Transactions" />
                    <div className="main-body">
                        <Card>
                            <Tabs defaultActiveKey="1" onChange={callback} > 
                                <TabPane tab="History" key="1">
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
                                </TabPane>
                            </Tabs>
                        </Card>
                    </div>
                </div>
                {ModalBox.call(this)}

            </div>
        );
    }
}

export default Transactions;
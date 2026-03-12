import React, { Component } from 'react';
import './Account.css'
import {
    Card,
    Descriptions,
    Row,
    Col,
    Button,
    Modal,
    Form,
    Input,
    Typography,
    Statistic,
    Avatar,
    Alert,
    List,
    Tag,
    Progress,
    message
} from 'antd'
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    InboxOutlined,
    HomeOutlined,
    MailOutlined,
    UserOutlined,
    PhoneOutlined,
    EditOutlined,
    PlusOutlined,
    DollarOutlined,
    WarningOutlined,
    ReloadOutlined
} from '@ant-design/icons';
import { Table } from 'reactstrap';
import { Link, Navigate } from 'react-router-dom';
import AccountHeader from './AccountHeader';
import { GET_BIND_APARTMENT, GET_USER_STAT_URL, GET_DEPT_LIST, GET_UNIT_LIST, get_data_token, BIND_APARTMENT, CANCELBIND_APARTMENT, GET_PICK_LIST, GET_STORE_LIST, VALIDATE_PICKUP_CHARGE_URL, PAY_PICKUP_PENALTY_URL, post_data_token } from '../../config/network.jsx'
import { ModalBox, showErrorMessage } from './MessageBox'
import { FormattedMessage, } from 'react-intl';
import { checkAuthToken, handleAuthError, isAuthError } from '../../utils/authUtils';

const { Title, Text } = Typography;

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToLogin: false,
            redirectTo: null,
            memberinfo: {},
            memberprofile: {},
            statusdetail: {},
            isProfilecompleted: '',
            isEmailVerified: '',
            hasBindAddress: '',
            transactions: [],
            recentDeliveries: [], // Add this for delivered packages in last 3 months
            pendingPackages: [], // Add this for pending packages
            packagePenalties: {}, // Store penalty info for each package: { storeId: { amount, days, isPastDue } }
            payingPenalty: {}, // Track which penalties are being paid: { storeId: boolean }
            deptzipcode: '',
            bindzipcodevisible: false,
            selectDeptvisible: false,
            ModalText: 'Please input your zipcode first',
            deptlist: [],//apartment list
            unitlist: [],//unit list
            selecteddept: '',
            selectedunit: '',
            records: [],
            apartments: [],
            load: false,
            loadapartment: false,
            loadunit: false,
            loadunitf: false,
            loadzipcode: false,
            loaddepartment: false,
            profileready: false,
            //
            cancelbinddept: '',
            cancelbindzipcodevisible: false,
            loadcancel: false,
        };
        this.showModal = this.showModal.bind(this);
        this.cancelshowModal = this.cancelshowModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.handleDeptSubmit = this.handleDeptSubmit.bind(this);
        this.handlezipcodeSubmit = this.handlezipcodeSubmit.bind(this);
        this.handlezipcodeChange = this.handlezipcodeChange.bind(this);
        this.getApartment = this.getApartment.bind(this);
        this.getPickList = this.getPickList.bind(this);
        this.getPackageData = this.getPackageData.bind(this);
        //
        this.handlecanceldeptChange = this.handlecanceldeptChange.bind(this);
        this.handlecancelbindSubmit = this.handlecancelbindSubmit.bind(this);

    }
    //
    cancelshowModal = () => {
        this.setState({
            //ModalText: 'Please input your departmentID',
            ModalText: '',
            cancelbinddept: '',
            cancelbindzipcodevisible: true,
            loadcancel: false,
            profileready: false,
        });
    }
    //
    showModal = () => {

        if (this.state.memberprofile.firstName.length === 0 || this.state.memberprofile.lastName.length === 0) {
            // console.log(this.state.memberprofile.firstName.length);
            // openErrorBox.call(this,{content:window.appLocale.messages['page.profile.err']||'Please complete your profile before subscibe to your apartment'});
            showErrorMessage.call(this, 'Please complete your profile before subscibe to your apartment:');
            // console.log(this.state.memberprofile.firstName.length);
            return
        }

        this.setState({
            //ModalText: 'Please input your zipcode first',
            profileready: true,
            ModalText: '',
            deptzipcode: '',
            bindzipcodevisible: true,
            loadzipcode: false,
        });

    };
    //cancel输入事件
    handlecanceldeptChange(event) {
        this.setState({ cancelbinddept: event.target.value, loadcancel: false, });
    }
    //
    rendercancelbind() {
        if (this.state.loadcancel)
            return <h5>Loading...</h5>;

        return (
            <Modal
                title="Input your bound Apartment ID"
                visible={this.state.cancelbindzipcodevisible}
                onOk={this.handlecancelbindSubmit}
                onCancel={this.handleCancel}
            >
                <Form >
                    <Form.Item label="Apartmentid">
                        <Input type="text" value={this.state.cancelbinddept} onChange={this.handlecanceldeptChange} />
                    </Form.Item>
                </Form>
                <p>{this.state.ModalText}</p>
            </Modal>
        )
    }
    //cancelbind界面 submit事件
    handlecancelbindSubmit(event) {
        let deptid = this.state.cancelbinddept;
        if (deptid === undefined) {
            return;
        }
        if (deptid === null) {
            return;
        }
        if (deptid === "") {
            this.setState({
                ModalText: 'Error apartmentId,please input again',
                loadcancel: false,
            })
            return;
        }
        get_data_token(CANCELBIND_APARTMENT, { apartmentId: deptid })
            .then(
                data => {

                    this.getApartment();
                    this.setState({ cancelbindzipcodevisible: false, loadcancel: false, });
                    return;

                })
            .catch(
                err => showErrorMessage.call(this, 'Cancel Bind apartment data error:' + err)
            )
        //
        this.setState({
            ModalText: 'No such apartmentId!',
            loadcancel: false,
        })

    }
    //zipcode界面 OK事件
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            loadzipcode: false,
            //loaddepartment:true,
        });
        setTimeout(() => {
            this.setState({
                deptzipcode: '',
                bindzipcodevisible: false,
                bindDeptvisible: false,
                selectDeptvisible: false,
                cancelbindzipcodevisible: false,
                loaddepartment: false,
                loadzipcode: false,
                loadcancel: false,

            });
        }, 2000);
    };
    //zipcode界面 Cancel事件
    handleCancel = () => {
        // console.log('Clicked cancel button');
        this.setState({
            deptzipcode: '',
            bindzipcodevisible: false,
            selectDeptvisible: false,
            cancelbindzipcodevisible: false,
            loadzipcode: false,
            loaddepartment: false,
            loadcancel: false,
            profileready: false,
        });
    };
    //   
    renderunitn(apartid) {
        // if (this.state.selecteddept === '')
        //     return;
        get_data_token(GET_UNIT_LIST, { apartmentId: apartid })
            .then(
                data => {
                    if (data.unitList.length === 0) {
                        this.setState({
                            ModalText: 'Error Unit',
                            loadzipcode: false,
                        })
                        return;
                    }
                    else {
                        let unitlistapi = data.unitList.map((record, index) => {


                            if (index === 0) {
                                this.setState({ selectedunit: record.unitId, });

                            }
                            return { value: record.unitId, key: record.unitName }
                        });
                        this.setState({
                            ModalText: '',
                            unitlist: unitlistapi,
                            bindzipcodevisible: false,
                            loadzipcode: false,
                            selectDeptvisible: true,
                            loaddepartment: false,
                            loadunitf: true,
                        });
                    }
                }
            )
            .catch(
                err => showErrorMessage.call(this, 'Get department data error:' + err)
            )
        //
    }
    //apartment选择事件
    handleChange(event) {
        this.renderunitn(event.target.value);
        this.setState({ selecteddept: event.target.value, loaddepartment: false });

    }
    //unit选择事件
    handleUnitChange(event) {
        this.setState({ selectedunit: event.target.value, loadunit: false, });
    }
    //
    handlezipcodeChange(event) {
        this.setState({ deptzipcode: event.target.value, loadzipcode: false, });
    }
    //
    renderZipcode() {

        if (this.state.profileready) {
            if (this.state.loadzipcode)
                return <h5>Loading...</h5>;

            return (
                <Modal
                    title="Select your zipcode"
                    visible={this.state.bindzipcodevisible}
                    //onOk={this.handleOk}
                    onOk={this.handlezipcodeSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form >
                        <Form.Item label="zipcode">
                            <Input type="text" value={this.state.deptzipcode} onChange={this.handlezipcodeChange} />
                        </Form.Item>
                    </Form>
                    <p>{this.state.ModalText}</p>
                </Modal>
            )
        }
    }

    //
    renderunit() {
        if (this.state.loadunitf)
            return;
        if (this.state.selecteddept === '')
            return;
        get_data_token(GET_UNIT_LIST, { apartmentId: this.state.selecteddept })
            .then(
                data => {
                    if (data.unitList.length === 0) {
                        this.setState({
                            ModalText: 'Error Unit',
                            loadzipcode: false,
                        })
                        return;
                    }
                    else {
                        let unitlistapi = data.unitList.map((record, index) => {


                            if (index === 0) {
                                this.setState({ selectedunit: record.unitId, });

                            }
                            return { value: record.unitId, key: record.unitName }
                        });
                        this.setState({
                            ModalText: '',
                            unitlist: unitlistapi,
                            bindzipcodevisible: false,
                            loadzipcode: false,
                            selectDeptvisible: true,
                            loaddepartment: false,
                            loadunitf: true,
                        });
                    }
                }
            )
            .catch(
                err => showErrorMessage.call(this, 'Get department data error:' + err)
            )
        //
    }
    renderDepartment() {
        if (this.state.loaddepartment)
            return <h5>Loading...</h5>;
        const deptlist = this.state.deptlist;
        let Deptoptions = deptlist.map((item) =>
            //    <option value={item.apartmentId}>{item.apartmentName}</option>
            <option value={item.value}>{item.key}</option>
        );
        this.renderunit();
        const unitlist = this.state.unitlist;
        let Unitoptions = unitlist.map((item) =>

            <option value={item.value}>{item.key}</option>
        );
        //let selectDeptvisible=this.state.selectDeptvisible;
        return (
            <Modal
                title="Select Apartment"
                visible={this.state.selectDeptvisible}
                //visible={selectDeptvisible}
                //onOk={this.handleOk}
                onOk={this.handleDeptSubmit}
                onCancel={this.handleCancel}
            >
                <Form >
                    <Form.Item label="Apartment">

                        <select value={this.state.selecteddept} onChange={this.handleChange}>
                            {Deptoptions}

                        </select>
                    </Form.Item>
                    <Form.Item label="Unit">

                        <select value={this.state.selectedunit} onChange={this.handleUnitChange}>
                            {Unitoptions}

                        </select>
                    </Form.Item>
                </Form>

                <p>{this.state.ModalText}</p>
            </Modal>
        )
    }
    //
    renderApartments() {
        //let approvestatus;
        if (this.state.loadapartment)
            return <h5>Loading...</h5>;
        if (this.state.apartments.length === 0)
            return <p>You have not linked your account with any locker yet. please bind your account with a locker.</p>;
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Apartment ID</th>
                        <th>Locker Address</th>
                        <th>Approve Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.apartments.map(record =>
                            <tr>
                                <td>{record.apartmentId}</td>
                                <td>{record.apartmentName}</td>
                                <td>{record.approveStatus === "1" ? "approved" : "to be approved"}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }
    //
    renderRecords() {
        if (this.state.load)
            return <h5>Loading...</h5>;
        if (this.state.records.length === 0)
            return <p>You have no package.</p>;
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Store Id</th>
                        <th>Cabinet Id</th>
                        <th>Pickup Code</th>
                        <th>Store Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.records.map(record =>
                            <tr>
                                <td>{record.storeId}</td>
                                <td>{record.cabinetId}</td>
                                <td>{record.pickCode}</td>
                                <td>{record.storeTime}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }

    //zipcode界面 submit事件
    handlezipcodeSubmit(event) {
        let deptzipcode = this.state.deptzipcode;
        //let selecteddept;
        if (deptzipcode === undefined) {
            return;
        }
        if (deptzipcode === null) {
            return;
        }
        if (deptzipcode === "") {
            this.setState({
                ModalText: 'Error zipcode,please input zipcode again',
                loadzipcode: false,
            })
            return;
        }
        get_data_token(GET_DEPT_LIST, { zipcode: deptzipcode })
            .then(

                data => {
                    if (data.apartmentList.length === 0) {
                        this.setState({
                            ModalText: 'Error zipcode,please input zipcode again',
                            loadzipcode: false,
                        })
                        return;
                    }
                    else
                    //
                    {

                        let departmentlistapi = data.apartmentList.map((record, index) => {


                            if (index === 0) {

                                this.setState({ selecteddept: record.apartmentId, });

                            }
                            return { value: record.apartmentId, key: record.apartmentName }
                        });
                        //
                        /*
 
                        */
                        //
                        this.setState({
                            ModalText: '',
                            deptlist: departmentlistapi,
                            bindzipcodevisible: false,
                            loadzipcode: false,
                            selectDeptvisible: true,
                            loaddepartment: false,
                            loadunitf: false,
                        });
                        //

                    }
                    //

                })
            .catch(
                err => showErrorMessage.call(this, 'Get department data error:' + err)
            )
        //


    }
    //

    //绑定提交
    handleDeptSubmit(event) {
        get_data_token(BIND_APARTMENT, { apartmentId: this.state.selecteddept, unitId: this.state.selectedunit, })
            .then(
                data => {

                    this.getApartment();
                    this.setState({ selectDeptvisible: false, loaddepartment: false, });
                    return;

                })
            .catch(
                err => showErrorMessage.call(this, 'Bind apartment data error:' + err)
            )
        //
        this.setState({
            ModalText: 'You have bound to this apartment already!',
            loaddepartment: false,
        })

    }

    // handleDeptChange(event) {

    //     this.setState({ selecteddept: event.target.value,loaddepartment:false, });


    // }
    componentDidMount() {
        if (!checkAuthToken()) {
            this.setState({ redirectToLogin: true });
            return;
        }
        get_data_token(GET_USER_STAT_URL, {})
            .then(data => {
                this.setState({
                    memberinfo: data.member,
                    memberprofile: data.profile,
                    isProfileCompleted: data.member.statusDetail.isProfileCompleted,
                    hasBindAddress: data.member.statusDetail.hasBindAddress,
                })
                //departmentid
                this.getApartment();
                //
                this.getPackageData(); // Load both recent deliveries and pending packages
            })
            .catch(err => {
                console.error('Authentication error:', err);
                if (isAuthError(err)) {
                    handleAuthError(this);
                } else {
                    showErrorMessage.call(this, 'Get user statistics error:' + err);
                }
            });
    }
    //
    getApartment() {
        this.setState({ loadapartment: true })
        get_data_token(GET_BIND_APARTMENT, {})
            .then(data => {
                data.apartmentList.map(record => record.key);
                this.setState({ apartments: data.apartmentList, loadapartment: false });
                // console.log("getApartment", data.apartmentList)
            })
            .catch(err => {
                this.setState({ apartments: [], loadapartment: false });
                if (isAuthError(err)) {
                    handleAuthError(this);
                } else {
                    showErrorMessage.call(this, 'Get apartment error:' + err);
                }
            })
    }
    //
    getPickList() {
        this.setState({ load: true })
        get_data_token(GET_PICK_LIST, {})
            .then(data => {
                data.storeList.map(record => record.key);
                this.setState({ records: data.storeList, load: false });
                // console.log("getpicklist", data)
            })
            .catch(err => {
                this.setState({ records: [], load: false });
                showErrorMessage.call(this, 'Get pickuplist error:' + err);
            })
    }

    // Get packages delivered in the last 3 months and pending packages
    getPackageData() {
        this.setState({
            load: true,
            packagePenalties: {} // Clear previous penalty data on refresh
        });

        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 3); // 3 months ago

        // Get delivered packages (packages with pickup time)
        get_data_token(GET_STORE_LIST, {
            startime: Math.floor(startDate.getTime() / 1000),
            endtime: Math.floor(endDate.getTime() / 1000),
        })
            .then(data => {
                console.log("Store list API data:", data);

                // Filter for delivered packages (those with pickTime)
                const deliveredPackages = data.storeList.filter(record =>
                    record.pickTime && record.pickTime !== '' && record.pickTime !== null
                );

                console.log("Delivered packages:", deliveredPackages.length);

                this.setState({
                    recentDeliveries: deliveredPackages
                });
            })
            .catch(err => {
                console.error('Get recent deliveries error:', err);
                this.setState({
                    recentDeliveries: []
                });
            });

        // Get pending packages (packages available for pickup)
        get_data_token(GET_PICK_LIST, {})
            .then(data => {
                console.log("Pick list API data:", data);

                // These are packages stored but not yet picked up
                const pendingPackages = data.storeList || [];

                console.log("Pending packages:", pendingPackages.length);
                console.log("Sample pending package:", pendingPackages[0]);

                this.setState({
                    pendingPackages: pendingPackages,
                    records: pendingPackages, // Also populate records for table view
                    load: false
                }, () => {
                    // Check for penalties on pending packages
                    this.checkPackagePenalties(pendingPackages);
                });
            })
            .catch(err => {
                console.error('Get pending packages error:', err);
                this.setState({
                    pendingPackages: [],
                    records: [], // Also clear records
                    load: false
                });
            });
    }

    // Check if packages have penalties
    checkPackagePenalties(packages) {
        const memberId = localStorage.getItem('memberId');

        if (!memberId || packages.length === 0) {
            return;
        }

        // Calculate overdue status for each package
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const gracePeriodDays = 3; // 3 days grace period per spec

        packages.forEach(pkg => {
            // Handle different timestamp formats
            let storeTime = pkg.storeTime;

            // If it's a string, try to parse as integer first
            if (typeof storeTime === 'string') {
                storeTime = parseInt(storeTime, 10);
            }

            // If timestamp looks very large (likely in milliseconds), convert to seconds
            // Unix timestamp in seconds won't exceed 4,102,444,800 until year 2100
            if (storeTime > 4102444800) {
                storeTime = Math.floor(storeTime / 1000);
            }

            // If timestamp is very small (likely just days or wrong format), try parsing as date
            if (storeTime < 946684800) { // Before year 2000 in seconds
                console.error(`Suspicious storeTime for package ${pkg.storeId}:`, pkg.storeTime);
                // Try to parse as date string
                const parsed = new Date(pkg.storeTime);
                if (!isNaN(parsed.getTime())) {
                    storeTime = Math.floor(parsed.getTime() / 1000);
                } else {
                    console.error(`Cannot parse storeTime for package ${pkg.storeId}, skipping penalty check`);
                    return;
                }
            }

            const daysStored = Math.floor((currentTime - storeTime) / (24 * 60 * 60));
            const overdueDays = Math.max(0, daysStored - gracePeriodDays);

            console.log(`Package ${pkg.storeId}:`, {
                rawStoreTime: pkg.storeTime,
                parsedStoreTime: storeTime,
                storeDate: new Date(storeTime * 1000).toLocaleString(),
                currentTime: currentTime,
                daysStored: daysStored,
                overdueDays: overdueDays
            });

            if (overdueDays > 0 && !pkg.penalty_paid_time) {
                // Package is overdue and penalty not paid
                // Show "Checking..." status immediately
                const newPenalties = { ...this.state.packagePenalties };
                newPenalties[pkg.storeId] = {
                    amount: 0,
                    days: 0,
                    isPastDue: true,
                    alreadyPaid: false,
                    checking: true // Flag to show "Checking..." in UI
                };
                this.setState({ packagePenalties: newPenalties });

                // Call API to get exact penalty from server
                get_data_token(VALIDATE_PICKUP_CHARGE_URL, {
                    memberId: memberId,
                    storeId: pkg.storeId
                })
                    .then(result => {
                        console.log(`API penalty result for package ${pkg.storeId}:`, result);

                        // Update with exact API values
                        const updatedPenalties = { ...this.state.packagePenalties };

                        if (result.allowPickup === false && result.totalPenalty) {
                            // Get overdue days from API if available
                            const apiOverdueDays = result.packages && result.packages[0]
                                ? result.packages[0].overdueDays
                                : overdueDays;

                            updatedPenalties[pkg.storeId] = {
                                amount: parseFloat(result.totalPenalty),
                                days: apiOverdueDays,
                                isPastDue: true,
                                alreadyPaid: false,
                                checking: false
                            };
                        } else if (result.allowPickup === true) {
                            // No penalty according to API
                            delete updatedPenalties[pkg.storeId];
                        } else {
                            // API returned unexpected result, remove checking flag
                            updatedPenalties[pkg.storeId] = {
                                amount: 0,
                                days: 0,
                                isPastDue: false,
                                alreadyPaid: false,
                                checking: false
                            };
                        }

                        this.setState({ packagePenalties: updatedPenalties });
                    })
                    .catch(err => {
                        console.error(`Error checking penalty for package ${pkg.storeId}:`, err);

                        // Remove checking flag on error
                        const errorPenalties = { ...this.state.packagePenalties };
                        if (errorPenalties[pkg.storeId]) {
                            errorPenalties[pkg.storeId].checking = false;
                            errorPenalties[pkg.storeId].isPastDue = false; // Hide if API fails
                        }
                        this.setState({ packagePenalties: errorPenalties });
                    });
            } else if (pkg.penalty_paid_time) {
                // Penalty already paid
                const newPenalties = { ...this.state.packagePenalties };
                newPenalties[pkg.storeId] = {
                    amount: parseFloat(pkg.penalty_amount || 0),
                    days: overdueDays,
                    isPastDue: false,
                    alreadyPaid: true,
                    checking: false
                };
                this.setState({ packagePenalties: newPenalties });
            }
        });
    }

    // Handle penalty payment
    handlePayPenalty = (storeId, penaltyAmount) => {
        const memberId = localStorage.getItem('memberId');

        if (!memberId) {
            message.error('Please login to pay penalty');
            return;
        }

        // Show confirmation modal
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
                // Set loading state for this package
                const newPayingState = { ...this.state.payingPenalty };
                newPayingState[storeId] = true;
                this.setState({ payingPenalty: newPayingState });

                // Call payment API
                post_data_token(PAY_PICKUP_PENALTY_URL, {
                    memberId: memberId,
                    storeId: storeId
                })
                    .then(data => {
                        message.success(`Penalty paid successfully! New balance: $${data.newBalance}`);

                        // Update penalty state - mark as paid
                        const newPenalties = { ...this.state.packagePenalties };
                        if (newPenalties[storeId]) {
                            newPenalties[storeId].isPastDue = false;
                            newPenalties[storeId].alreadyPaid = true;
                        }

                        // Clear loading state
                        const clearPayingState = { ...this.state.payingPenalty };
                        delete clearPayingState[storeId];

                        this.setState({
                            packagePenalties: newPenalties,
                            payingPenalty: clearPayingState
                        });

                        // Reload package data
                        this.getPackageData();
                    })
                    .catch(err => {
                        // Clear loading state
                        const clearPayingState = { ...this.state.payingPenalty };
                        delete clearPayingState[storeId];
                        this.setState({ payingPenalty: clearPayingState });

                        // Handle specific error codes
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
                            this.getPackageData(); // Refresh data
                        } else {
                            message.error('Failed to pay penalty: ' + err);
                        }
                    });
            }
        });
    }

    //
    render() {
        // Check if we need to redirect to login or other pages
        if (this.state.redirectToLogin) {
            const redirectPath = this.state.redirectTo || '/account/login';
            return <Navigate to={redirectPath} replace />;
        }

        const memberinfo = this.state.memberinfo;
        const memberprofile = this.state.memberprofile;
        let completeinfo;
        if (Object.keys(memberinfo).length === 0) {
            completeinfo = "Not complete profile";
        } else {
            completeinfo = (memberinfo.statusDetail.isProfileCompleted === 1) ? "Complete profile" : "Not complete profile";
        }

        const profileComplete = memberinfo.statusDetail?.isProfileCompleted === 1;
        const hasBindAddress = memberinfo.statusDetail?.hasBindAddress === 1;

        return (
            <div className="dashboard-container">
                <AccountHeader page={"Account"}
                    memberData={{
                        member: this.state.memberinfo,
                        profile: this.state.memberprofile,
                    }}
                    title={<FormattedMessage id="page.sidnav.title.Dashboard" defaultMessage="Dashboard" />}
                />

                <div className="dashboard-content">
                    {/* Welcome Section */}
                    <div className="welcome-section">
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={16}>
                                <Card className="welcome-card" variant="outlined">
                                    <div className="welcome-content">
                                        <Avatar size={64} icon={<UserOutlined />} className="welcome-avatar" />
                                        <div className="welcome-text">
                                            <Title level={2} className="welcome-title">
                                                Welcome back, {memberprofile.firstName || 'User'}!
                                            </Title>
                                            <Text className="welcome-subtitle">
                                                Here's what's happening with your account today.
                                            </Text>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={24} md={8}>
                                <Card className="quick-actions-card" variant="outlined">
                                    <Title level={4}>Quick Actions</Title>
                                    <div className="space-vertical">
                                        <Link to="/account/profile">
                                            <Button type="primary" icon={<EditOutlined />} block>
                                                Update Profile
                                            </Button>
                                        </Link>
                                        <Button
                                            type="default"
                                            icon={<PlusOutlined />}
                                            onClick={this.showModal}
                                            block
                                        >
                                            Subscribe Apartment
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    {/* Status Cards */}
                    <Row gutter={[24, 24]} className="status-cards">
                        <Col xs={24} sm={12} lg={6}>
                            <Card variant="outlined" className="status-card">
                                <Statistic
                                    title="Profile Status"
                                    value={profileComplete ? "Complete" : "Incomplete"}
                                    prefix={<CheckCircleOutlined style={{ color: profileComplete ? '#52c41a' : '#faad14' }} />}
                                    valueStyle={{ color: profileComplete ? '#52c41a' : '#faad14' }}
                                />
                                <Progress
                                    percent={profileComplete ? 100 : 60}
                                    size="small"
                                    status={profileComplete ? "success" : "active"}
                                    style={{ marginTop: 8 }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card variant="outlined" className="status-card">
                                <Statistic
                                    title="Packages"
                                    value={this.state.records.length}
                                    prefix={<InboxOutlined style={{ color: '#1890ff' }} />}
                                    valueStyle={{ color: '#1890ff' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card variant="outlined" className="status-card">
                                <Statistic
                                    title="Apartments"
                                    value={this.state.apartments.length}
                                    prefix={<HomeOutlined style={{ color: '#722ed1' }} />}
                                    valueStyle={{ color: '#722ed1' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card variant="outlined" className="status-card">
                                <Statistic
                                    title="Email Status"
                                    value={memberinfo.statusDetail?.isEmailVerified ? "Verified" : "Pending"}
                                    prefix={<MailOutlined style={{ color: memberinfo.statusDetail?.isEmailVerified ? '#52c41a' : '#faad14' }} />}
                                    valueStyle={{ color: memberinfo.statusDetail?.isEmailVerified ? '#52c41a' : '#faad14' }}
                                />
                            </Card>
                        </Col>
                    </Row>

                    {/* Overdue Packages Alert - Show if any packages have unpaid penalties */}
                    {Object.keys(this.state.packagePenalties).some(key =>
                        this.state.packagePenalties[key].isPastDue && !this.state.packagePenalties[key].checking
                    ) && (
                            <Alert
                                message="Overdue Packages Require Payment"
                                description={
                                    <div>
                                        <p>
                                            You have {Object.keys(this.state.packagePenalties).filter(key =>
                                                this.state.packagePenalties[key].isPastDue && !this.state.packagePenalties[key].checking
                                            ).length} package(s) with overdue penalties.
                                            Total penalty: <strong>
                                                ${Object.keys(this.state.packagePenalties)
                                                    .filter(key => this.state.packagePenalties[key].isPastDue && !this.state.packagePenalties[key].checking)
                                                    .reduce((sum, key) => sum + this.state.packagePenalties[key].amount, 0)
                                                    .toFixed(2)}
                                            </strong>
                                        </p>
                                        <p style={{ marginTop: '8px', marginBottom: 0 }}>
                                            Please pay the penalty to pick up your packages.
                                            See "Pending Packages" section below for details.
                                        </p>
                                    </div>
                                }
                                type="error"
                                icon={<WarningOutlined />}
                                showIcon
                                style={{ marginTop: 24, marginBottom: 24 }}
                                closable
                            />
                        )}

                    {/* Main Content - Row 3: Profile Information and Subscribed Apartments */}
                    <Row gutter={[24, 24]}>
                        {/* User Profile Section */}
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <div className="space-horizontal">
                                        <UserOutlined />
                                        <span>Profile Information</span>
                                    </div>
                                }
                                extra={
                                    <Link to="/account/profile">
                                        <Button type="link" icon={<EditOutlined />}>
                                            Edit
                                        </Button>
                                    </Link>
                                }
                                className="profile-card"
                            >
                                <Descriptions column={1} size="small">
                                    <Descriptions.Item label="Email">
                                        <div className="space-horizontal">
                                            <MailOutlined />
                                            {memberinfo.email}
                                            {memberinfo.statusDetail?.isEmailVerified &&
                                                <Tag color="green"><CheckCircleOutlined />Verified</Tag>
                                            }
                                        </div>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Phone">
                                        <div className="space-horizontal">
                                            <PhoneOutlined />
                                            {memberinfo.phone || 'Not provided'}
                                        </div>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Name">
                                        {memberprofile.firstName} {memberprofile.lastName}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Address">
                                        <div className="space-horizontal">
                                            <HomeOutlined />
                                            <div>
                                                {memberprofile.addressline1}<br />
                                                {memberprofile.addressline2 && (
                                                    <>{memberprofile.addressline2}<br /></>
                                                )}
                                                {memberprofile.city} {memberprofile.state} {memberprofile.zipcode}
                                            </div>
                                        </div>
                                    </Descriptions.Item>
                                </Descriptions>

                                {!profileComplete && (
                                    <Alert
                                        message="Profile Incomplete"
                                        description="Please complete your profile to access all features."
                                        type="warning"
                                        showIcon
                                        style={{ marginTop: 16 }}
                                        action={
                                            <Link to="/account/profile">
                                                <Button size="small" type="primary">
                                                    Complete Now
                                                </Button>
                                            </Link>
                                        }
                                    />
                                )}
                            </Card>
                        </Col>

                        {/* Apartments Section */}
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <div className="card-title-mobile">
                                        <div className="space-horizontal">
                                            <HomeOutlined />
                                            <span>Subscribed Apartments</span>
                                        </div>
                                        <div className="card-actions-mobile">
                                            <Button
                                                type="primary"
                                                icon={<PlusOutlined />}
                                                onClick={this.showModal}
                                                size="small"
                                            >
                                                Subscribe
                                            </Button>
                                            <Button
                                                danger
                                                onClick={this.cancelshowModal}
                                                size="small"
                                            >
                                                Unsubscribe
                                            </Button>
                                        </div>
                                    </div>
                                }
                                extra={
                                    <div className="card-actions-desktop">
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={this.showModal}
                                        >
                                            Subscribe
                                        </Button>
                                        <Button
                                            danger
                                            onClick={this.cancelshowModal}
                                        >
                                            Unsubscribe
                                        </Button>
                                    </div>
                                }
                                className="apartments-card"
                            >
                                {this.state.loadapartment ? (
                                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
                                ) : this.state.apartments.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '40px' }}>
                                        <HomeOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
                                        <div style={{ marginTop: '16px', color: '#999' }}>
                                            No apartments subscribed yet
                                        </div>
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={this.showModal}
                                            style={{ marginTop: '16px' }}
                                        >
                                            Subscribe to an Apartment
                                        </Button>
                                    </div>
                                ) : (
                                    <List
                                        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}
                                        dataSource={this.state.apartments}
                                        renderItem={record => (
                                            <List.Item>
                                                <Card size="small" className="apartment-item">
                                                    <div style={{ textAlign: 'center' }}>
                                                        <HomeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                                                        <div style={{ marginTop: '8px' }}>
                                                            <Text strong>#{record.apartmentId}</Text>
                                                        </div>
                                                        <div style={{ marginTop: '4px' }}>
                                                            <Text type="secondary">{record.apartmentName}</Text>
                                                        </div>
                                                        <div style={{ marginTop: '8px' }}>
                                                            <Tag color={record.approveStatus === "1" ? "green" : "blue"}>
                                                                {record.approveStatus === "1" ? "Approved" : "Pending"}
                                                            </Tag>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </List.Item>
                                        )}
                                    />
                                )}
                            </Card>
                        </Col>
                    </Row>

                    {/* Row 4: Recent Deliveries and Pending Packages */}
                    <Row gutter={[24, 24]}>
                        {/* Recent Deliveries Section */}
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <div className="card-title-mobile">
                                        <div className="space-horizontal">
                                            <CheckCircleOutlined />
                                            <span>Recent Deliveries (Last 3 Months)</span>
                                        </div>
                                        <div className="card-actions-mobile">
                                            <Link to="/account/transactions">
                                                <Button type="primary" size="small">View All</Button>
                                            </Link>
                                        </div>
                                    </div>
                                }
                                extra={
                                    <div className="card-actions-desktop">
                                        <Link to="/account/transactions">
                                            <Button type="primary" size="small">View All</Button>
                                        </Link>
                                    </div>
                                }
                                className="packages-card"
                            >
                                {this.state.load ? (
                                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
                                ) : this.state.recentDeliveries.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '40px' }}>
                                        <InboxOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
                                        <div style={{ marginTop: '16px', color: '#999' }}>
                                            No deliveries found in the last 3 months
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        <Table size="sm" responsive>
                                            <thead>
                                                <tr>
                                                    <th>Store Id</th>
                                                    <th>Cabinet</th>
                                                    <th>Code</th>
                                                    <th>Stored</th>
                                                    <th>Delivered</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.recentDeliveries.slice(0, 10).map((record, index) =>
                                                        <tr key={record.storeId || index}>
                                                            <td>{record.storeId}</td>
                                                            <td>{record.cabinetId}</td>
                                                            <td>{record.pickCode}</td>
                                                            <td>{record.storeTime}</td>
                                                            <td style={{ color: '#52c41a', fontWeight: 'bold' }}>{record.pickTime}</td>
                                                            <td>
                                                                <Tag color="green" size="small">Delivered</Tag>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                )}
                            </Card>
                        </Col>

                        {/* Pending Packages Section */}
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <div className="card-title-mobile">
                                        <div className="space-horizontal">
                                            <ClockCircleOutlined />
                                            <span>Pending Packages</span>
                                        </div>
                                        <div className="card-actions-mobile">
                                            <Button
                                                type="default"
                                                size="small"
                                                icon={<ReloadOutlined />}
                                                onClick={() => this.getPackageData()}
                                                loading={this.state.load}
                                            >
                                                Refresh
                                            </Button>
                                        </div>
                                    </div>
                                }
                                className="packages-card"
                            >
                                {this.state.load ? (
                                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
                                ) : this.state.pendingPackages.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '40px' }}>
                                        <InboxOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
                                        <div style={{ marginTop: '16px', color: '#999' }}>
                                            No pending packages
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        <Table size="sm" responsive>
                                            <thead>
                                                <tr>
                                                    <th>Store Id</th>
                                                    <th>Cabinet</th>
                                                    <th>Code</th>
                                                    <th>Stored</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.pendingPackages.slice(0, 10).map((record, index) => {
                                                        const penaltyInfo = this.state.packagePenalties[record.storeId];
                                                        const isPaying = this.state.payingPenalty[record.storeId] || false;

                                                        return (
                                                            <tr key={record.storeId || index}>
                                                                <td>{record.storeId}</td>
                                                                <td>{record.cabinetId}</td>
                                                                <td>{record.pickCode}</td>
                                                                <td>{record.storeTime}</td>
                                                                <td>
                                                                    {penaltyInfo && penaltyInfo.checking ? (
                                                                        <div>
                                                                            <Tag color="processing" icon={<ReloadOutlined spin />}>
                                                                                Checking...
                                                                            </Tag>
                                                                        </div>
                                                                    ) : penaltyInfo && penaltyInfo.isPastDue ? (
                                                                        <div>
                                                                            <Tag color="error" icon={<WarningOutlined />}>
                                                                                Past Due
                                                                            </Tag>
                                                                            <div style={{ fontSize: '12px', color: '#ff4d4f', marginTop: '4px' }}>
                                                                                ${penaltyInfo.amount.toFixed(2)} ({penaltyInfo.days} days)
                                                                            </div>
                                                                        </div>
                                                                    ) : penaltyInfo && penaltyInfo.alreadyPaid ? (
                                                                        <div>
                                                                            <Tag color="success">Ready</Tag>
                                                                            <div style={{ fontSize: '12px', color: '#52c41a', marginTop: '4px' }}>
                                                                                Penalty Paid
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <Tag color="orange" size="small">Pending</Tag>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {penaltyInfo && penaltyInfo.isPastDue && !penaltyInfo.alreadyPaid && !penaltyInfo.checking && (
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
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                )}
                            </Card>
                        </Col>
                    </Row>

                    {/* Modals */}
                    {this.renderZipcode()}
                    {this.renderDepartment()}
                    {this.rendercancelbind()}
                    {ModalBox.call(this)}
                </div>
            </div>
        );
    }
}

export default Account;

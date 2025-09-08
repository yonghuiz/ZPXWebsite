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
    Progress
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
    PlusOutlined
} from '@ant-design/icons';
import { Table } from 'reactstrap';
import { Link, } from 'react-router-dom';
import AccountHeader from './AccountHeader';
import { GET_BIND_APARTMENT, GET_USER_STAT_URL, GET_DEPT_LIST, GET_UNIT_LIST, get_data_token, BIND_APARTMENT, CANCELBIND_APARTMENT, GET_PICK_LIST, GET_STORE_LIST } from '../../config/network.jsx'
import { ModalBox, showErrorMessage } from '../MessageBox'
import { FormattedMessage, } from 'react-intl';

const { Title, Text } = Typography;

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberinfo: {},
            memberprofile: {},
            statusdetail: {},
            isProfilecompleted: '',
            isEmailVerified: '',
            hasBindAddress: '',
            transactions: [],
            recentDeliveries: [], // Add this for delivered packages in last 3 months
            pendingPackages: [], // Add this for pending packages
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
        if (localStorage.getItem('accessToken') == null) {
            this.setState({ reload: true });
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
                this.getPickList();
                this.getPackageData(); // Load both recent deliveries and pending packages
            })
            .catch(err => showErrorMessage.call(this, 'Get user statistics error:' + err))
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
                showErrorMessage.call(this, 'Get apartment error:' + err);
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
                    pendingPackages: pendingPackages 
                });
            })
            .catch(err => {
                console.error('Get pending packages error:', err);
                this.setState({ 
                    pendingPackages: [] 
                });
            });
    }
    //
    render() {
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
                    title={<FormattedMessage id="page.sidnav.title.Dashboard" defaultMessage="Dashboard" />}
                />

                <div className="dashboard-content">
                    {/* Welcome Section */}
                    <div className="welcome-section">
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={16}>
                                <Card className="welcome-card" bordered={false}>
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
                                <Card className="quick-actions-card" bordered={false}>
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
                            <Card bordered={false} className="status-card">
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
                            <Card bordered={false} className="status-card">
                                <Statistic
                                    title="Packages"
                                    value={this.state.records.length}
                                    prefix={<InboxOutlined style={{ color: '#1890ff' }} />}
                                    valueStyle={{ color: '#1890ff' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card bordered={false} className="status-card">
                                <Statistic
                                    title="Apartments"
                                    value={this.state.apartments.length}
                                    prefix={<HomeOutlined style={{ color: '#722ed1' }} />}
                                    valueStyle={{ color: '#722ed1' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card bordered={false} className="status-card">
                                <Statistic
                                    title="Email Status"
                                    value={memberinfo.statusDetail?.isEmailVerified ? "Verified" : "Pending"}
                                    prefix={<MailOutlined style={{ color: memberinfo.statusDetail?.isEmailVerified ? '#52c41a' : '#faad14' }} />}
                                    valueStyle={{ color: memberinfo.statusDetail?.isEmailVerified ? '#52c41a' : '#faad14' }}
                                />
                            </Card>
                        </Col>
                    </Row>

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
                                    <div className="space-horizontal">
                                        <ClockCircleOutlined />
                                        <span>Pending Packages</span>
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.pendingPackages.slice(0, 10).map((record, index) =>
                                                        <tr key={record.storeId || index}>
                                                           <td>{record.storeId}</td>  
                                                           <td>{record.cabinetId}</td>  
                                                           <td>{record.pickCode}</td>  
                                                           <td>{record.storeTime}</td>  
                                                           <td>
                                                               <Tag color="orange" size="small">Pending</Tag>
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

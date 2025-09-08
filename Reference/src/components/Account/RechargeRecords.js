import React, { Component } from 'react';
import './Account.css'
import AccountHeader from './AccountHeader';
import {
    RECHARGE_DETAIL_URL,
    get_data_token,

} from '../../config/network.jsx'
import { showErrorMessage, ModalBox,  } from '../MessageBox';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { Col, Button,  FormGroup,  Input,Table , } from 'reactstrap';



class RechargeRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            startDate: this.getInitStartTimeStr(),
            endDate: this.formatDate(new Date()),
            load:false,
        };
        this.getRechargeRecords = this.getRechargeRecords.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
        this.checkDateInput = this.checkDateInput.bind(this);
    }
    componentDidMount() {
        this.getRechargeRecords();
    }
    getRechargeRecords() {
        this.setState({load:true})
        get_data_token(RECHARGE_DETAIL_URL, {
            startime: new Date(this.state.startDate).getTime() / 1000,
            endtime: new Date(this.state.endDate).getTime() / 1000,
        })
            .then(data => {

                if(data.data===0)
                {
                    this.setState({ records: "",load:false });
                   //return;
                }
                else
                {
                 data.data.map(record => record.key = record.datetime);
                 this.setState({ records: data.data,load:false });
                 console.log("getRechargeRecords", data.data);
                }
            })
            .catch(err => {
                this.setState({ records: [],load:false });
                showErrorMessage.call(this, 'Get recharge records error:' + err);
            })
    }
    getInitStartTimeStr() {

        let d = new Date(Date.now() - 1000 * 86400 * 30);
        return this.formatDate(d);
    }
    formatDate(date) {
        
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
    checkDateInput(dateStr){
        if(dateStr.search(/^\d{4}-\d{2}-\d{2}$/)===-1) {
            showErrorMessage.call(this,'Please input right date format: yyyy-mm-dd')
            return false;
        }
  
        return true;
    }
    handleChangeStartTime(event) {
        if(!this.checkDateInput(event.target.value))
            return;
        this.setState({
            startDate: event.target.value
        });
    }
    handleChangeEndTime(event) {
        if(!this.checkDateInput(event.target.value))
            return;
        this.setState({
            endDate: event.target.value
        });
    }
    renderRecords() {
        if (this.state.load) 
            return <h5>Loading...</h5>;
        if (this.state.records.length === 0) 
            return <p>You have no recharge record.</p>;
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.records.map(record =>
                            <tr>
                            <td>{new Date(parseInt(record.create_time)*1000).toLocaleString()}</td>
                            <td>{record.amount}</td>
                          </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }
    render() {
        return (
            <div >
                <div className="main">
                    <AccountHeader page={"RechargeRecords"} title="Recharge Records" />
                    <div className="main-body">
                        <FormGroup row>
                            <Col sm={4}>
                                {/* <DatePicker selected={this.state.startDate} onChange={this.handleChangeStartTime}/> */}
                                <Input type='date' value={this.state.startDate} onChange={this.handleChangeStartTime} />
                            </Col>
                            <Col sm={4}>
                                {/* <DatePicker selected={this.state.endDate} onChange={this.handleChangeEndTime}/> */}
                                <Input type='date' value={this.state.endDate} onChange={this.handleChangeEndTime} />
                            </Col>
                            <Col sm={4}>
                                <Button color="primary"
                                    onClick={this.getRechargeRecords}><i class="fa fa-search"></i></Button>
                            </Col>
                        </FormGroup>

                        {this.renderRecords()}

                    </div>
                </div>
                {ModalBox.call(this)}

            </div>
        );
    }
}

export default RechargeRecords;
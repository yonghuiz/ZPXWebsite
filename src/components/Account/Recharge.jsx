import React, { Component } from 'react';
import './Account.css'
import DropIn from "braintree-web-drop-in-react";
import AmountInput from './AmountInput'
import AccountHeader from './AccountHeader';
import {PAYPAL_TOKEN_URL,
    PAYPAL_CHECKOUT_URL,
    get_data_token,
    post_data_token,
} from '../../config/network.jsx'
import { Redirect,} from 'react-router-dom'
import {ModalBox,openErrorBox, showErrorMessage, openSuccessBox} from './MessageBox'
import {Button} from 'reactstrap'



class Recharge extends Component {
    constructor(props) {
        super(props);
        this.instance={};
        this.state = {
            clientToken:'',
            amount:10,
            redict:false,
        };
        this.onAmountChange = this.onAmountChange.bind(this);
    }
    onAmountChange(event){
        this.setState({amount:event.target.value});
    }
    async componentDidMount() {

        get_data_token(PAYPAL_TOKEN_URL,{})
        .then(data=>{
            this.setState({clientToken:data.token});
        })
        .catch(err=>showErrorMessage.call(this,'Get payment token error:'+err));
    }
    async recharge() {
        if(this.state.amount<5) {
            showErrorMessage.call(this,'Amount should be great than $5.');
            return;
        }
        // Send the nonce to your server
        const { nonce } = await this.instance.requestPaymentMethod();
        console.log('nonce:',nonce);

        post_data_token(PAYPAL_CHECKOUT_URL,{
            payment_method_nonce:nonce,
            amount:this.state.amount,
        }).then(data=>{
            openSuccessBox.call(this,
                {
                    content:'Recharge Successfully.',
                    onOK:()=>{this.setState({redict:true,redictTo:'/account/dashboard'});}
                }
            );
           
        })
        .catch(err=>openErrorBox.call(this,{content:err}));
    }

    render_paypal(){
        if (!this.state.clientToken) {
            return (
                <div>
                    <h5>Loading...</h5>
                </div>
            );
        } else {
            return (
                <div>
                    <AmountInput value={this.state.amount} onChange={this.onAmountChange}/>
                    <DropIn
                        options={{ 
                            authorization: this.state.clientToken,
                            paypal: {
                                flow: 'vault'
                              }
                        
                        }}
                        onInstance={instance => (this.instance = instance)}
                    />
                    <Button color='primary'  onClick={this.recharge.bind(this)}>Recharge</Button>
                </div>
            );
        }
    }

    render() {
        if (this.state.redict) {
            return <Redirect to={this.state.redictTo} />;
          }
        return (
            <div >
                    <div className="main">  
                        <AccountHeader page={"Recharge"} title="Recharge"/>
                        <div className="main-body">
                        {
                           this.render_paypal()
                        }
                        </div>
                        { ModalBox.call(this)}
                        
                    </div>

            </div>
        );
    }

}

export default Recharge;
import React, { Component } from 'react';
import './AmountInput.css'

class AmountInput extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
         };
    }
    render() {
        return (
            <div className="amount-imput"> 
            <p>Please input the amount</p>
            <label for="amount" className="">
            <span className="input-label">Amount</span>
            <div className="input-wrapper amount-wrapper">
            <input id="amount" name="amount" type="tel" 
                value={this.props.value} onChange = {this.props.onChange}/>
            </div>
            </label>
            {
                this.props.value < 5 ?
            <p className="errinfo">Amount should be great than $5.</p>
            :null
            }
            
            </div>
        );
    }
}

export default AmountInput;
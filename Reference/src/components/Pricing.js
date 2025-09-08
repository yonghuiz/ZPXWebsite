import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import './Pricing.css'
import { Link} from 'react-router-dom'


class Pricing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className='myContainer'>
                <Header page='Pricing'/>
                <section>
                    <div className="mycontainer">
                    <br/>
                        <h4>SMS Pricing for Unite State</h4>

                        <table className="blueTable">
                            <thead>
                                <tr>
                                    <th>SMS PER MONTH</th>
                                    <th>PRICE PER SMS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>First 10,000 SMS</td>
                                    <td>$0.006 per SMS</td>
                                </tr>
                                <tr>
                                    <td>From 10,001 to 100,000 SMS</td>
                                    <td>$0.005 per SMS</td>
                                </tr>
                                <tr>
                                    <td>From 100,001 to 1,000,000 SMS</td>
                                    <td>$0.004 per SMS</td>
                                </tr>
                                <tr>
                                    <td>Over 1,000,000 SMS</td>
                                    <td>$0.003 per SMS</td>
                                </tr>
                            </tbody>
                        </table>
                        <p></p>
                        <Link className="btn1" to="/register">  <i className="fa fa-hand-o-right"></i>{' 200 free SMS Messages after register, start for free '} 
                <i className="fa fa-hand-o-left"></i></Link>
                        <p/>
                    </div>
                </section>
                <section>
                    <div className="mycontainer">
                        <h5>How many budget do you have for SMS per month?</h5>
                        <table className="blueTable">
                            <thead>
                                <tr>
                                    <th>Budget per Month</th>
                                    <th>SMS you can send</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>$5</td>
                                    <td>833 SMS</td>
                                </tr>
                                <tr>
                                    <td>$10</td>
                                    <td>1,667 SMS</td>
                                </tr>
                                <tr>
                                    <td>$20</td>
                                    <td>3,333 SMS</td>
                                </tr>
                                <tr>
                                    <td>$50</td>
                                    <td>8,333 SMS</td>
                                </tr>
                                <tr>
                                    <td>$100</td>
                                    <td>18,000 SMS</td>
                                </tr>
                                <tr>
                                    <td>$500</td>
                                    <td>98,000 SMS</td>
                                </tr>
                                <tr>
                                    <td>$1000</td>
                                    <td>222,500 SMS</td>
                                </tr>
                            </tbody>
                        </table>
                        <p></p>

                    </div>
                </section>
                <Footer />
            </div>
            
        );
    }
}

export default Pricing;
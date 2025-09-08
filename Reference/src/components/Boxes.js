import React, { Component } from 'react';
import './Boxes.css'

class Boxes extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <section id="boxes">
                <div className="mycontainer">
                    <div className="box">
                        <img alt='' src={require("../img/save_money.jpg")}/>
                        <p>Unmanned solution, save cost for management!</p>
                    </div>
                    <div className="box">
                        <img alt='' src={require("../img/easy_use.jpg")}/>                
                        <p>No hassle, pick up at the locker.</p>
                    </div>
                    <div className="box">
                        <img alt='' src={require("../img/api.png")}/>
                        <p>Easily integrate with any other application for various use cases </p>
                    </div>
                </div>
            </section>            
        );
    }
}

export default Boxes;
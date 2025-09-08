import React, { Component } from 'react';
import './Account.css'
import SideNav from './SideNav'

class Usage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div >
                    <SideNav page={"Usage"}/>
                    <div className="main">  
                        <div className="main-header">
                            <h3>Usage</h3>
                        </div>
                        <div className="main-body">
                        </div>
                    </div>
            </div>
        );
    }
}

export default Usage;
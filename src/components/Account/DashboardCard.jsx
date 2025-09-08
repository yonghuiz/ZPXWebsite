import React, { Component } from 'react';
import './DashboardCard.css'

class DashboardCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="dcard">
                <div className="dcard-titile">
                    {this.props.title}
                </div>
                <div className="dcard-body">                 
                        <p className="dcard-content">{this.props.content}</p>
                        <p className="dcard-des">{this.props.des}</p>
                </div>
            </div>
        );
    }
}

export default DashboardCard;
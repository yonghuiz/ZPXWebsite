import React, { Component } from 'react';
import {Redirect,} from 'react-router-dom'
import {  logout,} from '../config/network.jsx'

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        logout();
    }
    render() {
        return (
            <Redirect to={'/'} />
        );
    }
}

export default Logout;
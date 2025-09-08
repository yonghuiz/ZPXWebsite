import React, { Component } from 'react';
import {Navigate,} from 'react-router-dom'
import {  logout,} from '../../config/network'

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        logout();
    }
    render() {
        return (
            <Navigate to={'/'} replace />
        );
    }
}

export default Logout;
import React, { Component } from 'react';
import ShowCase from './ShowCase'
import Boxes from './Boxes'
import Footer from './Footer'
import Header from './Header'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div >
                <Header page='Home'/>
                <ShowCase />
                <Boxes />
                <Footer />

            </div>
        );
    }
}

export default Home;
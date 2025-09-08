import React, { Component } from 'react';
import './ShowCase.css'
import { Link} from 'react-router-dom'


class ShowCase extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <section id="showcase">
                <div className="mycontainer">
                    <h1>Great Self-service Express Cabinet Management</h1>
                    <p>Fully automatic express cabinet management allows users to check out and check in equipment easily</p>
                    <br/>
                    <Link className="btn1" to="/register"> Register to use</Link>
                    <p></p>
                </div>
                
            </section>
        );
    }
}

export default ShowCase;
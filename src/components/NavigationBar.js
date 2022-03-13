import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {logoutUser} from '../services/index';
import "../App.css";

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    logout = () => {
        this.props.logoutUser();
    };

    render() {
        console.log("from NavigationBar.js");
        console.log(this.props.auth.loanApplicantUser);
        const guestLinks = (
            <>
                <div className="mr-auto"></div>
                <Nav className="navbar-right">
                    <Link to={"login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> SignIn</Link>
                </Nav>
            </>
        );
        const userLinks = (
            <>
                <Nav className="mr-auto">
                    <Link to={"add"} className="nav-link">Apply for Loan</Link>
                    <Link to={"list"} className="nav-link">Loan Applications</Link>
                </Nav>
                <Nav className="navbar-right">
                    <Link to={"login"} className="nav-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
                </Nav>
            </>
        );

        

        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                     Loan Management System
                </Link>
                {/* User {this.props.auth.loanApplicantUser?this.props.auth.loanApplicantUser.split('@')[0]:""} */}
                {this.props.auth.isLoggedIn ? userLinks : guestLinks}
            </Navbar>
        );
    };
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
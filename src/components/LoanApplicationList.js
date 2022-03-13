import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from './MyToast';
import axios from 'axios';
import {apiURL} from '../constants';

class LoanApplicationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loanApplications : []
        };
    }

    componentDidMount() {
        // Add logic to redirect to homepage if not logged in.
        if(this.props.auth.isLoggedIn!==true){
            this.props.history.push("/");
        }
        this.findAllLoanApplications();
    }

    findAllLoanApplications() {
        axios.get(apiURL + "/rest/loanApplication/user/" + this.props.auth.loanApplicantUser)
            .then(response => response.data)
            .then((data) => {
                this.setState({loanApplications: data});
            });
    };

    deleteLoanApplication = (loanApplicationId) => {
        axios.delete(apiURL + "/rest/loanApplication/"+loanApplicationId)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        loanApplications: this.state.loanApplications
                            .filter(loanApplication => loanApplication.loanApplicationId !== loanApplicationId)
                    });
                } else {
                    this.setState({"show":false});
                }
            });
    };

    render() {
        return (
        <div>
        <div style={{"display":this.state.show ? "block" : "none"}}>
            <MyToast show = {this.state.show} 
                     message = {"Loan Application deleted successfuly"} 
                     type = {"danger"}/>
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header><FontAwesomeIcon icon={faList} /> List of Loan Applications</Card.Header>
            <Card.Body>
                <Table bordered hover striped variant="dark">
                    <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Email Address</th>
                            <th>Loan Amount</th>
                            <th>Start Date</th>
                            <th>Expiry Date</th>
                            <th>Monthly Installments</th>
                            <th>Payback Period</th>
                            <th>T{"&"}C</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.loanApplications.length === 0 ?
                            <tr align="center">
                                <td colSpan="9">No Loan Applications</td>
                            </tr> :
                            this.state.loanApplications.map((loanApplication) => (
                            <tr key={loanApplication.loanApplicationId}>
                                <td>{loanApplication.loanApplicantName}</td>
                                <td>{loanApplication.emailAddress}</td>
                                <td>{loanApplication.loanAmount}</td>
                                <td>{loanApplication.loanStartDate}</td>
                                <td>{loanApplication.loanExpiryDate}</td>
                                <td>{loanApplication.monthlyInstallment}</td>
                                <td>{loanApplication.paybackPeriod}</td>
                                <td>
                                    <Button 
                                    onClick={()=>{window.open("https://www.google.com/")}}
                                    variant="link">
                                        T{"&"}C
                                    </Button>
                                </td>
                                <td>
                                <ButtonGroup>
                                    <Link   to={"edit/"+loanApplication.loanApplicationId} 
                                            className="btn btn-sm btn-outline-primary">
                                                <FontAwesomeIcon icon={faEdit} />
                                    </Link>{' '}
                                    <Button size="sm" variant="outline-danger" 
                                            onClick={this.deleteLoanApplication.bind(this, loanApplication.loanApplicationId)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </ButtonGroup>
                                </td>
                            </tr>
                            ))
                        }
                        </tbody>
                </Table>
            </Card.Body>
        </Card>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth:state.auth
    }
};

export default connect(mapStateToProps)(LoanApplicationList);
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Card, Form, Button, Col, InputGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';
import {apiURL} from '../constants'

class LoanApplication extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.validated = false;
        this.loanApplicationChange = this.loanApplicationChange.bind(this);
        this.submitLoanApplication = this.submitLoanApplication.bind(this);
    }

    initialState = {
        loanApplicationId:'', loanApplicantName:'', address:'', 
        emailAddress:'', contactNumber:'', loanAmount:'' , loanStartDate:'' , loanExpiryDate:'' ,
        monthlyInstallment:'' , paybackPeriod:''
    };

    componentDidMount() {
        // Add logic to redirect to homepage if not logged in.
        if(this.props.auth.isLoggedIn!==true){
            this.props.history.push("/");
        }

        const loanApplicationId = +this.props.match.params.loanApplicationId;
        console.log("from LoanApplication.js")
        console.log(loanApplicationId);
        if(loanApplicationId) {
            this.findLoanApplicationById(loanApplicationId);
        }
    }

    findLoanApplicationById = (loanApplicationId) => {
        axios.get(apiURL + "/rest/loanApplication/"+loanApplicationId)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        loanApplicationId:response.data.loanApplicationId, 
                        loanApplicantName:response.data.loanApplicantName, 
                        address:response.data.address, 
                        emailAddress:response.data.emailAddress, 
                        contactNumber:response.data.contactNumber, 
                        loanAmount:response.data.loanAmount, 
                        loanStartDate:response.data.loanStartDate,
                        loanExpiryDate:response.data.loanExpiryDate,
                        monthlyInstallment:response.data.monthlyInstallment,
                        paybackPeriod:response.data.paybackPeriod
                    });
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });
    };

    resetLoanApplication = () => {
        this.setState(() => this.initialState);
    };

    // convertDate = (date)=>{
    //     let [day,month,year]=date.split('-');
    //     return year+"-"+month+"-"+day;
    // }

    submitLoanApplication = event => {
        event.preventDefault();

        const loanApplication = {
            loanApplicantUser:this.props.auth.loanApplicantUser, 
            loanApplicantName:this.state.loanApplicantName, 
            address:this.state.address, 
            emailAddress:this.state.emailAddress, 
            contactNumber:this.state.contactNumber, 
            loanAmount:this.state.loanAmount, 
            loanStartDate:this.state.loanStartDate,
            loanExpiryDate:this.state.loanExpiryDate,
            monthlyInstallment:this.state.monthlyInstallment,
            paybackPeriod:this.state.paybackPeriod
        };

        console.log("saving");
        console.log(loanApplication);

        axios.post(apiURL + "/rest/loanApplication", loanApplication)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"post"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    updateLoanApplication = event => {
        event.preventDefault();

        const loanApplication = {
            loanApplicationId:this.state.loanApplicationId,
            loanApplicantUser:this.props.auth.loanApplicantUser, 
            loanApplicantName:this.state.loanApplicantName, 
            address:this.state.address, 
            emailAddress:this.state.emailAddress, 
            contactNumber:this.state.contactNumber, 
            loanAmount:this.state.loanAmount, 
            loanStartDate:this.state.loanStartDate,
            loanExpiryDate:this.state.loanExpiryDate,
            monthlyInstallment:this.state.monthlyInstallment,
            paybackPeriod:this.state.paybackPeriod
        };

        console.log("updating");
        console.log(loanApplication);

        axios.put(apiURL + "/rest/loanApplication", loanApplication)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"put"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    setTimeout(() => this.loanApplicationList(), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    loanApplicationChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    loanApplicationList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {loanApplicantName, address, 
        emailAddress, contactNumber, loanAmount , loanStartDate , loanExpiryDate ,
        monthlyInstallment , paybackPeriod} = this.state;

        return (
        <div>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} 
                    message = {this.state.method === "put" 
                        ? "Loan Application updated Successfully." 
                        : "Loan Application submitted Successfully."} 
                    type = {"success"}/>
            </div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <FontAwesomeIcon 
                        icon={this.state.loanApplicationId ? faEdit : faPlusSquare} 
                    /> {this.state.loanApplicationId ? "Update your Loan Application" : "Apply for a Loan!"}
                </Card.Header>
                <Form   
                        onReset={this.resetLoanApplication} 
                        onSubmit={this.state.loanApplicationId 
                            ? this.updateLoanApplication 
                            : this.submitLoanApplication} 
                        id="loanApplicationFormId">
                    <Card.Body>

                        <Form.Row>
                            <Form.Group as={Col} controlId="loanApplicantName">
                                <Form.Label>Loan Applicant Name</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="loanApplicantName"
                                    value={loanApplicantName} onChange={this.loanApplicationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="" />
                                <Form.Control.Feedback >
                                    Great name!.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="emailAddress">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="email" name="emailAddress"
                                    value={emailAddress} onChange={this.loanApplicationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="name@example.com" />
                                 <Form.Control.Feedback type="invalid">
                                    Please provide a valid email-id.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                            
                        <Form.Row>
                            <Form.Group as={Col} controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="address"
                                    value={address} onChange={this.loanApplicationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter your permanent address" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="contactNumber">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="contactNumber"
                                    value={contactNumber} onChange={this.loanApplicationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="loanAmount">
                                <Form.Label>Loan Amount</Form.Label>
                                <InputGroup>
                                <InputGroup.Text className={"bg-dark text-white"}>₹</InputGroup.Text>
                                <Form.Control required autoComplete="off"
                                    type="text" name="loanAmount"
                                    value={loanAmount} onChange={this.loanApplicationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="" />
                                </InputGroup>
                            </Form.Group>                           
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="loanStartDate">
                                <Form.Label>Loan Start Date</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="date" name="loanStartDate"
                                    value={loanStartDate} onChange={this.loanApplicationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="loanExpiryDate">
                                <Form.Label>Loan Expiry Date</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="date" name="loanExpiryDate"
                                    value={loanExpiryDate} onChange={this.loanApplicationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="" />
                            </Form.Group>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Group as={Col} controlId="monthlyInstallment">
                                <Form.Label>Monthly Installment</Form.Label>
                                <InputGroup>
                                <InputGroup.Text className={"bg-dark text-white"}>₹</InputGroup.Text>
                                <Form.Control required autoComplete="off"
                                    type="text" name="monthlyInstallment"
                                    value={monthlyInstallment} onChange={this.loanApplicationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="" />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} controlId="paybackPeriod">
                                <Form.Label>Payback Period</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="paybackPeriod"
                                    value={paybackPeriod} onChange={this.loanApplicationChange}
                                    className={"bg-dark text-white"}
                                    placeholder="" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group className="mb-3">
                            <Form.Check required
                                    label="Agree to terms and conditions"
                                    // feedback="You must agree before submitting."
                                    // feedbackType="invalid"
                                    />
                            </Form.Group>
                        </Form.Row>

                    </Card.Body>

                    <Card.Footer style={{textAlign:"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> 
                            {this.state.loanApplicationId ? "Update" : "Save"}
                        </Button>{' '}
                        <Button size="sm" variant="info" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Reset
                        </Button>{' '}
                        <Button size="sm" variant="info" type="button" 
                                onClick={this.loanApplicationList.bind()}>
                            <FontAwesomeIcon icon={faList} /> Applied Loans
                        </Button>
                    </Card.Footer>
                </Form>
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

export default connect(mapStateToProps)(LoanApplication);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, Button, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {signInWithGoogle} from '../services/index';
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        error:''
    };

    // trying to solve problem of executing actions after signup
    componentDidUpdate(){
        if(this.props.auth.isLoggedIn) {
            return this.props.history.push("/");
        }
    }

    validateUser = () => {
        this.props.signInWithGoogle();
        // setTimeout(() => {
        //     if(this.props.auth.isLoggedIn) {
        //         return this.props.history.push("/");
        //     } else {
        //         this.setState({"error":"Try signing-in again"});
        //     }
        // },9000 );
    };

    render() {
        const { error} = this.state;
        return (
            <Row className="justify-content-md-center">
                <Col xs={5}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header style={{"textAlign":"left"}} >
                            <FontAwesomeIcon icon={faSignInAlt}/> Login
                        </Card.Header>
                        <Card.Body style={{"textAlign":"center"}}>
                            <Button type="button" className="login-with-google-btn" onClick={this.validateUser} >
                                Sign in with Google
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth:state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signInWithGoogle: ()=> dispatch(signInWithGoogle())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
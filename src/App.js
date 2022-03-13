import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Login from './components/Login';
import LoanApplication from './components/LoanApplication';
import LoanApplicationList from './components/LoanApplicationList';

export default function App() {
  const marginTopBottom = {
    marginTop:"20px",
    marginBottom:"60px"
  };

  const heading = "Welcome to our Portal";
  const quote = "Managing your loans made easy";
  const footer = "Spread the word :)";

  return (
    <Router>
        <NavigationBar/>
        <Container >
            <Row>
                <Col lg={12} style={marginTopBottom}>
                    <Switch>
                        <Route path="/" exact component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>
                        <Route path="/add" exact component={LoanApplication}/>
                        <Route path="/edit/:loanApplicationId" exact component={LoanApplication}/>
                        <Route path="/list" exact component={LoanApplicationList}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/logout" exact component={Login}/>
                    </Switch>
                </Col>
            </Row>
            <Row>

            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}

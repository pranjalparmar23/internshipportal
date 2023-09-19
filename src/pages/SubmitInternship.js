//import logo from './logo.svg';
//import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';

function App() {
    const auth = useAuthUser()
    const Email = auth().email
    const Session = auth().session

    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Password, setPassword] = useState('')
    const [AcademicYear, setAcademicYear] = useState('')
    const [MotherName, setMotherName] = useState('')
    const [FatherName, setFatherName] = useState('')
    const [MobileNo, setMobileNo] = useState('') 


    const [Provider, setProvider] = useState('')
    const [FromDuration, setFromDuration] = useState('')
    const [ToDuration, setToDuration] = useState('')
    const [WhatFor, setWhatFor] = useState('')
    const [Domain, setDomain] = useState('')
    
    console.log(Email)

    const signOut = useSignOut();
    const navigate = useNavigate();

    function logout() {
        signOut();
        navigate("/login");
    }
    
    useEffect(() => {
      //Runs on every render
      getuserdata()
      if(Session==="admin"){
        logout()
      }
    });

    //this works?????
    async function getuserdata() {
      const response = await fetch('http://localhost:1337/api/getuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email
      }),
    })

    const data = await response.json()

    console.log(data)

    //setuserinfo(data) i don't possibly know why but this keeps hitting.. should it be a problem? idk

    setFirstName(data.firstname)
    setLastName(data.lastname)
    setAcademicYear(data.academicyear)
    setMotherName(data.mothername)
    setFatherName(data.fathername)
    setMobileNo(data.mobileno)

    }

    async function submitint(event) {
        event.preventDefault()
        
        const stuname = `${FirstName} ${LastName}`
    
        const response = await fetch('http://localhost:1337/api/subintern', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email,
            stuname,
            Provider,
            FromDuration,
            ToDuration,
            WhatFor,
            Domain,
          }),
        })
    
        const data = await response.json()
    
        console.log(data)
        
        if (data.error){
          alert("Error ocurred while posting!")
        } else {
          alert("Submitted!")
        }
        
    
      }

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand navbar-dark bg-primary">
        <Link to="/dashboard" className="navbar-brand">
          &nbsp;Internship Management Portal
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/dashboard"} className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/submitinternship"} className="nav-link">
              Submit
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/notifications"} className="nav-link">
              Notifications
            </Link>
          </li>
          <li className="nav-item">
            <button onClick={logout} className="nav-link">
              Sign out
            </button>
          </li>
        </div>
      </nav>
      <br/><br/>

      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={10} xs={12}>
          <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">Enter details about completed internship</h2>
                  <div className="mb-3">
                    <Form onSubmit={submitint}>
                      <br/>
                      <Form.Group className="mb-3" controlId="Provider">
                        <Form.Label className="text-center">
                          Whom was the internship provided by?
                        </Form.Label>
                        <Form.Control value={Provider} onChange={(e) => setProvider(e.target.value)} type="text" placeholder="i.e. Name of Company, Person, University, etc." />
                      </Form.Group>

                      <div className='d-flex'>
                      <Form.Group className="col md-4" controlId="FromDuration">
                        <Form.Label className="text-center">
                          From
                        </Form.Label>
                        <Form.Control value={FromDuration} onChange={(e) => setFromDuration(e.target.value)} type="date" />
                      </Form.Group>

                      <Form.Group className="col-md-1" controlId="">
                      </Form.Group>

                      <Form.Group className="col md-4" controlId="ToDuration">
                        <Form.Label className="text-center">
                          To
                        </Form.Label>
                        <Form.Control value={ToDuration} onChange={(e) => setToDuration(e.target.value)} type="date" />
                      </Form.Group>
                      </div>
                      <br/>

                      <Form.Group className="mb-3" controlId="WhatFor">
                        <Form.Label className="text-center">
                          What was the internship about?
                        </Form.Label>
                        <Form.Control value={WhatFor} onChange={(e) => setWhatFor(e.target.value)} type="text" placeholder="ex. Creating an internship portal" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="Domain">
                        <Form.Label className="text-center">
                          What was the domain of the internship?
                        </Form.Label>
                        <Form.Control value={Domain} onChange={(e) => setDomain(e.target.value)} type="text" placeholder="ex. Web Development, IOT, etc." />
                      </Form.Group>
                      
                      <div className="d-grid">
                        <Button variant="primary" value="submitint" type="submit">
                          Submit
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

//import logo from './logo.svg';
//import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Button, Row, Container, Card, Form, InputGroup, FormGroup } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import IMAGE from '../media/user.png'

function App() {
    const auth = useAuthUser()
    const Email = auth().email
    const Session = auth().session

    const [userdata, setuserdata] = useState('')
    const [interns, setinterns] = useState('')
    const [searchquery, setsearchquery] = useState('')
    const [alluser, setalluser] = useState('')
    //console.log(Email)

    const signOut = useSignOut();
    const navigate = useNavigate();

    function logout() {
        signOut();
        navigate("/login");
    }
    
    useEffect(() => {
      //Runs on every render
      getalluserforadmin()
      if(Session==="user"){
        logout()
      }
    }, []); //do not forgot those [] or it'll keep hitting requests and make your browser crash

    
    const getalluserforadmin = () => {
      fetch("http://localhost:1337/api/getalluserforadmin")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setalluser(data)
        })
    }

    async function searchq(event) {
      event.preventDefault()

      const response1 = await fetch('http://localhost:1337/api/getuserforadmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchquery
      }),
    },)

    const data1 = await response1.json()

    //console.log(data)

    //setuserinfo(data) i don't possibly know why but this keeps hitting.. should it be a problem? idk

    setuserdata(data1)

    const response2 = await fetch('http://localhost:1337/api/getinternsforadmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchquery
      }),
    })

    const data = await response2.json()

    data.reverse()
    
    console.log(data)
    
    setinterns(data)
      
    }




  return (
    <div>
      <nav className="navbar fixed-top navbar-expand navbar-dark bg-primary">
        <Link to="/admindashboard" className="navbar-brand">
          &nbsp;Internship Management Portal
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/admindashboard"} className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/adminsearch"} className="nav-link">
              Manage
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/adminpostnotifs"} className="nav-link">
              Post
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/adminnotifs"} className="nav-link">
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
      <br/><br/><br/><br/><br/>

      
      <Container>
      <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Form onSubmit={searchq}>
        <InputGroup className="mb-3 shadow">
        <Form.Control
          value={searchquery} 
          onChange={(e) => setsearchquery(e.target.value)} 
          type="text"
          placeholder="Search"
          aria-label="Searchq"
          aria-describedby="basic-addon2"
        />
        <Button variant="primary" id="button-addon2" value="searchq" type="submit">
          Search
        </Button>
      </InputGroup>
      </Form>
          </Col>
        </Row>
      
      </Container>
      

      {!userdata && (
      <Container>
      <br/><br/>
      <Col md={8} lg={12} xs={12}> 
      <h1><b>Students</b></h1>
      <div className="border border-2 border-primary"></div>
      <br/>
      <div>
        {(alluser && (
        <div className='row mx-md-n5 gy-4'>
        {alluser.map(auser => (
          <Col lg={4}>
            <div className='card shadow'>
              <div className='card-body'>
                <h4 className="card-title">
                  <b>{auser.stuname}</b>
                </h4>
              </div>
            </div>
          </Col>
        ))}
        </div>))}
        <br/>
      </div>
      </Col>
      </Container>)}
      
      

      <Container>
        <Col md={8} lg={12} xs={12}>
        {userdata && (<h1><b>User</b></h1>)}
        {userdata && (
          <div className='card shadow'>
            <div className="d-flex">
          <div className="border border-2 border-primary"></div>
              <div className='col-md-3'>
                <br/>
                <img class="media-object mw150" width="256"src={IMAGE}/>
              </div>
  
            <div className='col-md-9'>
              <br/>
              <h1>{userdata.firstname} {userdata.lastname}</h1>
              <br/>
              <div className='d-flex'>
                <div className='col md-3'>
                  <h4>First Name: {userdata.firstname}</h4>
                  <h4>Father's Name: {userdata.fathername}</h4>
                  <h4>Mobile Number: {userdata.mobileno}</h4>
                  <h4>Academic Year: {userdata.academicyear}</h4>
                </div>
                <div className='col md-3'>
                  <h4>Last Name: {userdata.lastname}</h4>
                  <h4>Mother's Name: {userdata.mothername}</h4>
                  <h4>Email: {userdata.email}</h4>
                </div>
              </div>
            </div>
          </div>
          </div>
          )
        }
          

        </Col>
      </Container>

      <br/><br/><br/>

      <Container>
      
      <Col md={8} lg={12} xs={12}>
        {userdata && (<h1><b>Completed Internships</b></h1>)}
      </Col>
      {userdata && (<div className="border border-2 border-primary"></div>)}
      <br/>
      <div>
            {interns.length > 0 && (
              <ul className='list-unstyled'>
                {interns.map(intern => (
                  <li><div className="card shadow">
                    
                  <div className="card-header">
                    From {intern.provider}
                  </div>
                  <div className="card-body">
                    <h3 className="card-title"><b>{intern.whatfor}</b></h3>
                    <h4 className="card-title">{intern.domain}</h4>
                    <div className='d-flex'>
                      <div className='col-md-3'>
                        <h4>From: {intern.fromduration}</h4>
                      </div>
                      <div className='col-md-3'>
                        <h4>To: {intern.toduration}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <br/></li>
                ))}
                </ul>
            )}
          </div>
      </Container>

    </div>
  );
}

export default App;

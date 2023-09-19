//import logo from './logo.svg';
//import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import IMAGE from '../media/user.png'

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
    const [interns, setinterns] = useState('')
    //console.log(Email)

    const signOut = useSignOut();
    const navigate = useNavigate();

    function logout() {
        signOut();
        navigate("/login");
    }
    
    useEffect(() => {
      //Runs on every render
      getuserdata()
      getmyinterns()
      if(Session==="admin"){
        logout()
      }
    }, []); //do not forgot those [] or it'll keep hitting requests and make your browser crash

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
    },)

    const data = await response.json()

    //console.log(data)

    //setuserinfo(data) i don't possibly know why but this keeps hitting.. should it be a problem? idk

    setFirstName(data.firstname)
    setLastName(data.lastname)
    setAcademicYear(data.academicyear)
    setMotherName(data.mothername)
    setFatherName(data.fathername)
    setMobileNo(data.mobileno)

    }

    async function getmyinterns(){
      //const stuname = `${FirstName} ${LastName}`
      const response = await fetch('http://localhost:1337/api/getmyinterns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email
      }),
    })

    const data = await response.json()

    data.reverse()
    
    console.log(data)
    
    setinterns(data)

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
      <br/><br/><br/>
      <Container>
        <Col md={8} lg={12} xs={12}>
        <h1><b>User</b></h1>
          <div className='card shadow'>
            <div className="d-flex">
          <div className="border border-2 border-primary"></div>
              <div className='col-md-3'>
                <br/>
                <img class="media-object mw150" width="256"src={IMAGE}/>
              </div>
  
            <div className='col-md-9'>
              <br/>
              <h1>{FirstName} {LastName}</h1>
              <br/>
              <div className='d-flex'>
                <div className='col md-3'>
                  <h4>First Name: {FirstName}</h4>
                  <h4>Father's Name: {FatherName}</h4>
                  <h4>Mobile Number: {MobileNo}</h4>
                  <h4>Academic Year: {AcademicYear}</h4>
                </div>
                <div className='col md-3'>
                  <h4>Last Name: {LastName}</h4>
                  <h4>Mother's Name: {MotherName}</h4>
                  <h4>Email: {Email}</h4>
                </div>
              </div>
            </div>
          </div>
          </div>
          

        </Col>
      </Container>

      <br/><br/><br/>

      <Container>
      <Col md={8} lg={12} xs={12}>
        <h1><b>Completed Internships</b></h1>
      </Col>
      <div className="border border-2 border-primary"></div>
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

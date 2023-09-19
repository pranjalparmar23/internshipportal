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

    const [AdminData, setAdminData] = useState('')
    const [notifs, setnotifs] = useState('')
    console.log(Email)

    const signOut = useSignOut();
    const navigate = useNavigate();

    function logout() {
        signOut();
        navigate("/login");
    }
    
    useEffect(() => {
      //Runs on every render
      getadmindata()
      getmynotifs()
      if(Session==="user"){
        logout()
      }
    }, []);

    async function getadmindata() {
      const response = await fetch('http://localhost:1337/api/getadmin', {
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

    setAdminData(data)
    }

    async function getmynotifs(){
      //const stuname = `${FirstName} ${LastName}`
      const response = await fetch('http://localhost:1337/api/getmynotifs', {
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
    
    setnotifs(data)



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
              <h1>{AdminData.firstname} {AdminData.lastname}</h1>
              <br/>
              <div className='d-flex'>
                <div className='col md-3'>
                  <h4>First Name: {AdminData.firstname}</h4>
                  <h4>Mobile Number: {AdminData.mobileno}</h4>
                </div>
                <div className='col md-3'>
                  <h4>Last Name: {AdminData.lastname}</h4>
                  <h4>Email: {Email}</h4>
                </div>
              </div>
            </div>
          </div>
          </div>
          

        </Col>
      </Container>
      
      <br/><br/>

      {/*<Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
          <div className="border border-2 border-primary"></div>
            success! hello {firstname} {lastname}
          </Col>
        </Row>
  </Container>*/}

      <Container>
        <Col md={8} lg={12} xs={12}>
          <h1><b>Notifications posted by you</b></h1>
        </Col>
        <div className="border border-2 border-primary"></div>
        <br/>
        <Row className="d-flex">
          <Col md={8} lg={12} xs={12}>
          
          <div>
            {notifs.length > 0 && (
              <ul className='list-unstyled'>
                {notifs.map(notif => (
                  <li><div className="card shadow">
                    {/*<div className="border border-2 border-primary"></div>*/}
                  <div className="card-header">
                    Post by You
                  </div>
                  <div className="card-body">
                    <h3 className="card-title"><b>{notif.title}</b></h3>
                    <p className="card-text">{notif.info}</p>
                    <a href={notif.link} className="btn btn-primary">Learn More</a>
                  </div>
                </div>
                <br/></li>
                ))}
                </ul>
            )}
          </div>
          
          </Col>
          
        </Row>
      </Container>
    </div>
  );
}

export default App;

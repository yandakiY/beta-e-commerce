/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Accordion, Button, Card, Col, Container, Figure, Nav, Navbar, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { NavLink, useLocation , useNavigate } from 'react-router-dom'

const About = () => {

  const location = useLocation();
  const navigate = useNavigate();

  // console.log(location.state)

  return (
    <>
          <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand style={{fontFamily:'Montserrat , sans serif' , fontWeight:'bold'}} href="#">
              <h4>About Me</h4>
            </Navbar.Brand>

            <Nav>
              <NavLink style={{color:'whitesmoke' , textDecoration:'none'}} to={'/'}>
                <h5>Go Home</h5>
              </NavLink>
            </Nav>
          </Container>
        </Navbar>
           
        {/* PArt - Presentation */}

        <Container style={{marginTop:'45px'}}>
          <Row style={{display:'flex' , flexDirection:'row', justifyContent:'center' , alignItems:'center'}}> {/* Ligne - Presentation */ }
            <Col lg={4} md={5} xs={12}> {/* Image Part */ }
            {/* Use Figure for Image */}
              <Image
                rounded
                fluid
                width={350}
                height={405}
                alt="My profile"
                src="https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
              />
            </Col>

            <Col lg={8} md={5} xs={12}> {/* Test Presentation Part */}
              {/* Use Card Components */}
              <Card>
                <Card.Body>
                  <Card.Title as={'h3'} style={{fontFamily:'Montserrat' , fontStyle:'bold'}}>
                    Hi i'm Yandaki
                  </Card.Title>
                  <Card.Text style={{textAlign:'justify',fontFamily:'Montserrat'}}>
                    Presentation of software engineer and research leader John Nunn. The project aims to bring the ability to produce highly detailed statistical analysis in a fraction of the time necessary for real life applications. The team's goal is to produce better algorithms for real systems in the context of their complexity. Using a highly structured approach, we can analyze large amount of data and identify many specific and subtle effects (i.e. some more meaningful, positive or negative properties associated with the data) due to a single or specific object. It is possible, in theory, to create more accurate models by having a large number of different and more complex values.
                    Binaries and online courses available on the Guggenheim website are available for students of mathematics using the same basic skills. Other courses offer practical training and a wide variety of computer vision, analytical, and computer science courses.
                    Binaries and online courses available on the Guggenheim website are available for students of mathematics using the same basic skills. Other courses offer practical training and a wide variety of computer vision, analytical, and computer science courses.
                    Binaries and online courses available on the Guggenheim website are available for students of mathematics using the same basic skills. Other courses offer practical training and a wide variety of computer vision, analytical, and computer science courses.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* PArt -  */}

        <Container style={{marginTop:'15px' , marginBottom:'15px'}}>
        
          <Accordion defaultActiveKey={['0','1']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header style={{fontFamily:'Montserrat'}} as={'h2'}>Techs Stacks</Accordion.Header>
              <Accordion.Body style={{fontFamily:'Montserrat'}}>
                <Row lg={3} xs={1} md={3}>
                  {[
                    {
                      name:'React',
                      link:'https://fr.reactjs.org/',
                      description:"React is a free JavaScript library developed by Facebook since 2013. The main goal of this library is to facilitate the creation of single-page web applications, via the creation of components that depend on a state and generate an HTML page at each state change.",
                      img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'},
                    {
                      name:'React-Bootstrap',
                      link:'https://react-bootstrap.github.io/',
                      description:"React-Bootstrap replaces the Bootstrap JavaScript. Each component has been built from scratch as a true React component, without unneeded dependencies like jQueryAs one of the oldest React libraries, React-Bootstrap has evolved and grown alongside React, making it an excellent choice as your UI foundation.",
                      img:'https://miro.medium.com/max/1400/1*ZSIihImW6DeVOYwUL-ghfQ.png'},
                    {
                      name:'Firebase' , 
                      link:'https://firebase.google.com/',
                      description:"Firebase is a set of hosting services for any type of application. It offers NoSQL and real-time hosting of databases, content, social authentication, and notifications, or services, such as a real-time communication server.",
                      img:'https://miro.medium.com/max/300/1*R4c8lHBHuH5qyqOtZb3h-w.png'}
                  ].map((e , idx) => 
                  <Col key={idx}>
                    <Card style={{height:'570px'}}>
                      <Card.Img height={250} width={250} src={e.img} />
                      <Card.Body style={{fontFamily:'Montserrat' , textAlign:'justify'}}>
                        <Card.Title as={'h4'}>{e.name}</Card.Title>
                        <Card.Text>{e.description}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <Button variant='secondary' href={e.link}>Learn More...</Button>
                      </Card.Footer>
                    </Card>
                  </Col>)}
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1" style={{paddingTop:'5px'}}>
              <Accordion.Header style={{fontFamily:'Montserrat'}} as={'h3'}>Certifications</Accordion.Header>
              <Accordion.Body style={{fontFamily:'Montserrat'}}>
              <Row lg={2} md={2} xs={1}>
                {[
                  {
                    title:'Professional degree in Computer Science',
                    year:'2018-2021',
                    school:"Institut Universitaire Technologiques des Eudistes d'Afrique",
                    competences:['Management of Project', 'Modelisation of Systems with UML' , 'Intro to Cloud Computing']
                  },
                  {
                    title:'Algorithms & Data Strutucres in JavaScript',
                    year:'2022',
                    school:"freeCodeCamp Organization",
                    competences:['Master of Javascript' , 'OOP in JavaScript' , 'Writing Data Strutucres in JavaScript']
                  },
                ].map((e , idx) => <Col key={idx}>
                  <Card style={{height:'230px'}}>
                    <Card.Title as='h4' style={{marginLeft:'8px', marginTop:'5px' , textDecoration:'underline'}}>{e.title}</Card.Title>
                    <Card.Body>
                      <Card.Text as='h5' style={{fontStyle:'italic'}}>{e.school} ({e.year})</Card.Text>
                      {e.competences.length > 0 && 
                        <div>
                          <Card.Title>Learning :</Card.Title>
                          <ul style={{fontWeight:'bold'}}>
                              {e.competences.map((e , idx) => <li key={idx}>{e}</li>)}
                          </ul>
                        </div>}
                    </Card.Body>
                  </Card>
                </Col>)}
              </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>


        </Container>
    </>
  )
}

export default About
import React from 'react'
import { Alert, Button, Container, Figure, FloatingLabel, Form, Nav, Navbar, Row, Tab, Tabs } from 'react-bootstrap'
import { AiOutlineGlobal } from 'react-icons/ai'
import { BsFillCartFill } from 'react-icons/bs'

const Authentification = () => {
  return (
    <>
        {/* Nav Bar */}
        <Navbar style={{fontFamily:'Montserrat'}} variant="dark" bg="dark" fixed="sticky">
            <Container>
                <Navbar.Brand>
                    {/* <h4>Authentification <AiOutlineGlobal /></h4> */}
                    <h4 >Managements Articles <BsFillCartFill /> </h4>
                </Navbar.Brand>

                <Nav>
                    <Nav.Link href='/'>Go to home page</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

        <Tabs
            defaultActiveKey={'login'}
            id="justify-tab-example"
            className="mb-3"
            justify
            >
        

            <Tab eventKey="login" title="Login">
                
                {/* Figure Et Titre */}
                <Container className='mt-4 text-center'>
                    <h1 style={{fontFamily:'Montserrat'}}>Login</h1>
                    <Figure>
                        <Figure.Image
                            width={270}
                            height={285}
                            alt="171x180"
                            src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                        />
                    </Figure>
                </Container>
                
                {/* Forms */}
                <Container>
                    <Row className='text-center justify-content-center'>
                        <Form style={{width:'450px'}}>
                            <FloatingLabel controlId="floatingInput" label="E-mail" className='mb-4'>
                                <Form.Control type='email' placeholder='E-mail' />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Password">
                                <Form.Control type='password' placeholder='Password' />
                            </FloatingLabel>

                            <Button variant='primary' size='lg' className='mt-4'>
                                Se Connecter
                            </Button>
                        </Form>
                    </Row>
                </Container>
            </Tab>

            <Tab eventKey="register" title="Register">
                
                {/* Figure Et Titre */}
                <Container className='mt-4 text-center'>
                    <h1 style={{fontFamily:'Montserrat'}}>Register</h1>
                    <Figure>
                        <Figure.Image
                            width={270}
                            height={285}
                            alt="171x180"
                            src="https://icon-library.com/images/registration-icon/registration-icon-11.jpg"
                        />
                    </Figure>
                </Container>
                
                {/* Forms */}
                <Container>
                    <Row className='text-center justify-content-center'>
                        <Form style={{width:'450px'}}>
                            <FloatingLabel controlId="floatingInput" label="Name" className='mb-1'>
                                <Form.Control type='text' placeholder='E-mail' />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Prename" className='mb-1'>
                                <Form.Control type='text' placeholder='E-mail' />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="E-mail" className='mb-1'>
                                <Form.Control type='email' placeholder='E-mail' />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Password">
                                <Form.Control type='password' placeholder='Password' />
                            </FloatingLabel>

                            <Button variant='primary' size='lg' className='mt-4'>
                                S'inscrire
                            </Button>
                        </Form>
                    </Row>
                </Container>
            </Tab>
        
        </Tabs>
    </>
  )
}

export default Authentification
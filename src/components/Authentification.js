import { createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import React from 'react'
import { Alert, Button, Container, Figure, FloatingLabel, Form, Modal, Nav, Navbar, Row, Spinner, Tab, Tabs } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { BsFillCartFill } from 'react-icons/bs'
import { auth } from '../firebase/firebase'
import Login from './Auth-components/Login'
import Register from './Auth-components/Register'

const Authentification = () => {

    const {register , handleSubmit} = useForm();
    const [viewAlert , setViewAlert] = React.useState(false)
    const [viewSpinner , setViewSpinner] = React.useState(false)

    // Gestion erreur Login
    const [errorLogin , setErrorLogin] = React.useState('')

    // Close Modal
    const closeModal = () =>{
        setViewAlert(false);
        window.location.reload('/auth');
    }

    // For Registration Page
    const addUser = async (value) =>{

        createUserWithEmailAndPassword(auth , value.email , value.password)
            .then((userCredential) =>{ 
                console.log(userCredential)
                // console.log(auth.currentUser)

                updateProfile(auth.currentUser , {
                    displayName: value.prename+' '+value.name,
                    photoURL:'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg'
                })

                signOut(auth).then(() => console.log('Auth === null')).catch(err => console.error(err))
                setViewAlert(true)
            })
            .catch((err) => console.error(err))
        console.log(value)

    }

    // For Login Page
    const connectUser = (value) =>{
        // console.log(value)

        signInWithEmailAndPassword(auth, value.email, value.password)
            .then((userCredential) => {
                // Signed in 
                console.log(userCredential);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                // const errorMessage = error.message;
                // console.error("Error code",errorCode)
                // console.error("Error message",errorMessage)

                if(errorCode === 'auth/wrong-password'){
                    setErrorLogin('Incorrect password')
                }else if(errorCode === "auth/invalid-email"){
                    setErrorLogin('Email invalid')
                }else{
                    setErrorLogin('Your information is incorrect')
                }
        });
    }

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
                <Login errorLogin={errorLogin} connectUser={connectUser} />
            </Tab>

            <Tab eventKey="register" title="Register">
                <Register addUser={addUser} />
                {viewSpinner && 
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                </Spinner>}
            </Tab>
        
        </Tabs>

        <Modal show={viewAlert} onHide={closeModal}>
            <Modal.Header closeButton>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
            </Modal.Header>
            <Modal.Body className='text-center'>
                {/* https://www.clipartmax.com/png/middle/179-1795386_patient-success-success-icon-png.png */}
                <Figure>
                    <Figure.Image
                        width={400}
                        height={355}
                        src="https://icons.veryicon.com/png/o/miscellaneous/new-version-of-star-selected-icon/success-26.png"
                        // src="./img/success-26.png"
                    />
                    <Figure.Caption as='h2' style={{fontFamily:'Montserrat'}}>
                        Operation make with success
                    </Figure.Caption>
                </Figure>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default Authentification
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import React from 'react'
import { Alert, Button, Container, Figure, FloatingLabel, Form, Modal, Nav, Navbar, Row, Spinner, Tab, Tabs } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { BsFillCartFill } from 'react-icons/bs'
import { auth } from '../firebase/firebase'
import Login from './Auth-components/Login'
import Register from './Auth-components/Register'
import { useNavigate , useLocation, NavLink, Navigate } from 'react-router-dom'

const Authentification = () => {

    const {register , handleSubmit} = useForm();
    const [viewAlert , setViewAlert] = React.useState(false)
    const [viewSpinner , setViewSpinner] = React.useState(false)
    // const [viewSpinner , setViewSpinner] = React.useState(false)
    const [checkLogin , setCheckLogin] = React.useState(false)

    // Gestion erreur Login
    const [errorLogin , setErrorLogin] = React.useState('')
    const [errorRegister , setErrorRegister] = React.useState('')

    const [viewLogin , setViewLogin] = React.useState(auth.currentUser === null ? true : false)

    // Authorization setState
    const [sendSettings , setSendSettings] = React.useState(false);

    // Navigate vers page Setting apres le Login
    const navigate = useNavigate();

    // get params via navigate
    // const location = useLocation();
    // let viewLogin = location.state

    // console.log('View login' , viewLogin.viewLogin)

    // Close Modal
    const closeModal = () =>{
        setViewAlert(false);
        // window.location.reload('/auth');
    }

    // For Registration Page
    const addUser = async (value) =>{

        createUserWithEmailAndPassword(auth , value.email , value.password)
            .then((userCredential) =>{ 
                // console.log(userCredential)
                // console.log(auth.currentUser)

                updateProfile(auth.currentUser , {
                    displayName: value.prename+' '+value.name,
                    photoURL:'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg'
                })

                signOut(auth).catch(err => console.error(err))
                setViewAlert(true)
            })
            .catch((err) => {
                const errorCode = err.code

                if(errorCode === 'auth/network-request-failed'){
                    setErrorRegister('Error network')
                }else{
                    setErrorRegister("Informations can't send")
                }
            })
        // console.log(value)
    }

    // For Login Page
    const connectUser = (value) =>{
        // console.log(value)
        setCheckLogin(true)
        signInWithEmailAndPassword(auth, value.email, value.password)
            .then((userCredential) => {
                // Signed in 
                // console.log(userCredential);
                // ...
                // Redirection vers /settings
                // navigate('/settings' , {state:{
                //     userInfo:{
                //         displayName: userCredential.user.displayName,
                //         email: userCredential.user.email,
                //         photo: userCredential.user.photoURL
                //     }}}
                // )

                // Utilisez un setteur pour dire ok identification OK 4 page
                
                setSendSettings(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                
                setCheckLogin(false) 
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
    !sendSettings ?
    <>
        {/* Nav Bar */}
        <Navbar style={{fontFamily:'Montserrat'}} variant="dark" bg="dark" fixed="sticky">
            <Container>
                <Navbar.Brand>
                    {/* <h4>Authentification <AiOutlineGlobal /></h4> */}
                    <h4>Managements Articles <BsFillCartFill /></h4>
                </Navbar.Brand>
                <Nav>
                    <NavLink style={{color:'whitesmoke' , textDecoration:'none'}} to={'/'}>
                        Go to home page
                    </NavLink>
                </Nav>
            </Container>
        </Navbar>

        <Tabs
            defaultActiveKey={viewLogin ? 'login' : 'register'}
            id="justify-tab-example"
            className="mb-3"
            justify
        >
        
            {viewLogin ?
                <Tab eventKey="login" title="Login">
                    <Login errorLogin={errorLogin} checkLogin={checkLogin} connectUser={connectUser} />
                </Tab>
            : "" }

            <Tab eventKey="register" title="Register">
                <Register errorRegister={errorRegister} addUser={addUser} />
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
    </> : 
    <Navigate to={'/settings'} />
  )
}

export default Authentification
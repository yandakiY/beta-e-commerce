import React from 'react'
import { Container, Form, Nav, Navbar } from 'react-bootstrap';
import {useForm} from "react-hook-form"
import { useDispatch , useSelector } from 'react-redux';
import { filterActions } from '../store/filter-slice';
import { BsFillCartFill , BsFillGearFill , BsFillFilePersonFill } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
// import { Link } from 'react-router-dom';

const Header = ({changeSearch , myAuth , changeAvailable}) => {

    const {register} = useForm();
    const disaptch = useDispatch();

    

    // const authCurrent = auth.currentUser;

    // const search = useSelector(state => state.filter.search);
    const available = useSelector(state => state.filter.available);

    const deconnexion = async () => {
      signOut(auth)
        .then(() => {
          console.log('Deconnexion...')
          window.location.reload('/')
        })
        .catch((err) => console.error(err))
    }

    // console.log(watch('search'))
  return (
    <header>
        <Navbar style={{fontFamily:'Montserrat'}} expand="lg" variant="dark" bg="dark" fixed="sticky">
          <Container>
            <Navbar.Brand style={{textDecoration:'underline'}} href="#">
              <h4 >Managements Articles <BsFillCartFill /> </h4>
            </Navbar.Brand>

            <div>
                <Form.Control {...register('search')} onChange={e => changeSearch(e.target.value)} type='search' placeholder='Search...'/>
            </div>

            <Nav>
              <Nav.Link href='/auth' style={{color:'white'}}>
                <h5>Admin part <AiOutlineGlobal /></h5>
              </Nav.Link>
              {myAuth !== null && <Nav.Link href='/settings' style={{color:'white'}}>
                <h5>Settings <BsFillGearFill /></h5>
              </Nav.Link>}
              <Nav.Link href='/about' style={{color:'white'}}>
                <h5>About <BsFillFilePersonFill /></h5>
              </Nav.Link>
              {myAuth !== null && <Nav.Link href='/#' style={{color:'white'}}>
                <h5>{myAuth.display}</h5>
              </Nav.Link>}
              {myAuth !== null && <Nav.Link href='#' onClick={deconnexion} className='text-danger' style={{border:'solid white 2px'}}>
                <h5 style={{fontWeight:'bold'}}>Sign out</h5>
              </Nav.Link>}
            </Nav>
          </Container>
        </Navbar>
        <div style={{display:'flex' , justifyContent:'center'}}>
          <h5>Articles only in stock : </h5>
          <Form.Check type="checkbox" checked={available} onChange={e => changeAvailable(e.target.checked)}/>
        </div>
    </header>
  )
}

// Header.pr 

export default Header
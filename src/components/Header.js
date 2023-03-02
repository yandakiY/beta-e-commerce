import React from 'react'
import { Container, Form, Nav, Navbar } from 'react-bootstrap';
import {useForm} from "react-hook-form"
import { useDispatch , useSelector } from 'react-redux';
import { filterActions } from '../store/filter-slice';
import { BsFillCartFill , BsFillGearFill , BsFillFilePersonFill } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate , Link, NavLink } from 'react-router-dom';

const Header = ({changeSearch , userInfo , myAuth , changeAvailable}) => {

    const {register} = useForm();
    const disaptch = useDispatch();

    console.log('Header' , userInfo)

    // const authCurrent = auth.currentUser;

    // const search = useSelector(state => state.filter.search);
    const available = useSelector(state => state.filter.available);

    const deconnexion = async () => {
      signOut(auth)
        .then(() => {
          console.log('Deconnexion...')
          // window.location.reload('/')
          navigate('/' , {state:{userInfo:null}})
        })
        .catch((err) => console.error(err))
    }
    
    const navigate = useNavigate();

    // const goAuth = () =>{
    //   navigate('/auth' , {state:{viewLogin: userInfo !== '' ? false : true}})
    // }

    // const goSettings = () => {
    //   navigate('/settings' , {state:userInfo})
    // }

    // const goAbout = () =>{
    //   navigate('/about' , {state:userInfo !== '' ? userInfo : ''})
    // }

    // console.log(watch('search'))
  return (
    <header>
        <Navbar style={{fontFamily:'Montserrat'}} expand="lg" variant="dark" bg="dark" fixed="sticky">
          <Container>
            <Navbar.Brand style={{textDecoration:'underline'}} href="#">
              <h4>Managements Articles <BsFillCartFill /> </h4>
            </Navbar.Brand>

            <div>
                <Form.Control {...register('search')} onChange={e => changeSearch(e.target.value)} type='search' placeholder='Search...'/>
            </div>

            <Nav>
              <NavLink style={{color:'whitesmoke' , textDecoration:'none', marginRight:'25px'}} to={'/auth'}>
                <h5>Admin Part</h5>
              </NavLink>
              <NavLink style={{color:'whitesmoke' , textDecoration:'none'}} to={'/about'} state={{test:false}} >
                <h5>About Me</h5>
              </NavLink>
            </Nav>
          </Container>
        </Navbar>
        <div style={{display:'flex' , justifyContent:'center' , marginRight:'25px'}}>
          <h5>Articles only in stock : </h5>
          <Form.Check type="checkbox" checked={available} onChange={e => changeAvailable(e.target.checked)}/>
        </div>
    </header>
  )
}

// Header.pr 

export default Header
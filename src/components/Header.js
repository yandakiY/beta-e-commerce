import React from 'react'
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {useForm} from "react-hook-form"
import { useDispatch , useSelector } from 'react-redux';
import { filterActions } from '../store/filter-slice';
import { BsFillCartFill , BsFillGearFill , BsFillFilePersonFill } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate , Link, NavLink, redirect } from 'react-router-dom';

const Header = ({changeSearch , userInfo , myAuth , changeAvailable}) => {

    const {register} = useForm();
    const disaptch = useDispatch();

    // console.log('Auth present in Header' , auth.currentUser === null ? false : true)

    // console.log("CUrrent user", auth.currentUser)
    const authCurrent = auth.currentUser === null ? false : auth.currentUser
    const [isAuth , setIsAuth] = React.useState(auth.currentUser === null ? false : true)

    // const search = useSelector(state => state.filter.search);
    const available = useSelector(state => state.filter.available);

    const deconnexion = async () => {
      // redirect('/') 
      window.location.reload('/')
      signOut(auth)
        .then(() => {
          console.log('Sign out...')
          // window.location.reload('/')
          // navigate('/' , {state:{userInfo:null}})
                   
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
    <header style={{marginTop:'65px'}}>
        <Navbar style={{fontFamily:'Montserrat'}} expand="lg" variant="dark" bg="dark" fixed="top" >
          <Container>
            <Navbar.Brand style={{textDecoration:'underline'}} href="#">
              <h4>Managements Articles <BsFillCartFill /> </h4>
            </Navbar.Brand>

            <div>
                <Form.Control {...register('search')} onChange={e => changeSearch(e.target.value)} type='search' placeholder='Search...'/>
            </div>

            <Nav style={{display:'flex', alignItems:'center'}}>
              <NavLink style={{color:'whitesmoke' , textDecoration:'none', marginRight:'25px'}} to={'/auth'}>
                <h5>Admin Part</h5>
              </NavLink>
              <NavLink style={{color:'whitesmoke' , textDecoration:'none', marginRight:'25px'}} to={'/about'} state={{test:false}} >
                <h5>About Me</h5>
              </NavLink>
              {isAuth && 
                <NavLink style={{color:'whitesmoke' , textDecoration:'none', marginRight:'25px'}} to={'/settings'} state={{isAuth: isAuth}}>
                  <h5>Settings</h5>
                </NavLink>
              }
              {isAuth && 
                <h5>
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title="Options"
                    menuVariant="dark"
                  >
                    <NavDropdown.Item>{authCurrent.displayName} ({authCurrent.email})</NavDropdown.Item>
                    <NavDropdown.Item onClick={deconnexion} style={{fontWeight:'bold'}} className='text-danger'>
                      Deconnexion
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item>Something</NavDropdown.Item> */}
                  </NavDropdown>
                </h5>
              }
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
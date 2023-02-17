import React from 'react'
import { Container, Form, Navbar } from 'react-bootstrap';
import {useForm} from "react-hook-form"
import { useDispatch , useSelector } from 'react-redux';
import { filterActions } from '../store/filter-slice';
import { BsFillCartFill } from "react-icons/bs";

const Header = ({changeSearch , changeAvailable}) => {

    const {register} = useForm();
    const disaptch = useDispatch();

    // const search = useSelector(state => state.filter.search);
    const available = useSelector(state => state.filter.available);

    // console.log(watch('search'))
  return (
    <header>
        <Navbar expand="lg" variant="dark" bg="dark" fixed="sticky">
          <Container>
            <Navbar.Brand style={{fontFamily:'Consolas , sans-serif' , textDecoration:'underline'}} href="#">
              <h4>Managements Articles <BsFillCartFill /> </h4>
            </Navbar.Brand>

            <div>
                <Form.Control {...register('search')} onChange={e => changeSearch(e.target.value)} type='search' placeholder='Search...'/>
            </div>
            {/* <div>
                <Form.Control {...register('search')} onChange={e => changeSearch(e.target.value)} type='search' placeholder='Search...'/>
            </div> */}
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
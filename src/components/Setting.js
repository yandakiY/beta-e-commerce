import React, { useEffect, useState } from 'react'
import AddArticles from './Form/AddArticles'
import AddCategories from './Form/AddCategories'
import '../style/Settings.css'
import TableArticleSettings from './Table/TableArticleSettings'
import {useSelector , useDispatch} from 'react-redux'
import { actionsLists } from '../store/lists-slice'
import { actionsCategory } from '../store/category-slice'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { BsBookmarkPlusFill, BsFillCartPlusFill , BsFillGearFill } from 'react-icons/bs'
import { BiHome  , BiBlock } from "react-icons/bi";

const Setting = () => {

  const [viewAddCategories , setviewAddCategories] = useState(false)
  const [viewAddArticles , setviewAddArticles] = useState(false)


    const dispatch = useDispatch();

    // Use redux for the access of state article and category
    const lists = useSelector(state  => state.lists.lists)
    const category = useSelector(state  => state.category.category)

    // console.log("Lists ", lists)
    // console.log("Category ", category)

    // //get element lists from server
    const getLists = async () =>{
        const res = await fetch('http://localhost:5000/lists');
        const data = await res.json();
    
        // console.log(data)
        return data; 
    }

    const getCategory = async () =>{
        const res = await fetch('http://localhost:5000/category');
        const data = await res.json();
    
        // console.log(data)
        return data; 
    }

    

    useEffect(() => {
        const getListsFromServer = async () =>{
            let listFormServer = await getLists();

            dispatch(actionsLists.setLists(listFormServer));

        }
        const getCategoryFromServer = async () =>{
            let categoryFormServer = await getCategory();

            dispatch(actionsCategory.setCategory(categoryFormServer));
        }

        getListsFromServer();
        getCategoryFromServer();

        // console.log("Category",category)
        // console.log("Lists of articles",lists)
    }, []);

    // console.log("Category", category)

  return (
    <>
        <Navbar expand="lg" variant="dark" bg="dark" fixed="sticky">
          <Container>
            <Navbar.Brand style={{fontFamily:'Consolas , sans-serif' , textDecoration:'underline'}} href="#">
              <h4>Settings <BsFillGearFill /></h4>
            </Navbar.Brand>

            <Nav>
              <Nav.Link onClick={() => setviewAddCategories(!viewAddCategories)} style={{display:'flex' , flexDirection:'row' , alignItems:'baseline'}}>
                {viewAddCategories === false ? <><h5>Add Categories </h5><BsBookmarkPlusFill /></> : <><h5 className='text-danger'>Close Add Categories </h5><BiBlock className='text-danger' /></>}
              </Nav.Link>
              <Nav.Link onClick={() => setviewAddArticles(!viewAddArticles)} style={{display:'flex' , flexDirection:'row' , alignItems:'baseline'}}>
                {viewAddArticles === false ? <><h5>Add Articles </h5><BsFillCartPlusFill /></> : <><h5 className='text-danger'>Close Add Articles </h5> <BiBlock className='text-danger'/></>}
              </Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link href='/' style={{display:'flex' , flexDirection:'row' , alignItems:'baseline'}}>
                    <h3 style={{color:'whitesmoke'}}><BiHome /></h3>
                </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <div style={{textAlign:'center'}}>
            {/* <h1>Settings</h1> */}

            {/* <div style={{display:'flex' , justifyContent:'space-evenly'}}> */}
                {/* <Button variant={viewAddCategories === false ? 'info' : 'danger'} onClick={() => setviewAddCategories(!viewAddCategories)}>{viewAddCategories ? 'Close Add Categories' : 'Add Categories'}</Button> */}
                {/* <Button variant={viewAddArticles === false ? 'info' : 'danger'} onClick={() => setviewAddArticles(!viewAddArticles)}>{viewAddArticles ? 'Close Add Articles' : 'Add new articles'}</Button> */}
            {/* </div> */}

            <div style={{display:'flex', flexDirection:'row' , justifyContent:'space-evenly' , alignItems:'center'}}>
                {/* Categories Formulaire */}
                {viewAddCategories && <AddCategories />}

                {/* Articles Formulaire */}
                {viewAddArticles && <AddArticles />}
            </div>

            {/* List of Articles For modification */}
            <TableArticleSettings lists={lists} category={category} />
            {/* Return to home page */}
        </div>
    </>
  )
}

export default Setting
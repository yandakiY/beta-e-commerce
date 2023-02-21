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
import NotLists from './NotLists'
import axios from 'axios'
import axiosLists from '../api-axios/axiosLists'
import axiosCategory from '../api-axios/axiosCategory'

const Setting = () => {

  const [viewAddCategories , setviewAddCategories] = useState(false)
  const [viewAddArticles , setviewAddArticles] = useState(false)


    const dispatch = useDispatch();

    // Use redux for the access of state article and category
    const lists = useSelector(state  => state.lists.lists)
    const category = useSelector(state  => state.category.category)

    // //get element lists from server
    const getLists = async () =>{
        const res = await axiosLists.get();
        return res.data
    }

    const getCategory = async () =>{
        const res = await axiosCategory.get();
        return res.data
    }

    const addArticles = async (value) => {

      const valueToAdd = {...value, stocked:value.number > 0 ? true : false}

      await axios.put('https://beta-e-commerce-default-rtdb.firebaseio.com/lists.json', [...lists , { ...valueToAdd , id: lists[lists.length - 1].id+1 }])
        .then(e => console.log(e))
        .catch(err => console.error(err))

      dispatch(actionsLists.setLists([...lists , { ...valueToAdd , id: lists.length === 0 ? 1 : lists[lists.length - 1].id+1 }]));
      // On recupere le dernier element du state lists et on incremente son id pour le nouveau a ajouté
      setviewAddArticles(false)
    }

    const addCategory = async value =>{

      await axios.put('https://beta-e-commerce-default-rtdb.firebaseio.com/category.json', [...category , {...value , id: category[category.length - 1].id+1}])
        .then(e => console.log(e))
        .catch(err => console.error(err))
      
      // Mise a jour du state
      dispatch(actionsCategory.setCategory([...category , {...value , id: category[category.length - 1].id+1}]));
      setviewAddCategories(false)
      
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
                {viewAddCategories === false ? <><h5>Add Categories </h5>{' '}<BsBookmarkPlusFill /></> : <><h5 className='text-danger'>Close Add Categories </h5>{' '}<BiBlock className='text-danger' /></>}
              </Nav.Link>
              <Nav.Link onClick={() => setviewAddArticles(!viewAddArticles)} style={{display:'flex' , flexDirection:'row' , alignItems:'baseline'}}>
                {viewAddArticles === false ? <><h5>Add Articles </h5>{' '}<BsFillCartPlusFill /></> : <><h5 className='text-danger'>Close Add Articles </h5>{' '}<BiBlock className='text-danger'/></>}
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

            <div style={{display:'flex', flexDirection:'row' , justifyContent:'space-evenly' , alignItems:'center'}}>
                {/* Categories Formulaire */}
                {viewAddCategories && <AddCategories addCategory={addCategory} />}

                {/* Articles Formulaire */}
                {viewAddArticles && <AddArticles category={category} lists={lists} addArticle={addArticles} />}
            </div>

            {lists.length === 0 || category.length === 0 ? <NotLists /> : <TableArticleSettings lists={lists} category={category} />}
        </div>
    </>
  )
}

export default Setting